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
---
{%- assign t = site.data.i18n[page.lang] -%}

<details class="fold" markdown="1">
<summary>{{ t.detail_does }}</summary>

### Para quién es

Camino está pensado para alumnos de ONG cuya lengua materna suele ser el persa, que a menudo
empiezan sin nada de español y con poco inglés. Las explicaciones llegan en la lengua del
alumno: persa, inglés o español, con un diseño completo de derecha a izquierda para el persa.
Enseña español de España.

Es gratuito, para regalar, y nunca se vende.

### Sin conexión y privado: ese es el producto

Todo funciona en el ordenador del alumno: un modelo de lenguaje local a través de Ollama, un
índice de búsqueda local sobre el material del curso, y sin cuenta, correo ni contraseña.
Tras una instalación única, no necesita internet y nada de lo que escribe el alumno se envía
a ninguna parte.

La instalación es un doble clic. El instalador comprueba lo que ya tiene el ordenador,
descarga lo que falta y elige automáticamente un modelo más pequeño en equipos con menos de
8 GB de memoria.

### Qué incluye

- **Un curso de 25 lecciones**, enseñado punto por punto en la lengua del alumno, con una
  prueba de dominio antes de cada lección nueva.
- **1.180 ejercicios** de ocho tipos, corregidos por la propia aplicación.
- **Un tutor con quien hablar**, apoyado en libros de texto abiertos y revisado antes de que
  cada respuesta llegue a la pantalla.
- **Cada palabra, en voz alta**, gracias a una biblioteca de audio pregrabada.
- **Una historia en lugar de una puntuación**: cada lección dominada desbloquea una escena de
  un año en Salamanca.
- **Seis logros por cosas que el alumno ha conseguido de verdad.** Sin rachas ni recuentos
  de turnos, a propósito.

</details>

<details class="fold" markdown="1">
<summary>{{ t.detail_built }}</summary>

La regla que dio forma a todo el proyecto: **cuando no se puede confiar en que el modelo
produzca algo, lo produce la aplicación.** Las conjugaciones, los nombres de las letras, la
corrección de ejercicios, el idioma de las explicaciones y la respuesta a «¿eres un robot?»
salen del código, no del modelo. Todas las soluciones que funcionaron siguieron este camino;
todas las que intentaron convencer al modelo de ser correcto fracasaron.

Python y Streamlit, con Ollama ejecutando un modelo abierto pequeño (Gemma 3 por defecto), y
una búsqueda que combina coincidencia de palabras clave (BM25) con búsqueda vectorial por
significado (FAISS). El material del curso se basa en libros de texto con licencia abierta,
cuya atribución acompaña a cada copia.

</details>
