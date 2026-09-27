---
layout: default
title: Home
---
<section class="hero">
  <h1>Hi, I'm Sohi.</h1>
  <p class="lede">I build things to find out how they work — lately, apps that put language models to work on something human.</p>
</section>

## Projects

<div class="cards">
  <a class="card" href="{{ '/projects/tarot-app/' | relative_url }}">
    <h3>The Digital Tarot Sanctuary</h3>
    <p>AI tarot readings in English, Spanish and Farsi, with the 1909 Rider-Waite deck.</p>
  </a>
</div>

<p><a href="{{ '/projects/' | relative_url }}">All projects →</a></p>

## Writing

{% if site.posts.size > 0 %}
<ul class="post-list">
  {% for post in site.posts limit: 5 %}
  <li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b %Y" }}</time> <a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
{% else %}
<p>Nothing yet.</p>
{% endif %}
