---
layout: default
title: Inicio
ref: home
permalink: /es/
---
{%- assign t = site.data.i18n[page.lang] -%}
<section class="hero">
  <p class="eyebrow">Abierto a colaborar</p>
  <h1>Construyendo con mentes creativas, trabajen donde trabajen.</h1>
  <p class="lede">Aplicaciones de IA, herramientas multilingües y simulaciones, diseñadas y construidas de principio a fin, en remoto, en español, inglés y persa.</p>
  <p class="actions">
    <a class="button" href="{{ site.contact_url }}">{{ t.start_project }} {{ t.arrow }}</a>
    <a class="button secondary" href="{{ t.prefix | append: '/projects/' | relative_url }}">Ver el trabajo</a>
  </p>
</section>

{% include chat.html %}

<h2>{{ t.projects }}</h2>
{% include project-cards.html %}
