---
layout: project
title: Small Town
description: Un pueblo pequeño, simulado en NetLogo. Llegan recién llegados, se crean vínculos y la integración o la separación surgen de la receptividad de los vecinos, la preparación individual y la capacidad de los servicios locales.
lede: "Un pueblo pequeño, simulado en NetLogo. Llega gente nueva, se crean vínculos y el pueblo muestra cuándo el asentamiento lleva a la integración y cuándo a la separación."
decision: "Los resultados no se asignan ni se puntúan: se leen en la red de cada persona, es decir, con quién está realmente conectada, dentro de su propia comunidad y con la comunidad de acogida."
permalink: /es/projects/small-town/
ref: small-town
video:      # TODO(owner): a demo video, or leave empty and set cta_url to a NetLogo Web link
poster:     # TODO(owner): image path; also becomes this page's og:image (add the same path as image:)
cta_label:  # TODO(owner): e.g. Run it in the browser
cta_url:    # TODO(owner): NetLogo Web link, if the model runs there
images:     # TODO(owner): screenshots, e.g. - {src: /assets/img/projects/tarot-1.jpg, alt: "The reading table"}
---
{%- assign t = site.data.i18n[page.lang] -%}

<details class="fold" markdown="1" open>
<summary>{{ t.detail_does }}</summary>

- **Los recién llegados se asientan entre los vecinos**, y cada persona es un agente que crea vínculos con el tiempo.
- **Los resultados se leen en la red**, no se asignan: integración y separación son patrones de vínculos.
- **Tres palancas**: lo receptivo que es el pueblo, lo preparados que llegan y cuánta capacidad tienen los servicios locales.

</details>

<details class="fold" markdown="1">
<summary>{{ t.detail_built }}</summary>

- **Basado en teoría**: Berry, Bourhis, teoría del contacto y rechazo-identificación.
- **Añade dos cosas raras**: estrés aculturativo con amortiguación y servicios que se saturan al crecer la demanda.
- **Siguiente**: descripción ODD, análisis de sensibilidad, calibración y publicación en CoMSES.

</details>
