---
layout: default
title: "dos — Design of سهی"
description: "Herramientas pequeñas para gente entre idiomas. Aplicaciones, simulaciones y herramientas en English, Español y فارسی, diseñadas y construidas de principio a fin. Encargos bienvenidos."
ref: home
permalink: /es/
---
{%- assign t = site.data.i18n[page.lang] -%}
<section class="intro">
  <h1>Herramientas pequeñas para gente entre idiomas.</h1>
  <p class="lede">Aplicaciones, simulaciones y herramientas en English, Español y <span lang="fa" dir="rtl">فارسی</span>, diseñadas y construidas de principio a fin. Encargos bienvenidos.</p>
</section>

{% include type-a-feeling.html %}

{% include project-list.html %}

{%- if site.email and site.email != "" %}
<p class="contact"><a href="mailto:{{ site.email }}">{{ t.write_to_us }}</a></p>
{%- endif %}
