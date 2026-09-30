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
---
{%- assign t = site.data.i18n[page.lang] -%}

<details class="fold" markdown="1">
<summary>{{ t.detail_does }}</summary>

### La pregunta

¿Cómo interactúan tres factores: lo receptiva que es la sociedad de acogida, lo preparada que
está cada persona recién llegada y cuánta capacidad tienen las instituciones locales? ¿Y cuál
de esas palancas inclina de verdad la balanza entre integración y separación?

### Cómo funciona

El modelo es un pueblo pequeño. Los recién llegados se asientan entre los vecinos de siempre, y cada persona es un agente que crea vínculos sociales con el tiempo. Los servicios locales del pueblo solo pueden atender a cierto número de personas a la vez. El
resultado de cada migrante no se asigna ni se puntúa: **se lee en su red**, es decir, con quién
está realmente conectado, dentro de su propia comunidad y con la sociedad de acogida. La
integración, la separación y los demás resultados son patrones en esos vínculos, no etiquetas.

El modelo se basa en teorías consolidadas: el marco de aculturación de Berry, el modelo
interactivo de aculturación de Bourhis, la teoría del contacto y el modelo de
rechazo-identificación.

</details>

<details class="fold" markdown="1">
<summary>{{ t.detail_built }}</summary>

### Qué lo distingue

Su pariente publicado más cercano es MigrAgent, de Paolillo y Jager (*Social Science Computer
Review*, 2020), que también define los resultados de la aculturación a partir de los vínculos
de la red. Este modelo se diseñó de forma independiente y llegó a la misma idea central. Luego
añade dos cosas raras o ausentes en los trabajos publicados:

- **El estrés aculturativo**, con amortiguación y retroalimentación. El estrés crece con las
  experiencias difíciles, el apoyo social lo amortigua y, a su vez, cambia cómo se comportan
  las personas.
- **La capacidad institucional como palanca.** Los servicios locales pueden facilitar el
  asentamiento, pero se saturan cuando aumenta la demanda, y eso repercute en los resultados.

### Hacia dónde va

El diseño ya está hecho. La siguiente etapa es la evidencia:

- Reproducibilidad total y una descripción según el protocolo ODD, el formato estándar para
  describir modelos basados en agentes.
- Experimentos sistemáticos con los parámetros principales y un análisis de sensibilidad
  global para mostrar qué ajustes determinan realmente los resultados.
- Calibración con patrones empíricos publicados, para que el modelo reproduzca lo que las
  encuestas observan de verdad.
- Una publicación abierta y citable en CoMSES, seguida de un documento de trabajo.

</details>
