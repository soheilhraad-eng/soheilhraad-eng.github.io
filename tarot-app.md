---
layout: project
title: The Digital Tarot Sanctuary
description: An AI-powered tarot reading app in three languages, with the original 1909 Rider-Waite artwork.
lede: "An AI-powered tarot reading app in three languages, with the original 1909 Rider-Waite artwork."
decision: "It tells you it is an AI before the reading starts, and anonymous readings are never stored."
permalink: /projects/tarot-app/
ref: tarot
video:      # TODO(owner): a 30 s demo, as a YouTube id or a path under /assets/video/
poster:     # TODO(owner): image path; also becomes this page's og:image (add the same path as image:)
cta_label: "Try it live"
cta_url: https://tarotx.streamlit.app
---
{%- assign t = site.data.i18n[page.lang] -%}

<details class="fold" markdown="1">
<summary>{{ t.detail_does }}</summary>

- **78 cards**: the full Rider-Waite deck, from public-domain 1909 scans, with meanings and imagery descriptions.
- **Three languages**: English, Español and فارسی, with a full right-to-left layout. Every card, meaning and interface string is hand-translated.
- **Three readers**: Luna the veiled mystic, Sage the symbol scholar and Madame Zara the theatrical seer. Each has her own voice, a spoken greeting and opinions about particular cards.
- **Five spreads**, from a single card to the ten-card Celtic Cross, laid out as a real cross and staff.
- **Sound, if you want it**: real recordings of a candlelit room, a deck being shuffled and a singing bowl. Off until you turn it on.

</details>

<details class="fold" markdown="1">
<summary>{{ t.detail_built }}</summary>

- **Python and Streamlit**, deliberately kept to a single-file app.
- **Runs two ways from the same code**: locally with an open model through Ollama, where nothing leaves the machine, or as a website with a hosted model. One setting switches between them.
- **One model for every language**, so it never stalls reloading a second model when you switch language.
- **Honest about what it is**: the page says up front that the voice reading for you is an AI, and anonymous readings are never stored.

</details>
