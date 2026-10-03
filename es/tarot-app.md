---
layout: project
title: The Digital Tarot Sanctuary
description: Una aplicación de lecturas de tarot con IA en tres idiomas, con las ilustraciones originales Rider-Waite de 1909.
lede: "Una aplicación de lecturas de tarot con IA en tres idiomas, con las ilustraciones originales Rider-Waite de 1909."
decision: "Te dice que es una IA antes de que empiece la lectura, y las lecturas anónimas nunca se guardan."
permalink: /es/projects/tarot-app/
ref: tarot
cta_label: "Pruébalo"
cta_url: https://tarotx.streamlit.app
clip: /assets/video/tarot-demo.mp4
poster: /assets/img/projects/tarot-poster.jpg
image: /assets/img/projects/tarot-poster.jpg
clip_alt: "Una lectura en el Digital Tarot Sanctuary: la interfaz cambia a persa, aparece una tirada de herradura de cinco cartas y se reproduce en voz alta la síntesis escrita de la oráculo."
---
{%- assign t = site.data.i18n[page.lang] -%}

<details class="fold" markdown="1" open>
<summary>{{ t.detail_does }}</summary>

- **78 cartas**: la baraja Rider-Waite completa de 1909, con el significado de cada una.
- **Tres idiomas**: English, Español y فارسی, con diseño completo de derecha a izquierda en persa.
- **Tres lectoras**, cada una con su propia voz, y **cinco tiradas** hasta la Cruz Celta.

</details>

<details class="fold" markdown="1">
<summary>{{ t.detail_built }}</summary>

- **Python y Streamlit**, en un solo archivo.
- **Un código, dos formas de usarlo**: un modelo abierto en tu propio ordenador con Ollama, o un modelo alojado en línea.
- **Avisa de que es una IA** antes de empezar la lectura, y las lecturas anónimas nunca se guardan.

</details>
