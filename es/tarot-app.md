---
layout: page
title: The Digital Tarot Sanctuary
description: Una aplicación de lecturas de tarot con IA en tres idiomas, con las ilustraciones originales Rider-Waite de 1909.
permalink: /es/projects/tarot-app/
ref: tarot
---

<p class="lede">Una aplicación de lecturas de tarot con IA en tres idiomas, con las ilustraciones originales Rider-Waite de 1909.</p>

<p><a class="button" href="https://tarotx.streamlit.app">{{ site.data.i18n[page.lang].try_live }} {{ site.data.i18n[page.lang].arrow }}</a></p>

## Qué hace

- **78 cartas**: la baraja Rider-Waite completa, escaneada de la edición de 1909 (de dominio público), con significados y descripciones de cada imagen.
- **Tres idiomas**: English, Español y فارسی, con un diseño completo de derecha a izquierda para el persa. Cada carta, significado y texto de la interfaz está traducido a mano.
- **Tres lectoras**: Luna, la mística velada; Sage, la estudiosa de los símbolos; y Madame Zara, la vidente teatral. Cada una tiene su propia voz, un saludo hablado y opiniones sobre ciertas cartas.
- **Cinco tiradas**, desde una sola carta hasta la Cruz Celta de diez, dispuesta como una cruz y un báculo de verdad.
- **Sonido, si lo quieres**: grabaciones reales de una sala a la luz de las velas, una baraja al barajarse y un cuenco tibetano. Desactivado hasta que lo actives.

## Cómo está hecha

- **Python y Streamlit**, en una aplicación de un solo archivo a propósito.
- **Funciona de dos maneras con el mismo código**: en local, con un modelo abierto a través de Ollama, sin que nada salga del ordenador; o como sitio web, con un modelo alojado. Un solo ajuste cambia entre ambas.
- **Un único modelo para todos los idiomas**, así nunca se detiene a cargar un segundo modelo al cambiar de idioma.
- **Honesta sobre lo que es**: la página avisa desde el principio de que la voz que te lee las cartas es una IA, y las lecturas anónimas nunca se guardan.
