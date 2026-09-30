---
layout: project
title: Camino
description: An offline Spanish tutor for absolute beginners. It runs entirely on the learner's own computer, with no account and no internet after setup.
lede: "An offline Spanish tutor for absolute beginners. Twenty-five lessons, a year in Salamanca, and someone to speak Spanish with."
decision: "When the model cannot be relied on to produce something, the app produces it instead: conjugations, exercise marking and which language to explain in all come from code, not from the model."
permalink: /projects/camino/
ref: camino
video:      # TODO(owner): a 60-90 s demo, as a YouTube id or a path under /assets/video/
poster:     # TODO(owner): image path; also becomes this page's og:image (add the same path as image:)
cta_label:  # TODO(owner): e.g. Download
cta_url:    # TODO(owner): the download address
images:     # TODO(owner): screenshots, e.g. - {src: /assets/img/projects/tarot-1.jpg, alt: "The reading table"}
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
