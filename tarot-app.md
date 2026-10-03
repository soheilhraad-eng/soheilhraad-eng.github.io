---
layout: project
title: The Digital Tarot Sanctuary
description: An AI-powered tarot reading app in three languages, with the original 1909 Rider-Waite artwork.
lede: "An AI-powered tarot reading app in three languages, with the original 1909 Rider-Waite artwork."
decision: "It tells you it is an AI before the reading starts, and anonymous readings are never stored."
permalink: /projects/tarot-app/
ref: tarot
cta_label: "Try it live"
cta_url: https://tarotx.streamlit.app
clip: /assets/video/tarot-demo.mp4
poster: /assets/img/projects/tarot-poster.jpg
image: /assets/img/projects/tarot-poster.jpg
clip_alt: "A reading in the Digital Tarot Sanctuary: the interface switches to Persian, a five-card horseshoe spread appears, and the oracle's written synthesis plays aloud."
---
{%- assign t = site.data.i18n[page.lang] -%}

<details class="fold" markdown="1" open>
<summary>{{ t.detail_does }}</summary>

- **78 cards**: the full 1909 Rider-Waite deck, with a meaning for each.
- **Three languages**: English, Español and فارسی, fully right-to-left in Persian.
- **Three readers**, each with her own voice, and **five spreads** up to the Celtic Cross.

</details>

<details class="fold" markdown="1">
<summary>{{ t.detail_built }}</summary>

- **Python and Streamlit**, kept to a single file.
- **One codebase, two ways to run**: an open model on your own machine through Ollama, or a hosted model online.
- **It says it is an AI** before the reading starts, and anonymous readings are never stored.

</details>
