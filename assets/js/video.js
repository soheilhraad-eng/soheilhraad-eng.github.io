// Click-to-load video. Until the visitor clicks play, the page shows a still image (from this
// site) and a button, and makes no request to YouTube. On click, the player from
// youtube-nocookie.com replaces the button.
(function () {
  'use strict';
  document.querySelectorAll('.click-to-load[data-youtube]').forEach(function (box) {
    var button = box.querySelector('.project-play');
    if (!button) return;
    button.addEventListener('click', function () {
      var id = box.getAttribute('data-youtube');
      if (!/^[A-Za-z0-9_-]{6,20}$/.test(id)) return;
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      frame.title = box.getAttribute('data-title') || '';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      box.replaceChildren(frame);
      frame.focus();
    });
  });
})();
