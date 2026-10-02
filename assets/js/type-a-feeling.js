/* "Type a feeling": type a word in English, Spanish or Persian and hear a short phrase built
   from the cues that music-emotion research links to that feeling.
   Interface text lives in _data/i18n.yml (feeling:) and reaches this file through the JSON in
   _includes/type-a-feeling.html; only the numbers that build the sound and the offline word
   list are here. Nothing is loaded from another site. Unknown words go to the Worker only
   when the visitor asks for them.
   Same word + same feeling always gives the same phrase. */
(function(){
'use strict';
const DATA = JSON.parse(document.getElementById('taf-data').textContent);
const CLASSIFY_ENDPOINT = DATA.endpoint || '';
const SCALES = {
  major:[0,2,4,5,7,9,11], minor:[0,2,3,5,7,8,10], dorian:[0,2,3,5,7,9,10],
  lydian:[0,2,4,6,7,9,11], phrygian:[0,1,3,5,7,8,10], locrian:[0,1,3,5,6,8,10],
  pentaMaj:[0,2,4,7,9]
};

/* One row per feeling: how it is heard (cue text) and how it is built (numbers). */
const EMO = {
  joy:{
    scale:'major',root:57,bpm:132,wave:'triangle',bright:6500,gain:.22,legato:.5,attack:.008,decay:.06,sustain:.5,release:.12,
    rhythm:[.5,.5,.5,.5,1,.5,.5],contour:'up',range:[0,10],startDeg:0,ending:'tonic',vel:[.7,1],rest:.05},
  sadness:{
    scale:'minor',root:50,bpm:54,wave:'sine',bright:1500,gain:.26,legato:.95,attack:.06,decay:.3,sustain:.6,release:.5,
    rhythm:[1,1,2,1,1,2],contour:'down',range:[-4,7],startDeg:6,ending:'tonic',vel:[.6,.85],rest:0},
  calm:{
    scale:'pentaMaj',root:55,bpm:48,wave:'sine',bright:1300,gain:.2,legato:1,attack:.4,decay:.6,sustain:.7,release:1.2,
    rhythm:[2,2,3],contour:'rock',range:[-2,5],startDeg:1,ending:'tonic',vel:[.5,.7],rest:0,echo:.3,drone:true,target:5},
  fear:{
    scale:'locrian',root:48,bpm:100,wave:'sawtooth',bright:1800,q:3,gain:.14,legato:.7,attack:.03,decay:.1,sustain:.6,release:.2,
    rhythm:[.5,.25,.75,.5,1,.25,.25],contour:'wander',range:[-3,6],startDeg:0,ending:'semitone',vel:[.3,1],crescendo:true,
    rest:.12,cluster:6,clusterProb:.35,vib:{rate:6.5,cents:30}},
  anger:{
    scale:'phrygian',root:45,bpm:152,wave:'sawtooth',bright:3800,gain:.17,legato:.45,attack:.004,decay:.05,sustain:.7,release:.06,
    rhythm:[.5,.5,.25,.25,.5,.5],contour:'repeat',range:[-2,4],startDeg:0,ending:'none',vel:[.8,1],rest:.04,
    cluster:1,clusterProb:.4,target:4.5},
  tenderness:{
    scale:'pentaMaj',root:60,bpm:66,wave:'sine',bright:2000,gain:.22,legato:.95,attack:.08,decay:.3,sustain:.7,release:.6,
    rhythm:[1,.5,.5,1,1,1],contour:'rock',range:[-1,6],startDeg:2,ending:'tonic',vel:[.5,.8],rest:0,echo:.2},
  longing:{
    scale:'dorian',root:52,bpm:60,wave:'triangle',bright:2300,gain:.24,legato:.95,attack:.05,decay:.25,sustain:.65,release:.6,
    rhythm:[1,1,.5,.5,2,1],contour:'arch',range:[-2,7],startDeg:0,ending:'dominant',vel:[.5,.9],rest:0,
    vib:{rate:5,cents:14},echo:.22},
  wonder:{
    scale:'lydian',root:62,bpm:76,wave:'sine',bright:6000,gain:.2,legato:.8,attack:.02,decay:.3,sustain:.5,release:.8,
    rhythm:[.5,.5,1,.5,.5,1.5],contour:'leap',range:[0,12],startDeg:0,ending:'high',vel:[.45,.9],rest:0,echo:.42},
  hope:{
    scale:'major',root:55,bpm:84,wave:'triangle',bright:4200,gain:.22,legato:.85,attack:.03,decay:.2,sustain:.6,release:.5,
    rhythm:[1,.5,.5,1,1,.5,.5,2],contour:'up',range:[0,10],startDeg:0,ending:'high',vel:[.5,.9],rest:0,echo:.15}
};

/* Where each feeling sits on the map: valence (dark to bright, left to right) and arousal (calm to
   intense, bottom to top), after Russell's circumplex. Touching anywhere on the map plays music
   for that point: tempo, mode, register and brightness follow the position, so there are as many
   tracks as there are places to touch. */
const POS = {
  anger:{v:-.8,a:.85}, fear:{v:-.55,a:.5}, sadness:{v:-.7,a:-.6}, longing:{v:-.4,a:-.3}, calm:{v:.35,a:-.8},
  tenderness:{v:.55,a:-.4}, hope:{v:.5,a:.25}, wonder:{v:.3,a:.7}, joy:{v:.8,a:.6}
};
const DARK_TO_BRIGHT = ['locrian','phrygian','minor','dorian','major','lydian'];
function nearest(v,a){
  let best = 'calm', bd = 9;
  for(const k in POS){ const d = (POS[k].v-v)**2 + (POS[k].a-a)**2; if(d<bd){ bd = d; best = k; } }
  return best;
}
/* The feeling nearest the touch supplies the character (timbre, rhythm, contour); the distance
   from it bends tempo, register, brightness, attack and mode. At a feeling's own spot the result
   is that feeling exactly. */
function synth(v,a,key){
  const base = EMO[key], dv = v-POS[key].v, da = a-POS[key].a, e = Object.assign({},base);
  e.bpm = Math.max(40,Math.min(168,Math.round(base.bpm*Math.pow(2,da*.7))));
  e.root = base.root + Math.round(dv*3 + da*2);
  e.bright = Math.max(900,Math.round(base.bright*(1+da*.45+dv*.3)));
  e.attack = Math.max(.004,base.attack*(1-da*.6));
  if(Math.abs(dv)>.22){
    const i = base.scale==='pentaMaj' ? 4 : DARK_TO_BRIGHT.indexOf(base.scale);
    e.scale = DARK_TO_BRIGHT[Math.max(0,Math.min(5,i+Math.round(dv*2)))];
  }
  return e;
}

/* Two more voices for the melody besides the one each feeling brings ('auto'). */
const TIMBRE = {
  keys:{kind:'fm',attack:.004,decay:.5,sustain:.25,release:.6,legato:.9,vib:null,detune:0,pure:true,gainMul:1.3,brightMin:2600},
  strings:{wave:'sawtooth',detune:9,attack:.09,decay:.3,sustain:.75,release:.7,legato:1,vib:{rate:5.5,cents:10},pure:true,gainMul:.6,brightMin:1400,brightMax:2600}
};
function leadVoice(e,timbre){
  const tb = TIMBRE[timbre]; if(!tb) return e;
  const o = Object.assign({},e,tb);
  o.gain = e.gain*tb.gainMul;
  o.bright = Math.min(tb.brightMax||1e9, Math.max(tb.brightMin, e.bright));
  return o;
}

/* Chords under the melody: scale-degree roots, stacked in thirds. Modal choices follow the cues
   above: a plain I-V-vi-IV for joy, a falling minor line for sadness, a dissonant flat-II for fear. */
const PROG = {
  joy:[0,4,5,3], sadness:[0,5,2,6], calm:[0,3,1,0], fear:[0,1,0,4], anger:[0,1,0,6],
  tenderness:[0,2,3,0], longing:[0,3,6,0], wonder:[0,1,0,4], hope:[0,3,4,0]
};

/* Words the page knows without asking anyone. Accents and Persian variants are normalised below. */
const WORDS = {
  joy:{en:['joy','happy','happiness','glad','delight','cheerful','excited','elated','bliss','fun'],
       es:['alegría','feliz','felicidad','contento','contenta','gozo','dicha','entusiasmo'],
       fa:['شادی','خوشحال','خوشحالی','شاد','ذوق','سرور','خوشی','لذت']},
  sadness:{en:['sad','sadness','sorrow','grief','melancholy','blue','mourning','lonely','loneliness','heartbreak'],
       es:['triste','tristeza','pena','dolor','luto','melancolía','soledad','duelo'],
       fa:['غم','غمگین','اندوه','غصه','ناراحت','تنهایی','سوگ','ماتم']},
  calm:{en:['calm','peace','peaceful','serene','serenity','relaxed','still','quiet','tranquil','rest'],
       es:['calma','paz','tranquilo','tranquilidad','serenidad','sosiego','quietud','descanso'],
       fa:['آرامش','آرام','صلح','سکوت','آسودگی','آسوده','سکون']},
  fear:{en:['fear','afraid','scared','anxious','anxiety','dread','worry','panic','nervous','terror','unease'],
       es:['miedo','temor','ansiedad','pánico','nervios','angustia','inquietud'],
       fa:['ترس','هراس','اضطراب','نگرانی','وحشت','دلهره','نگران']},
  anger:{en:['anger','angry','rage','fury','mad','annoyed','irritated','frustration','frustrated','outrage'],
       es:['ira','rabia','enfado','enojo','furia','frustración','indignación'],
       fa:['خشم','عصبانی','عصبانیت','غضب','کلافه']},
  tenderness:{en:['tender','tenderness','love','affection','warmth','care','gentle','kindness','compassion','fondness'],
       es:['ternura','amor','cariño','calidez','dulzura','compasión','afecto'],
       fa:['مهربانی','عشق','محبت','مهر','لطف','دلسوزی','عاطفه']},
  longing:{en:['longing','nostalgia','nostalgic','homesick','homesickness','yearning','missing','miss','wistful','saudade'],
       es:['añoranza','morriña','anhelo','extrañar','nostálgico','echar de menos'],
       fa:['دلتنگی','دلتنگ','نوستالژی','حسرت','غربت','اشتیاق']},
  wonder:{en:['wonder','awe','amazement','curiosity','marvel','astonished','surprise','inspired','fascination'],
       es:['asombro','maravilla','admiración','curiosidad','sorpresa','fascinación'],
       fa:['شگفتی','حیرت','تعجب','کنجکاوی','شگفت‌زده']},
  hope:{en:['hope','hopeful','optimism','optimistic','faith'],
       es:['esperanza','optimismo','fe','esperanzado'],
       fa:['امید','امیدواری','امیدوار','خوش‌بینی']}
};

function norm(s){
  return String(s).trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[\u200c\u200d]/g,'')
    .replace(/\u064a/g,'\u06cc').replace(/\u0643/g,'\u06a9')
    .replace(/[\u064b-\u065f\u0670]/g,'')
    .replace(/[^\p{L}\p{N}\s]/gu,'')
    .replace(/\s+/g,' ');
}

const LEX = new Map();
for(const [emo,langs] of Object.entries(WORDS))
  for(const [lang,list] of Object.entries(langs))
    for(const w of list){ const k = norm(w); if(!LEX.has(k)) LEX.set(k,{emo,lang}); }

function detectLang(raw){
  if(/[\u0600-\u06FF]/.test(raw)) return 'fa';
  if(/[ñáéíóúü¿¡]/i.test(raw)) return 'es';
  return 'en';
}

function lookup(text){
  const n = norm(text);
  if(!n) return null;
  let hit = LEX.get(n);
  if(!hit) for(const tok of n.split(' ')){ if(LEX.has(tok)){ hit = LEX.get(tok); break; } }
  if(!hit) return null;
  const raw = detectLang(text);
  return {emo:hit.emo, lang: raw==='fa' ? 'fa' : (raw==='es' ? 'es' : hit.lang)};
}

function fnv(str){ let h=2166136261>>>0; for(let i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619)>>>0; } return h>>>0; }
function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }

function degToMidi(deg,e){
  const sc = SCALES[e.scale], len = sc.length;
  const oct = Math.floor(deg/len), idx = ((deg%len)+len)%len;
  return e.root + 12*oct + sc[idx];
}
function pickStep(contour,progress,r){
  switch(contour){
    case 'up':     return r<.55?1 : r<.8?2 : r<.92?-1 : 0;
    case 'down':   return r<.55?-1 : r<.8?-2 : r<.92?1 : 0;
    case 'arch':   return progress<.5 ? (r<.65?1 : r<.85?2 : -1) : (r<.65?-1 : r<.85?-2 : 1);
    case 'rock':   return r<.35?1 : r<.7?-1 : r<.85?2 : -2;
    case 'wander': return r<.25?1 : r<.5?-1 : r<.65?2 : r<.8?-2 : r<.9?3 : -3;
    case 'repeat': return r<.6?0 : r<.8?1 : -1;
    case 'leap':   return r<.4?2 : r<.65?3 : r<.85?1 : -1;
    default: return 0;
  }
}

/* Same word + same feeling always gives the same phrase. */
function buildPhrase(word,key,v,e){
  const rnd = mulberry32(fnv(norm(word)+'|'+key+(v ? '|'+v : '')));
  const beat = 60/e.bpm, target = e.target || 6.5, len = SCALES[e.scale].length;
  const notes = []; let t = 0, deg = e.startDeg, i = 0;
  while(t < target - beat){
    const dur = e.rhythm[i % e.rhythm.length]*beat; i++;
    if(rnd() < e.rest){ t += dur; continue; }
    const progress = Math.min(1,t/target);
    deg += pickStep(e.contour,progress,rnd());
    deg = Math.max(e.range[0],Math.min(e.range[1],deg));
    const vel = e.vel[0] + (e.vel[1]-e.vel[0])*(e.crescendo ? progress : rnd());
    const n = {t,dur,midi:degToMidi(deg,e),vel};
    if(e.cluster && rnd() < e.clusterProb) n.extra = n.midi + e.cluster;
    notes.push(n); t += dur;
  }
  let fin = null;
  if(e.ending==='tonic') fin = degToMidi(Math.round(deg/len)*len,e);
  else if(e.ending==='dominant'){
    let d = deg;
    for(let k=0;k<len;k++){
      if((((deg+k)%len)+len)%len===4){ d=deg+k; break; }
      if((((deg-k)%len)+len)%len===4){ d=deg-k; break; }
    }
    fin = degToMidi(d,e);
  }
  else if(e.ending==='semitone') fin = e.root + 12*Math.round(deg/len) + 1;
  else if(e.ending==='high') fin = degToMidi(deg>=len ? len*2 : len,e);
  if(fin!==null){ const d = beat*2; notes.push({t,dur:d,midi:fin,vel:e.vel[1],final:true}); t += d; }
  // The chords take no random numbers, so they never change the melody; the last one is home.
  const prog = PROG[key], seg = t/prog.length, chords = prog.map((d,k)=>{
    const r = (k===prog.length-1) ? 0 : d;
    return {t:k*seg, dur:seg, bass:degToMidi(r,e)-24, tones:[0,2,4].map(s=>degToMidi(r+s,e)-12)};
  });
  return {notes,chords,total:t};
}

/* ---------- audio ---------- */
const $ = id => document.getElementById('taf-' + id);
let AC=null, master=null, bus=null, playId=0, current=null, timbre='auto';
const midiHz = m => 440*Math.pow(2,(m-69)/12);

function ensureAudio(){
  if(!AC){
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if(!Ctx) return null;
    AC = new Ctx();
    master = AC.createGain(); master.gain.value = .9;
    const comp = AC.createDynamicsCompressor();
    master.connect(comp); comp.connect(AC.destination);
  }
  if(AC.state==='suspended') AC.resume();
  return AC;
}

/* A small hall made of decaying noise, so no sound file has to be downloaded. */
let IR=null;
function impulse(){
  if(IR) return IR;
  const len = Math.floor(AC.sampleRate*2.2), buf = AC.createBuffer(2,len,AC.sampleRate), rnd = mulberry32(7);
  for(let c=0;c<2;c++){ const d = buf.getChannelData(c); for(let i=0;i<len;i++) d[i] = (rnd()*2-1)*Math.pow(1-i/len,2.6); }
  return IR = buf;
}

function makeFx(e,dest){
  const input = AC.createGain();
  const lp = AC.createBiquadFilter();
  lp.type='lowpass'; lp.frequency.value=e.bright; lp.Q.value=e.q||.7;
  input.connect(lp); lp.connect(dest);
  const rv = AC.createConvolver(); rv.buffer = impulse();
  const rw = AC.createGain(); rw.gain.value = e.reverb==null ? .2 : e.reverb;
  lp.connect(rv); rv.connect(rw); rw.connect(dest);
  if(e.echo){
    const d = AC.createDelay(1); d.delayTime.value = .32;
    const fb = AC.createGain(); fb.gain.value = .38;
    const wet = AC.createGain(); wet.gain.value = e.echo;
    lp.connect(d); d.connect(fb); fb.connect(d); d.connect(wet); wet.connect(dest);
  }
  return input;
}

function fmVoice(e,fx,t0,midi,dur,vel,gainScale){
  const f = midiHz(midi), hold = Math.max(dur*e.legato,.2), peak = e.gain*vel*(gainScale||1), end = t0+hold+e.release+.05;
  const g = AC.createGain();
  g.gain.setValueAtTime(.0001,t0);
  g.gain.exponentialRampToValueAtTime(peak,t0+e.attack);
  g.gain.exponentialRampToValueAtTime(peak*e.sustain,t0+e.attack+e.decay);
  g.gain.setValueAtTime(peak*e.sustain,t0+hold);
  g.gain.exponentialRampToValueAtTime(.0001,t0+hold+e.release);
  g.connect(fx);
  const car = AC.createOscillator(), mod = AC.createOscillator(), mg = AC.createGain();
  car.type = 'sine'; mod.type = 'sine'; car.frequency.value = f; mod.frequency.value = f;
  mg.gain.setValueAtTime(f*1.6*vel,t0); mg.gain.exponentialRampToValueAtTime(f*.08,t0+.5);
  mod.connect(mg); mg.connect(car.frequency); car.connect(g);
  car.start(t0); mod.start(t0); car.stop(end); mod.stop(end);
}

function voice(e,fx,base,midi,dur,vel,gainScale){
  if(e.kind==='fm') return fmVoice(e,fx,base,midi,dur,vel,gainScale);
  const t0 = base, a = e.attack, hold = Math.max(dur*e.legato, a+e.decay+.02);
  const peak = e.gain*vel*(gainScale||1);
  const g = AC.createGain();
  g.gain.setValueAtTime(.0001,t0);
  g.gain.exponentialRampToValueAtTime(peak,t0+a);
  g.gain.exponentialRampToValueAtTime(peak*e.sustain,t0+a+e.decay);
  g.gain.setValueAtTime(peak*e.sustain,t0+hold);
  g.gain.exponentialRampToValueAtTime(.0001,t0+hold+e.release);
  g.connect(fx);
  const end = t0+hold+e.release+.05;
  const oscs = e.detune ? [-e.detune,e.detune] : [0];
  oscs.forEach(cents=>{
    const o = AC.createOscillator();
    o.type = e.wave; o.frequency.value = midiHz(midi); o.detune.value = cents;
    if(e.vib){
      const lfo = AC.createOscillator(), lg = AC.createGain();
      lfo.frequency.value = e.vib.rate; lg.gain.value = e.vib.cents;
      lfo.connect(lg); lg.connect(o.detune); lfo.start(t0); lfo.stop(end);
    }
    o.connect(g); o.start(t0); o.stop(end);
  });
  // A quiet octave above makes a sine or triangle sound less like a test tone.
  if(!e.pure && e.wave!=='sawtooth'){
    const o2 = AC.createOscillator(), g2 = AC.createGain();
    o2.type='sine'; o2.frequency.value = midiHz(midi)*2; g2.gain.value = .14;
    o2.connect(g2); g2.connect(g); o2.start(t0); o2.stop(end);
  }
}

/* The card's one main button shows what pressing it will do: Play when silent, Stop while sounding. */
function setPlaying(on){
  const b = $('play'), lang = current ? current.lang : PAGE_LANG;
  b.setAttribute('aria-pressed', String(on));
  $('playLabel').textContent = T[lang][on ? 'stop' : 'play'];
}
function fadeOut(){
  if(!bus || !AC) return;
  const old = bus, now = AC.currentTime;
  old.gain.cancelScheduledValues(now); old.gain.setTargetAtTime(0,now,.03);
  setTimeout(()=>old.disconnect(),400);
  bus = null;
}
function stop(){
  playId++; fadeOut(); setPlaying(false);
  document.querySelectorAll('#taf-roll rect').forEach(r=>r.style.opacity=.55);
}

function play(){
  if(!current || !ensureAudio()) return;
  const {phrase,key,e} = current, lead = leadVoice(e,timbre), now = AC.currentTime;
  fadeOut();
  bus = AC.createGain(); bus.connect(master);
  setPlaying(true);
  const fx = makeFx(lead,bus), base = now + .1, id = ++playId;
  phrase.notes.forEach(n=>{
    voice(lead,fx,base+n.t,n.midi,n.dur,n.vel,1);
    if(n.extra) voice(lead,fx,base+n.t,n.extra,n.dur,n.vel,.6);
  });
  const padE = Object.assign({},e,{wave:'triangle',attack:.3,decay:.5,sustain:.8,release:.7,legato:1,vib:null,detune:7,
                                   gain:e.gain*.42,pure:true,bright:Math.min(e.bright,1800)});
  const bassE = Object.assign({},e,{wave:'sine',attack:.05,decay:.3,sustain:.8,release:.5,legato:.95,vib:null,detune:0,gain:e.gain*1.1,pure:true});
  phrase.chords.forEach(c=>{
    c.tones.forEach(m=>voice(padE,fx,base+c.t,m,c.dur,.7,1));
    voice(bassE,fx,base+c.t,c.bass,c.dur,.8,1);
  });
  if(e.drone){
    const o = AC.createOscillator(), g = AC.createGain();
    o.type='sine'; o.frequency.value = midiHz(e.root-12);
    g.gain.setValueAtTime(.0001,base);
    g.gain.exponentialRampToValueAtTime(.06,base+1.5);
    g.gain.setValueAtTime(.06,base+phrase.total-1);
    g.gain.exponentialRampToValueAtTime(.0001,base+phrase.total+1.5);
    o.connect(g); g.connect(fx); o.start(base); o.stop(base+phrase.total+1.6);
  }
  const rects = [...document.querySelectorAll('#taf-roll rect')];
  (function frame(){
    if(id!==playId) return;
    const t = AC.currentTime - base;
    rects.forEach((r,i)=>{ const n = phrase.notes[i]; r.style.opacity = (t>=n.t && t<n.t+n.dur*.98) ? 1 : .45; });
    if(t < phrase.total+1.5) requestAnimationFrame(frame);
    else { rects.forEach(r=>r.style.opacity=.55); setPlaying(false); }
  })();
}

/* ---------- classification for words the page does not know ---------- */
/* The Worker (worker/worker.js) accepts {text} and returns {emotion, lang}. Its address is
   `classify_endpoint` in _config.yml; empty means unknown words are simply not understood. */
async function remoteClassify(text){
  if(!CLASSIFY_ENDPOINT) return null;
  const ctl = new AbortController(), timer = setTimeout(()=>ctl.abort(), 10000);
  try{
    const r = await fetch(CLASSIFY_ENDPOINT,{method:'POST',headers:{'content-type':'application/json'},
      body:JSON.stringify({text}),signal:ctl.signal});
    return r.ok ? await r.json() : null;
  }catch(err){ return null; }
  finally{ clearTimeout(timer); }
}

/* ---------- interface ---------- */
const T = DATA.strings;
const PAGE_LANG = T[document.documentElement.lang] ? document.documentElement.lang : 'en';
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const localDigits = (s,lang) => lang==='fa' ? String(s).replace(/\d/g,d=>FA_DIGITS[d]) : String(s);

function drawRoll(phrase){
  const svg = $('roll'); svg.textContent = '';
  const midis = phrase.notes.map(n=>n.midi), lo = Math.min(...midis), hi = Math.max(...midis), span = Math.max(1,hi-lo);
  phrase.notes.forEach(n=>{
    const r = document.createElementNS('http://www.w3.org/2000/svg','rect');
    const x = n.t/phrase.total*300, w = Math.max(4,n.dur*.9/phrase.total*300);
    const y = 64 - (n.midi-lo)/span*54;
    r.setAttribute('x',x.toFixed(1)); r.setAttribute('y',y.toFixed(1));
    r.setAttribute('width',w.toFixed(1)); r.setAttribute('height','6'); r.setAttribute('rx','3');
    svg.appendChild(r);
  });
}

/* ---------- the map ---------- */
const PAD = $('pad'), MARK = $('mark');
function moveMarker(p){
  MARK.style.insetInlineStart = 'auto'; MARK.style.right = 'auto';
  MARK.style.left = ((p.v+1)/2*100)+'%'; MARK.style.top = ((1-p.a)/2*100)+'%'; MARK.hidden = false;
}
Object.keys(POS).forEach(k=>{
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'taf-dot'; b.dataset.k = k;
  b.style.left = ((POS[k].v+1)/2*100)+'%'; b.style.top = ((1-POS[k].a)/2*100)+'%';
  const name = T[PAGE_LANG].emotions[k].name;
  b.innerHTML = '<span class="taf-dot-name"></span>'; b.firstChild.textContent = name;
  b.setAttribute('aria-label',name);
  b.addEventListener('click',ev=>{ ev.stopPropagation(); $('feeling').value = ''; ensureAudio(); showResult(k,{emo:k,lang:PAGE_LANG},true,0); });
  PAD.appendChild(b);
});
function padPoint(x,y){
  const r = PAD.getBoundingClientRect();
  return {v:Math.max(-1,Math.min(1,(x-r.left)/r.width*2-1)), a:Math.max(-1,Math.min(1,1-(y-r.top)/r.height*2))};
}
function playPoint(p){
  p = {v:Math.round(p.v*100)/100, a:Math.round(p.a*100)/100};
  $('feeling').value = ''; ensureAudio();
  showResult('p:'+Math.round(p.v*20)+','+Math.round(p.a*20),{emo:nearest(p.v,p.a),lang:PAGE_LANG},true,0,p);
}
PAD.addEventListener('click',ev=>playPoint(padPoint(ev.clientX,ev.clientY)));
// Arrow keys move the point in steps, Enter or Space plays it.
let kp = {v:0,a:0};
PAD.addEventListener('keydown',ev=>{
  if(ev.target!==PAD) return;
  const s = .15, m = {ArrowLeft:[-s,0],ArrowRight:[s,0],ArrowUp:[0,s],ArrowDown:[0,-s]}[ev.key];
  if(m){ ev.preventDefault(); kp = {v:Math.max(-1,Math.min(1,kp.v+m[0])),a:Math.max(-1,Math.min(1,kp.a+m[1]))}; moveMarker(kp); }
  else if(ev.key==='Enter' || ev.key===' '){ ev.preventDefault(); playPoint(kp); }
});

function showResult(text,hit,autoplay,v,pos){
  const lang = hit.lang, p = pos || POS[hit.emo], key = pos ? nearest(p.v,p.a) : hit.emo, e = synth(p.v,p.a,key);
  const box = $('result');
  box.hidden = false; box.lang = lang; box.dir = lang==='fa' ? 'rtl' : 'ltr';
  hit = {emo:key,lang};
  current = {text,key,lang,v:v||0,pos:p,e,phrase:buildPhrase(text,key,v||0,e)};
  moveMarker(p);
  // The nearest feeling on the map is marked, so the map and the answer always agree.
  document.querySelectorAll('.taf-dot').forEach(d=>d.setAttribute('aria-current', String(d.dataset.k===key)));
  drawRoll(current.phrase);
  $('emo').textContent = T[lang].emotions[hit.emo].name;
  $('cue').textContent = T[lang].emotions[hit.emo].cue;
  $('meta').textContent = T[lang].modes[e.scale] + ' · ' + localDigits(e.bpm,lang) + ' bpm';
  if(!autoplay){ playId++; setPlaying(false); }
  $('share').textContent = T[lang].share;
  $('take').textContent = T[lang].take;
  $('soundLabel').textContent = T[lang].sound;
  $('why').textContent = T[lang].why;
  ['auto','keys','strings'].forEach(k=>{ $('t-'+k).textContent = T[lang]['timbre_'+k]; });
  document.querySelectorAll('.feeling-timbre button').forEach(b=>b.setAttribute('aria-pressed', String(b.dataset.t===timbre)));
  $('shareOut').textContent = '';
  $('status').textContent = '';
  if(autoplay) play();
  // On a small screen the card can start below the fold: bring it into view.
  const calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  box.scrollIntoView({block:'nearest',behavior:calm?'auto':'smooth'});
}

async function handle(raw,autoplay=true,localOnly=false,v=0){
  const text = raw.trim().slice(0,40);
  if(!text) return;
  $('status').textContent = '';
  let hit = lookup(text);
  if(!hit && localOnly){ $('status').textContent = ''; return; }
  if(!hit){
    $('status').textContent = '…';
    const ai = localOnly ? null : await remoteClassify(text);
    if(ai && ai.emotion && EMO[ai.emotion]){
      const l = ['en','es','fa'].includes(ai.lang) ? ai.lang : detectLang(text);
      hit = {emo:ai.emotion,lang:l};
    }
  }
  if(!hit){
    stop(); $('result').hidden = true;
    $('status').textContent = T[PAGE_LANG].unknown;
    return;
  }
  showResult(text,hit,autoplay,v);
}

$('form').addEventListener('submit',ev=>{ ev.preventDefault(); ensureAudio(); handle($('feeling').value); });
document.querySelectorAll('.taf-chip').forEach(c=>c.addEventListener('click',()=>{
  $('feeling').value = c.dataset.w; ensureAudio(); handle(c.dataset.w);
}));
$('play').addEventListener('click',()=>{
  if(!current) return;
  if($('play').getAttribute('aria-pressed')==='true') stop();
  else { ensureAudio(); play(); }
});
$('take').addEventListener('click',()=>{
  if(!current) return;
  ensureAudio();
  current.v++; current.phrase = buildPhrase(current.text,current.key,current.v,current.e);
  drawRoll(current.phrase); play();
});
document.querySelectorAll('.feeling-timbre button').forEach(b=>b.addEventListener('click',()=>{
  timbre = b.dataset.t;
  document.querySelectorAll('.feeling-timbre button').forEach(x=>x.setAttribute('aria-pressed', String(x===b)));
  if(current){ ensureAudio(); play(); }
}));
$('share').addEventListener('click',async()=>{
  if(!current) return;
  const url = location.href.split('#')[0] + '#' + (/^p:/.test(current.text) ? 'p=' + Math.round(current.pos.v*100) + ',' + Math.round(current.pos.a*100) : 'f=' + encodeURIComponent(current.text))
    + (current.v ? '&v='+current.v : '') + (timbre!=='auto' ? '&s='+timbre : '');
  try{ await navigator.clipboard.writeText(url); $('shareOut').textContent = T[current.lang].copied; }
  catch(err){ $('shareOut').textContent = url; }
});

/* A shared link opens the result but waits for a tap before making sound. It only uses the
   words the page already knows: an unknown word would need the network, so it waits for the
   visitor to press the button. */
try{
  const m = location.hash.match(/f=([^&]+)/), mp = location.hash.match(/p=(-?\d+),(-?\d+)/);
  if(mp){
    const p = {v:Math.max(-1,Math.min(1,+mp[1]/100)), a:Math.max(-1,Math.min(1,+mp[2]/100))}, ms = location.hash.match(/s=(keys|strings)/);
    if(ms) timbre = ms[1];
    PAD.closest('details').open = true;
    showResult('p:'+Math.round(p.v*20)+','+Math.round(p.a*20),{emo:nearest(p.v,p.a),lang:PAGE_LANG},false,0,p);
  } else if(m){
    const w = decodeURIComponent(m[1]), mv = location.hash.match(/v=(\d+)/), ms = location.hash.match(/s=(keys|strings)/);
    if(ms) timbre = ms[1];
    $('feeling').value = w; handle(w,false,true,mv ? Math.min(99,+mv[1]) : 0);
  }
}catch(err){}
})();
