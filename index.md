---
layout: default
title: Home
---
<section class="hero">
  <h1>Hi, I'm Sohi.</h1>
  <p class="lede">I build things to find out how they work: AI apps, language tools and simulations.</p>
</section>

## Projects

<div class="cards">
  <a class="card" href="{{ '/projects/tarot-app/' | relative_url }}">
    <h3>The Digital Tarot Sanctuary</h3>
    <p>AI tarot readings in English, Spanish and Farsi, with the 1909 Rider-Waite deck.</p>
  </a>
  <a class="card" href="{{ '/projects/camino/' | relative_url }}">
    <h3>Camino</h3>
    <p>An offline Spanish tutor for beginners: 25 lessons, explained in Persian, English or Spanish. Nothing leaves the learner's computer.</p>
  </a>
  <a class="card" href="{{ '/projects/netlogo/' | relative_url }}">
    <h3>NetLogo modelling project</h3>
    <p>An agent-based model built in NetLogo.</p>
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
