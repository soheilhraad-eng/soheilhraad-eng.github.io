---
layout: project
title: The Digital Tarot Sanctuary
description: Una aplicación de lecturas de tarot con IA en tres idiomas, con las ilustraciones originales Rider-Waite de 1909.
lede: "Una aplicación de lecturas de tarot con IA en tres idiomas, con las ilustraciones originales Rider-Waite de 1909."
decision: "Te dice que es una IA antes de que empiece la lectura, y las lecturas anónimas nunca se guardan."
permalink: /es/projects/tarot-app/
ref: tarot
video:      # TODO(owner): a 30 s demo, as a YouTube id or a path under /assets/video/
poster:     # TODO(owner): image path; also becomes this page's og:image (add the same path as image:)
cta_label: "Pruébalo"
cta_url: https://tarotx.streamlit.app
images:     # TODO(owner): screenshots, e.g. - {src: /assets/img/projects/tarot-1.jpg, alt: "The reading table"}
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
