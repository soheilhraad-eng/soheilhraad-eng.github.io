---
layout: project
title: Camino
description: Un tutor de español sin conexión para principiantes absolutos. Funciona por completo en el ordenador del alumno, sin cuenta y sin internet después de la instalación.
lede: "Un tutor de español sin conexión para principiantes absolutos. Veinticinco lecciones, un año en Salamanca y alguien con quien hablar español."
decision: "Cuando no se puede confiar en que el modelo produzca algo, lo produce la aplicación: las conjugaciones, la corrección de los ejercicios y el idioma en que se explica salen del código, no del modelo."
permalink: /es/projects/camino/
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

- **25 lecciones** para principiantes absolutos, explicadas en persa, inglés o español.
- **1.180 ejercicios**, corregidos por la propia aplicación, y un tutor con quien hablar.
- **Cada palabra en voz alta**, y una historia: cada lección dominada abre una escena de un año en Salamanca.
- **Sin conexión y privado**: sin cuenta y sin internet después de la instalación.

</details>

<details class="fold" markdown="1">
<summary>{{ t.detail_built }}</summary>

- **El código, no el modelo, hace lo exacto**: conjugaciones, corrección e idioma de la explicación.
- **Python, Streamlit y un modelo abierto local** (Ollama), con búsqueda en libros de texto de licencia abierta.

</details>
