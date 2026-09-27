// The Marco chat box. The Worker (worker/worker.js) enforces the limits; this file only
// mirrors them so the page can say how many messages are left. Everything Marco writes is
// inserted as text, never as HTML.
(function () {
  "use strict";
  var box = document.getElementById("marco");
  if (!box) return;

  var MAX = 3;
  var KEY = "marco:v1";
  var d = box.dataset;
  var log = box.querySelector(".chat-log");
  var form = box.querySelector(".chat-form");
  var input = box.querySelector("textarea");
  var button = form.querySelector("button");
  var status = box.querySelector(".chat-status");
  var done = box.querySelector(".chat-done");

  var today = new Date().toISOString().slice(0, 10);
  var messages = [];

  // The conversation is kept in this browser for the day, so a reload doesn't lose it
  // (and doesn't hand out three fresh messages). Storage can be unavailable; then it
  // simply isn't remembered.
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
  function used() {
    return messages.filter(function (m) { return m.role === "user"; }).length;
  }
  // Marco may use light markdown; show it as plain text.
  function plain(text) {
    return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/(^|\s)\*(\S.*?\S|\S)\*(?=\s|$)/g, "$1$2").replace(/^#+\s*/gm, "");
  }

  function bubble(role, text, extraClass) {
    var li = document.createElement("li");
    li.className = "msg " + (role === "user" ? "from-you" : "from-marco") + (extraClass ? " " + extraClass : "");
    var who = document.createElement("span");
    who.className = "who";
    who.textContent = role === "user" ? d.you : d.marco;
    var body = document.createElement("p");
    body.dir = "auto";
    body.textContent = role === "user" ? text : plain(text);
    li.appendChild(who);
    li.appendChild(body);
    log.appendChild(li);
    return li;
  }

  function render() {
    log.textContent = "";
    messages.forEach(function (m) { bubble(m.role, m.content); });
    var left = MAX - used();
    var finished = left <= 0 && messages.length && messages[messages.length - 1].role === "assistant";
    form.hidden = !!finished;
    done.hidden = !finished;
    status.textContent = finished ? "" : d.left.replace("{n}", digits(left));
  }

  function busy(on) {
    input.disabled = on;
    button.disabled = on;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text || used() >= MAX) return;

    messages.push({ role: "user", content: text });
    render();
    input.value = "";
    var thinking = bubble("assistant", d.thinking, "thinking");
    busy(true);

    fetch(d.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages, lang: d.lang })
    })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, body: j }; });
      })
      .then(function (res) {
        if (res.status === 200 && res.body.reply) {
          messages.push({ role: "assistant", content: res.body.reply });
          save();
          render();
        } else {
          fail(res.status === 429 ? d.rate : d.error, text);
        }
      })
      .catch(function () { fail(d.error, text); })
      .then(function () {
        if (thinking.parentNode) thinking.parentNode.removeChild(thinking);
        busy(false);
        if (!form.hidden) input.focus();
      });
  });

  // A failed message doesn't count: take it back and return the text to the box.
  function fail(msg, text) {
    messages.pop();
    render();
    input.value = text;
    status.textContent = msg;
  }

  // Enter sends, Shift+Enter makes a new line. Not while an input method is composing
  // (Persian and other keyboards use Enter to confirm a word).
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      if (typeof form.requestSubmit === "function") form.requestSubmit(); else button.click();
    }
  });

  render();
})();
