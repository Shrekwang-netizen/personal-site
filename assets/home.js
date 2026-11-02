(function () {
  'use strict';
  function init() {
    if (typeof SITE === 'undefined') return;
    document.title = SITE.title || 'Shrek Wang';
    var email = document.querySelector('.doodle-email');
    if (email && SITE.email) email.href = 'mailto:' + SITE.email;
    var tagline = document.querySelector('.poster-tagline');
    var copy = (SITE.hero || {}).subtitle;
    if (copy && copy !== tagline.dataset.artworkText) {
      tagline.classList.add('custom-copy');
      tagline.querySelector('.tagline-live').textContent = copy;
    }
    if (SITE.title && SITE.title !== 'Shrek Wang') {
      var title = document.querySelector('.poster-title');
      title.classList.add('custom-copy');
      title.querySelector('.name-live').textContent = SITE.title;
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
