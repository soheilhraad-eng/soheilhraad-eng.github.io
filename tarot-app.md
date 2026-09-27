---
layout: page
title: The Digital Tarot Sanctuary
description: An AI-powered tarot reading app in three languages, with the original 1909 Rider-Waite artwork.
permalink: /projects/tarot-app/
ref: tarot
---

<p class="lede">An AI-powered tarot reading app in three languages, with the original 1909 Rider-Waite artwork.</p>

<p><a class="button" href="https://tarotx.streamlit.app">{{ site.data.i18n[page.lang].try_live }} {{ site.data.i18n[page.lang].arrow }}</a></p>

## What it does

- **78 cards**: the full Rider-Waite deck, from public-domain 1909 scans, with meanings and imagery descriptions.
- **Three languages**: English, Español and فارسی, with a full right-to-left layout. Every card, meaning and interface string is hand-translated.
- **Three readers**: Luna the veiled mystic, Sage the symbol scholar and Madame Zara the theatrical seer. Each has her own voice, a spoken greeting and opinions about particular cards.
- **Five spreads**, from a single card to the ten-card Celtic Cross, laid out as a real cross and staff.
- **Sound, if you want it**: real recordings of a candlelit room, a deck being shuffled and a singing bowl. Off until you turn it on.

## How it's built

- **Python and Streamlit**, deliberately kept to a single-file app.
- **Runs two ways from the same code**: locally with an open model through Ollama, where nothing leaves the machine, or as a website with a hosted model. One setting switches between them.
- **One model for every language**, so it never stalls reloading a second model when you switch language.
- **Honest about what it is**: the page says up front that the voice reading for you is an AI, and anonymous readings are never stored.
