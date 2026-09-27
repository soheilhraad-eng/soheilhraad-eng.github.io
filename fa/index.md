---
layout: default
title: خانه
ref: home
permalink: /fa/
---
{%- assign t = site.data.i18n[page.lang] -%}
<section class="hero">
  <p class="eyebrow">آماده همکاری</p>
  <h1>ساختن همراه با ذهن‌های خلاق، هر جا که کار کنند.</h1>
  <p class="lede">اپلیکیشن‌های هوش مصنوعی، ابزارهای چندزبانه و شبیه‌سازی‌ها، طراحی‌شده و ساخته‌شده از ابتدا تا انتها، از راه دور، به فارسی، انگلیسی و اسپانیایی.</p>
  <p class="actions">
    <a class="button" href="{{ site.contact_url }}">{{ t.start_project }} {{ t.arrow }}</a>
    <a class="button secondary" href="{{ t.prefix | append: '/projects/' | relative_url }}">دیدن کارها</a>
  </p>
</section>

{% include chat.html %}

<h2>{{ t.projects }}</h2>
{% include project-cards.html %}
