---
layout: default
title: "dos — Design of سهی"
description: "ابزارهای کوچک برای کسانی که میان زبان‌ها زندگی می‌کنند. اپلیکیشن‌ها، شبیه‌سازی‌ها و ابزارها به English، Español و فارسی، طراحی‌شده و ساخته‌شده از ابتدا تا انتها. سفارش‌ها پذیرفته می‌شوند."
ref: home
permalink: /fa/
---
{%- assign t = site.data.i18n[page.lang] -%}
<section class="intro">
  <h1>ابزارهای کوچک برای کسانی که میان زبان‌ها زندگی می‌کنند.</h1>
  <p class="lede">اپلیکیشن‌ها، شبیه‌سازی‌ها و ابزارها به <span lang="en" dir="ltr">English</span>، <span lang="es" dir="ltr">Español</span> و <span lang="fa" dir="rtl">فارسی</span>، طراحی‌شده و ساخته‌شده از ابتدا تا انتها. سفارش‌ها پذیرفته می‌شوند.</p>
</section>

{% include type-a-feeling.html %}

{% include project-list.html %}

{%- if site.email and site.email != "" %}
<p class="contact"><a href="mailto:{{ site.email }}">{{ t.write_to_us }}</a></p>
{%- endif %}
