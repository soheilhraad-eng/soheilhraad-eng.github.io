---
layout: project
title: The Digital Tarot Sanctuary
description: اپلیکیشن فال تاروت با هوش مصنوعی به سه زبان، با تصاویر اصلی کارت‌های رایدر-ویت ۱۹۰۹.
lede: "اپلیکیشن فال تاروت با هوش مصنوعی به سه زبان، با تصاویر اصلی کارت‌های رایدر-ویت ۱۹۰۹."
decision: "پیش از شروع فال می‌گوید که هوش مصنوعی است، و فال‌های ناشناس هرگز ذخیره نمی‌شوند."
permalink: /fa/projects/tarot-app/
ref: tarot
video:      # TODO(owner): a 30 s demo, as a YouTube id or a path under /assets/video/
poster:     # TODO(owner): image path; also becomes this page's og:image (add the same path as image:)
cta_label: "امتحانش کنید"
cta_url: https://tarotx.streamlit.app
images:     # TODO(owner): screenshots, e.g. - {src: /assets/img/projects/tarot-1.jpg, alt: "The reading table"}
---
{%- assign t = site.data.i18n[page.lang] -%}

<details class="fold" markdown="1" open>
<summary>{{ t.detail_does }}</summary>

- **۷۸ کارت**: دستهٔ کامل رایدر-ویت ۱۹۰۹، با معنای هر کارت.
- **سه زبان**: English، Español و فارسی، با چیدمان کامل راست‌به‌چپ برای فارسی.
- **سه فالگیر**، هرکدام با صدای خودش، و **پنج چیدمان** تا صلیب سلتی.

</details>

<details class="fold" markdown="1">
<summary>{{ t.detail_built }}</summary>

- **پایتون و Streamlit**، در یک فایل.
- **یک کد، دو شیوهٔ اجرا**: یک مدل باز روی رایانهٔ خودتان با Ollama، یا یک مدل میزبانی‌شده آنلاین.
- **پیش از شروع فال می‌گوید که هوش مصنوعی است**، و فال‌های ناشناس هرگز ذخیره نمی‌شوند.

</details>
