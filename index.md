---
layout: default
title: "dos — Design of سهی"
description: "Small tools for people between languages. Apps, simulations and tools in English, Español and فارسی, designed and built end to end. Commissions welcome."
ref: home
---
{%- assign t = site.data.i18n[page.lang] -%}
<section class="intro">
  <h1>Small tools for people between languages.</h1>
  <p class="lede">Apps, simulations and tools in <span lang="en" dir="ltr">English</span>, <span lang="es" dir="ltr">Español</span> and <span lang="fa" dir="rtl">فارسی</span>, designed and built end to end. Commissions welcome.</p>
</section>

{% include type-a-feeling.html %}

{% include project-list.html %}

{%- if site.email and site.email != "" %}
<p class="contact"><a href="mailto:{{ site.email }}">{{ t.write_to_us }}</a></p>
{%- endif %}
