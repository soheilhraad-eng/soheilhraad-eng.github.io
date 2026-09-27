// The Marco chat box. The Worker (worker/worker.js) enforces the limits; this file only
// mirrors them so the page can say how many messages are left.
//
// Each of Marco's three moves comes back as structured data, and each is laid out as
// something to act on: sparks to pick from, a developed idea with a "make my card"
// button, and finally the idea card, which can be downloaded as an image or copied.
// A reply without structure is shown as plain text. Everything Marco writes is inserted
// as text, never as HTML.
(function () {
  "use strict";
  var box = document.getElementById("marco");
  if (!box) return;

  var MAX = 3;
  var KEY = "marco:v2";
  var d = box.dataset;
  var ui = {};
  try { ui = JSON.parse(document.getElementById("marco-ui").textContent); } catch (e) {}

  var q = function (sel) { return box.querySelector(sel); };
  var log = q(".chat-log"), form = q(".chat-form"), input = q("textarea");
  var button = form.querySelector("button"), status = q(".chat-status"), done = q(".chat-done");
  var win = q(".chat-window"), starters = q(".chat-starters"), moves = box.querySelectorAll(".chat-moves li");
  var cardWrap = q(".idea-card-wrap"), toggle = q(".card-toggle");

  var today = new Date().toISOString().slice(0, 10);
  var messages = [];   // {role, content, move?, data?}; only role + content go to the Worker
  var showingChat = false;

  // The conversation is kept in this browser for the day, so a reload doesn't lose it
  // (or the card), and doesn't hand out three fresh messages. Storage can be
  // unavailable; then it simply isn't remembered.
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved && saved.day === today && Array.isArray(saved.messages)) messages = saved.messages;
  } catch (e) {}
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ day: today, messages: messages })); } catch (e) {}
  }

  function digits(n) {
    return d.lang === "fa" ? String(n).replace(/\d/g, function (c) { return "۰۱۲۳۴۵۶۷۸۹"[c]; }) : String(n);
  }
  function used() { return messages.filter(function (m) { return m.role === "user"; }).length; }
  function lastMarco() {
    var m = messages[messages.length - 1];
    return m && m.role === "assistant" ? m : null;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) { e.textContent = text; e.dir = "auto"; }
    return e;
  }

  // ---- Marco's replies, laid out by move ---------------------------------------

  function body(m, isLatest) {
    var wrap = el("div", "msg-body");
    var data = m.data;
    if (!data) { wrap.appendChild(el("p", "", m.content)); return wrap; }

    if (m.move === "spark") {
      if (data.intro) wrap.appendChild(el("p", "", data.intro));
      var list = el("div", "sparks");
      data.sparks.forEach(function (s) {
        var b = el("button", "spark");
        b.type = "button";
        b.disabled = !isLatest;
        b.appendChild(el("strong", "", s.title));
        b.appendChild(el("span", "", s.line));
        b.addEventListener("click", function () { send((ui.pick || "%s").replace("%s", s.title)); });
        list.appendChild(b);
      });
      wrap.appendChild(list);
      if (isLatest) wrap.appendChild(el("p", "hint", ui.or_type));
    } else if (m.move === "develop") {
      wrap.appendChild(el("h4", "dev-title", data.title));
      var dl = el("dl", "dev");
      [["who", data.who], ["twist", data.twist], ["experiment", data.experiment]].forEach(function (row) {
        dl.appendChild(el("dt", "", ui[row[0]]));
        dl.appendChild(el("dd", "", row[1]));
      });
      wrap.appendChild(dl);
      if (data.question) wrap.appendChild(el("p", "dev-question", data.question));
      if (isLatest) {
        var go = el("button", "button make-card", ui.make_card);
        go.type = "button";
        go.addEventListener("click", function () { send(ui.make_card); });
        wrap.appendChild(go);
        wrap.appendChild(el("p", "hint", ui.or_answer));
      }
    } else if (m.move === "card") {
      wrap.appendChild(el("p", "", ui.ready));
    } else {
      wrap.appendChild(el("p", "", m.content));
    }
    return wrap;
  }

  function bubble(m, isLatest, extraClass) {
    var li = el("li", "msg " + (m.role === "user" ? "from-you" : "from-marco") + (extraClass ? " " + extraClass : ""));
    li.appendChild(el("span", "who", m.role === "user" ? d.you : d.marco));
    if (m.role === "user") li.appendChild(el("p", "", m.content));
    else li.appendChild(body(m, isLatest));
    log.appendChild(li);
    return li;
  }

  // ---- The idea card ----------------------------------------------------------

  function cardData() {
    for (var i = messages.length - 1; i >= 0; i--) if (messages[i].move === "card" && messages[i].data) return messages[i].data;
    return null;
  }

  function fillCard(c) {
    cardWrap.querySelector(".idea-card-name").textContent = c.name;
    cardWrap.querySelector(".idea-card-pitch").textContent = c.pitch;
    var ol = cardWrap.querySelector(".idea-card-steps");
    ol.textContent = "";
    c.steps.forEach(function (s) { ol.appendChild(el("li", "", s)); });
    cardWrap.querySelector(".idea-card-risk").textContent = c.risk;
  }

  function cardText(c) {
    return [c.name, c.pitch, "", ui.steps + ":", c.steps.map(function (s, i) { return (i + 1) + ". " + s; }).join("\n"), "",
      ui.risk + ": " + c.risk, "", "— " + ui.ai_mark + " · " + location.host].join("\n");
  }

  q(".card-copy").addEventListener("click", function () {
    var c = cardData(), btn = this;
    if (!c) return;
    var text = cardText(c);
    var ok = function () { var old = btn.textContent; btn.textContent = ui.copied; setTimeout(function () { btn.textContent = old; }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, function () {});
  });

  // The card as a PNG, drawn on a canvas in the page's own fonts and colours. It says
  // on its face that it was generated by AI, because it can leave this site.
  q(".card-download").addEventListener("click", function () {
    var c = cardData();
    if (!c) return;
    var rtl = d.lang === "fa";
    var cs = getComputedStyle(cardWrap.querySelector(".idea-card"));
    var col = function (v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); };
    var serif = getComputedStyle(cardWrap.querySelector(".idea-card-name")).fontFamily;
    var sans = cs.fontFamily;
    var W = 1200, P = 88, S = 2;
    var cv = document.createElement("canvas"), x = cv.getContext("2d");
    x.direction = rtl ? "rtl" : "ltr";
    x.textAlign = rtl ? "right" : "left";
    var X = rtl ? W - P : P;

    function wrap(text, font, maxW) {
      x.font = font;
      var words = String(text).split(/\s+/), lines = [], line = "";
      words.forEach(function (w) {
        var t = line ? line + " " + w : w;
        if (x.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
      });
      if (line) lines.push(line);
      return lines;
    }
    // Lay out once to measure, then draw.
    var blocks = [];
    var add = function (text, font, color, lh, gap) { blocks.push({ lines: wrap(text, font, W - 2 * P), font: font, color: color, lh: lh, gap: gap }); };
    var accent = col("--accent") || "#8a5a12", text = col("--text") || "#1f1d1a", muted = col("--muted") || "#6b665e";
    add(rtl ? ui.card : ui.card.toUpperCase(), "600 24px " + sans, accent, 34, 22);
    add(c.name, "700 64px " + serif, text, 76, 18);
    add(c.pitch, "400 32px " + sans, muted, 46, 44);
    var label = function (t) { return rtl ? t : t.toUpperCase(); };
    add(label(ui.steps), "600 24px " + sans, accent, 34, 12);
    c.steps.forEach(function (s, i) { add(digits(i + 1) + ". " + s, "400 30px " + sans, text, 44, 10); });
    blocks[blocks.length - 1].gap = 36;
    add(label(ui.risk), "600 24px " + sans, accent, 34, 12);
    add(c.risk, "400 30px " + sans, text, 44, 56);
    add(ui.ai_mark + " · " + location.host, "400 22px " + sans, muted, 30, 0);
    var H = P + 10 + blocks.reduce(function (h, b) { return h + b.lines.length * b.lh + b.gap; }, 0) + P;

    cv.width = W * S; cv.height = H * S;
    x.scale(S, S);
    x.direction = rtl ? "rtl" : "ltr";
    x.textAlign = rtl ? "right" : "left";
    x.fillStyle = col("--surface") || "#ffffff"; x.fillRect(0, 0, W, H);
    x.fillStyle = accent; x.fillRect(rtl ? W - P - 72 : P, P - 36, 72, 6);
    var y = P + 10;
    x.textBaseline = "top";
    blocks.forEach(function (b) {
      x.font = b.font; x.fillStyle = b.color;
      b.lines.forEach(function (l) { x.fillText(l, X, y); y += b.lh; });
      y += b.gap;
    });
    cv.toBlob(function (blob) {
      if (!blob) return;
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      // Latin letters only in the file name: some browsers drop a name they can't encode.
      var slug = c.name.normalize("NFKD").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
      a.download = (slug ? slug + "-" : "") + "idea-card.png";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    }, "image/png");
  });

  toggle.addEventListener("click", function () { showingChat = !showingChat; render(); });

  // ---- Rendering and sending --------------------------------------------------

  function render() {
    log.textContent = "";
    messages.forEach(function (m, i) { bubble(m, i === messages.length - 1 && used() < MAX); });
    var left = MAX - used();
    var finished = left <= 0 && !!lastMarco();
    var card = finished ? cardData() : null;
    starters.hidden = messages.length > 0;
    var replies = messages.filter(function (m) { return m.role === "assistant"; }).length;
    for (var i = 0; i < moves.length; i++) moves[i].className = i < replies ? "done" : i === replies ? "current" : "";

    if (card) fillCard(card);
    cardWrap.hidden = !card || showingChat;
    win.hidden = !!card && !showingChat;
    toggle.textContent = showingChat ? ui.show_card : ui.show_chat;
    toggle.hidden = !card;
    form.hidden = finished;
    done.hidden = !finished || !!card;
    status.textContent = finished ? "" : d.left.replace("{n}", digits(left));
    scrollToEnd();
  }

  // The window has a fixed height. A new message from Marco is scrolled to its first
  // line, so it's read from the top; anything else keeps the newest line in view.
  function scrollToEnd() {
    var last = log.lastElementChild;
    if (last && last.classList.contains("from-marco") && !last.classList.contains("thinking")) win.scrollTop = last.offsetTop - 12;
    else win.scrollTop = win.scrollHeight;
  }

  function busy(on) {
    input.disabled = on;
    button.disabled = on;
    if (on) box.querySelectorAll(".spark, .make-card").forEach(function (b) { b.disabled = true; });
  }

  function send(text) {
    text = String(text || "").trim();
    if (!text || used() >= MAX || button.disabled) return;
    messages.push({ role: "user", content: text });
    render();
    input.value = "";
    var thinking = bubble({ role: "assistant", content: d.thinking }, false, "thinking");
    scrollToEnd();
    busy(true);

    fetch(d.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.map(function (m) { return { role: m.role, content: m.content }; }), lang: d.lang })
    })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, body: j }; });
      })
      .then(function (res) {
        if (res.status === 200 && res.body.reply) {
          messages.push({ role: "assistant", content: res.body.reply, move: res.body.move, data: res.body.data || null });
          save();
          busy(false);
          render();
        } else {
          busy(false);
          fail(res.status === 429 ? d.rate : d.error, text);
        }
      })
      .catch(function () { busy(false); fail(d.error, text); });
  }

  // A failed message doesn't count: take it back and return the text to the box.
  function fail(msg, text) {
    messages.pop();
    render();
    input.value = text;
    status.textContent = msg;
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); send(input.value); });
  starters.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (chip) send(chip.textContent);
  });
  // Enter sends, Shift+Enter makes a new line. Not while an input method is composing
  // (Persian and other keyboards use Enter to confirm a word).
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(input.value); }
  });

  render();
})();
