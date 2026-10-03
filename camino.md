---
layout: project
title: Camino
description: An offline Spanish tutor for absolute beginners. It runs entirely on the learner's own computer, with no account and no internet after setup.
lede: "An offline Spanish tutor for absolute beginners. Twenty-five lessons, a year in Salamanca, and someone to speak Spanish with."
decision: "When the model cannot be relied on to produce something, the app produces it instead: conjugations, exercise marking and which language to explain in all come from code, not from the model."
permalink: /projects/camino/
ref: camino
clip: /assets/video/camino-demo.mp4
clip_portrait: true
poster: /assets/img/projects/camino-poster.jpg
image: /assets/img/projects/camino-poster.jpg
clip_alt: "Camino on a phone: choosing the language of explanations and a name, a lesson card on Spanish spelling, the tutor explaining the tilde in Spanish and English, and an exercise answered correctly."
---
{%- assign t = site.data.i18n[page.lang] -%}

<details class="fold" markdown="1" open>
<summary>{{ t.detail_does }}</summary>

- **25 lessons** for absolute beginners, explained in Persian, English or Spanish.
- **1,180 exercises**, marked by the app itself, and a tutor to talk to.
- **Every word spoken aloud**, and a story: each lesson you master unlocks a scene of a year in Salamanca.
- **Offline and private**: no account, and no internet after setup.

</details>

<details class="fold" markdown="1">
<summary>{{ t.detail_built }}</summary>

- **Code, not the model, does the exact things**: conjugations, marking, and which language to explain in.
- **Python, Streamlit and a local open model** (Ollama), with search over openly licensed textbooks.

</details>
