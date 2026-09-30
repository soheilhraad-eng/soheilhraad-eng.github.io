---
layout: project
title: Small Town
description: A small town, simulated in NetLogo. Newcomers settle, ties form, and integration or separation emerges from host receptivity, individual preparedness and the capacity of local services.
lede: "A small town, simulated in NetLogo. Newcomers arrive, ties form, and the town shows when settlement leads to integration and when it leads to separation."
decision: "Outcomes are not assigned or scored. They are read from each person's network: who they are actually connected to, inside their own community and across to the host one."
permalink: /projects/small-town/
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

- **Newcomers settle among residents**, and every person is an agent who forms ties over time.
- **Outcomes are read from the network**, not assigned: integration and separation are patterns of ties.
- **Three levers**: how receptive the town is, how prepared newcomers are, and how much capacity local services have.

</details>

<details class="fold" markdown="1">
<summary>{{ t.detail_built }}</summary>

- **Grounded in theory**: Berry, Bourhis, contact theory and rejection–identification.
- **Adds two rare things**: acculturative stress with buffering, and service capacity that congests as demand grows.
- **Next**: an ODD write-up, sensitivity analysis, calibration, and a public CoMSES release.

</details>
