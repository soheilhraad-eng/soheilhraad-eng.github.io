---
layout: page
title: Camino
description: An offline Spanish tutor for absolute beginners. It runs entirely on the learner's own computer, with no account and no internet after setup.
permalink: /projects/camino/
---

<p class="lede">An offline Spanish tutor for absolute beginners. Twenty-five lessons, a year in Salamanca, and someone to speak Spanish with.</p>

<!-- A demo video goes here once it's recorded. -->

## Who it's for

Camino is built for NGO learners whose first language is usually Persian, who often start with
no Spanish and limited English. Explanations come in the learner's own language: Persian,
English or Spanish, with a full right-to-left layout for Persian. It teaches Peninsular
Spanish, the Spanish of Spain.

It is free to give away and never sold.

## Offline and private is the product

Everything runs on the learner's own machine: a local language model through Ollama, a local
search index over the course material, and no account, email or password. After a one-time
setup, it needs no internet, and nothing a learner types is sent anywhere.

Setup is one double-click. The installer checks what the computer already has, downloads
what's missing, and picks a smaller model automatically on machines with less than 8 GB of
memory.

## What's in it

- **A 25-lesson course**, taught one point at a time in the learner's language, with a
  mastery gate before each new lesson.
- **1,180 exercises** in eight kinds, marked by the app itself.
- **A tutor to talk to**, grounded in open textbooks and checked before each reply reaches the screen.
- **Every word spoken aloud**, from a pre-recorded audio library.
- **A story instead of a score**: each lesson mastered unlocks one scene of a year in Salamanca.
- **Six achievements for things the learner actually pulled off.** No streaks and no
  turn counts, on purpose.

## How it's built

The rule that shaped the whole project: **when the model can't be relied on to produce
something, the app produces it instead.** Verb conjugations, letter names, exercise
marking, which language to explain in, and the answer to "are you a robot?" all come from
code rather than from the model. Every fix that held worked this way; every fix that
tried to instruct the model into correctness failed.

Python and Streamlit, with Ollama running a small open model (Gemma 3 by default), and
search that combines keyword matching (BM25) with meaning-based vector search (FAISS). The
course material draws on openly licensed textbooks, credited with every copy.
