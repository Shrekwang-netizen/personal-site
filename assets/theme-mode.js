/* Runs before paint; every page shares the same local-only preference. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var mode = 'dark';
  try { if (localStorage.getItem('shrek-theme') === 'light') mode = 'light'; } catch (_) {}
  // file:// storage can be scoped per file; internal links carry a theme fallback.
  var linkedMode = new URLSearchParams(location.search).get('theme');
  if (linkedMode === 'light' || linkedMode === 'dark') mode = linkedMode;
  root.dataset.theme = mode;
  function sync() {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(root.dataset.theme === 'light'));
      button.setAttribute('aria-label', root.dataset.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    });
  }
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (link && location.protocol === 'file:') {
      var target = new URL(link.href, location.href);
      if (target.protocol === 'file:' && new URL('.', target).href === new URL('.', location.href).href && target.pathname.endsWith('.html')) {
        target.searchParams.set('theme', root.dataset.theme);
        link.href = target.href;
      }
    }
    if (!event.target.closest('[data-theme-toggle]')) return;
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('shrek-theme', root.dataset.theme); } catch (_) {}
    sync();
  });
  document.addEventListener('DOMContentLoaded', function () { requestAnimationFrame(sync); });
})();
