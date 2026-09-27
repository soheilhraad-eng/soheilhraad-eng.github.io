---
layout: default
title: Inicio
ref: home
permalink: /es/
---
{%- assign t = site.data.i18n[page.lang] -%}
<section class="hero">
  <h1>Hola, soy Sohi.</h1>
  <p class="lede">Construyo cosas para entender cómo funcionan: aplicaciones de IA, herramientas para aprender idiomas y simulaciones.</p>
</section>

<h2>{{ t.projects }}</h2>
{% include project-cards.html %}
<p><a href="{{ t.prefix | append: '/projects/' | relative_url }}">{{ t.all_projects }} {{ t.arrow }}</a></p>

<h2>{{ t.writing }}</h2>
{% include post-list.html limit=5 %}
