---
layout: page
title: Blog
permalink: /blog/
---

{% if site.posts.size > 0 %}
<ul class="post-list">
  {% for post in site.posts %}
  <li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b %Y" }}</time> <a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
{% else %}
<p>Nothing yet.</p>
{% endif %}
