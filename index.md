---
layout: default
title: Home
ref: home
---
{%- assign t = site.data.i18n[page.lang] -%}
<section class="hero">
  <p class="eyebrow">Open to collaboration</p>
  <h1>Building with creative minds, wherever they work.</h1>
  <p class="lede">AI applications, multilingual tools and simulations, designed and built end to end, remotely, in English, Spanish and Persian.</p>
  <p class="actions">
    <a class="button" href="{{ site.contact_url }}">{{ t.start_project }} {{ t.arrow }}</a>
    <a class="button secondary" href="{{ t.prefix | append: '/projects/' | relative_url }}">See the work</a>
  </p>
</section>

{% include chat.html %}

<h2>{{ t.projects }}</h2>
{% include project-cards.html %}
