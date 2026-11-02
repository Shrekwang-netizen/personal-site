/* Shared content rendering and accessible interactions. */

(function () {
  "use strict";

  /* ---------- helpers ---------- */

  // escape characters so content cannot break the page
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // highlight unfilled placeholders so you can spot them
  function ph(s) {
    return esc(s).replace(/▢[^，。；、,;.]*/g, function (m) {
      return '<span class="todo" title="Not filled in yet. Edit data.js">' + m + "</span>";
    });
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var S = typeof SITE !== "undefined" ? SITE : { name: "Me", email: "", title: "" };
  var J = typeof JOBS !== "undefined" ? JOBS : [];
  var C = typeof COCKTAILS !== "undefined" ? COCKTAILS : [];


  /* ---------- nav ---------- */

  var PAGES = [
    { href: "about.html", label: "About", key: "about" },
    { href: "onclock.html", label: "Work", key: "onclock" },
    { href: "offclock.html", label: "After Work", key: "offclock" }
  ];

  function buildNav() {
    var slot = $("#nav");
    if (!slot) return;
    var active = slot.getAttribute("data-active") || "";
    var icons = { about: "glasses", onclock: "laptop", offclock: "shaker" };
    var links = PAGES.map(function (p) {
      return '<a href="' + p.href + '" class="nav-art-link' + (p.key === active ? ' active' : '') + '"' + (p.key === active ? ' aria-current="page"' : '') + '>' +
        '<svg viewBox="0 0 120 100" aria-hidden="true"><use href="#' + icons[p.key] + '"/></svg>' +
        '<span>' + p.label + '</span></a>';
    }).join("");
    slot.className = "nav";
    slot.innerHTML = '<div class="nav-inner">' +
      '<a class="nav-logo" href="index.html" aria-label="Shrek — Home">' + esc(S.name) + '</a>' +
      '<nav class="nav-links" aria-label="Main navigation">' + links +
      '<button type="button" class="nav-theme" data-theme-toggle aria-label="Switch color mode" aria-pressed="false">' +
      '<svg viewBox="0 0 56 64" aria-hidden="true"><path d="M12 4 46 7 43 60 9 57Z" fill="currentColor"/><path d="M9 2 43 5 40 58 6 55Z" fill="var(--paper)" stroke="currentColor" stroke-width="1.2"/><circle cx="13" cy="8" r="1.5" fill="currentColor"/><circle cx="35" cy="51" r="1.5" fill="currentColor"/><path d="M20 17 32 18 30 43 18 42Z" fill="none" stroke="currentColor"/><path class="inner-switch-knob" d="M19 31 31 32 30 43 18 42Z" fill="currentColor"/></svg>' +
      '<span>Mode</span></button></nav></div>';
  }

  function buildFooter() {
    var slot = $("#footer");
    if (!slot) return;
    var links = (S.socials || []).filter(function (x) {
      return x && x.url && !x.url.startsWith("mailto:");
    }).map(function (x) {
      return '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.label) + '</a>';
    });
    if (S.email) links.push('<a href="mailto:' + esc(S.email) + '">Email</a>');
    if (S.wechat) links.push('<a href="about.html#hello">WeChat</a>');
    slot.className = "footer";
    slot.innerHTML = '<div class="wrap footer-in"><span>© ' + new Date().getFullYear() + ' ' + esc(S.title || S.name) + '</span><nav class="foot-links" aria-label="Social and contact links">' + links.join("") + '</nav></div>';
  }

  /* ---------- roles page ---------- */

  var currentFilter = 0;

  function buildFilters() {
    var box = $("#filters");
    if (box == null) return;
    if (J.length < 4) { box.style.display = "none"; return; }

    var tracks = [], teams = [];
    J.forEach(function (j) {
      if (tracks.indexOf(j.track) < 0) tracks.push(j.track);
      if (teams.indexOf(j.team) < 0) teams.push(j.team);
    });

    var groups = [{ label: "All", test: function () { return true; } }];
    tracks.forEach(function (t) {
      groups.push({ label: t, test: function (j) { return j.track === t; } });
    });
    teams.forEach(function (t) {
      groups.push({ label: t, test: function (j) { return j.team === t; } });
    });

    box.innerHTML = groups.map(function (g, i) {
      return '<button type="button" class="filter' + (i === 0 ? " on" : "") +
             '" aria-pressed="' + (i === 0) + '" data-i="' + i + '">' + esc(g.label) + "</button>";
    }).join("");

    box.addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      currentFilter = +b.getAttribute("data-i");
      $$(".filter", box).forEach(function (x) { x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("on");
      b.setAttribute("aria-pressed", "true");
      renderJobs(groups[currentFilter].test);
    });
  }

  function jobCard(j) {
    return '<article class="card card-clickable" data-job="' + esc(j.id) + '">' +
      '<div class="job-top">' +
        '<span class="tag">' + esc(j.track) + "</span>" +
        '<span class="tag">' + esc(j.team) + "</span>" +
        (j.status && j.status !== "Open" ? '<span class="tag tag-hot">' + esc(j.status) + "</span>" : "") +
      "</div>" +
      '<h3 class="job-title">' + esc(j.title) + "</h3>" +
      '<p class="job-oneliner">' + ph(j.oneLiner) + "</p>" +
      '<div class="job-foot">' +
        "<span>" + ph(j.city) + "</span>" +
        '<button type="button" class="job-more" aria-haspopup="dialog" aria-controls="modal" aria-label="View ' + esc(j.title) + '">View role &rarr;</button>' +
      "</div>" +
    "</article>";
  }

  function renderJobs(test) {
    var box = $("#job-list");
    if (!box) return;
    var list = J.filter(test || function () { return true; });

    var cnt = $("#job-count");
    if (cnt) cnt.textContent = list.length + (list.length === 1 ? " role" : " roles");

    if (!list.length) {
      box.innerHTML = '<p style="color:var(--muted)">No roles match this filter.</p>';
      return;
    }
    box.innerHTML = list.map(jobCard).join("");
  }

  function openJob(id) {
    var j = J.filter(function (x) { return x.id === id; })[0];
    if (!j) return;

    var bg = $("#modal-bg");
    var m = $("#modal");

    m.innerHTML =
      '<button type="button" class="modal-close" aria-label="Close">&times;</button>' +
      '<div class="job-top">' +
        '<span class="tag">' + esc(j.track) + "</span>" +
        '<span class="tag">' + esc(j.team) + "</span>" +
        '<span class="tag">' + ph(j.city) + "</span>" +
      "</div>" +
      '<h2 id="role-title">' + esc(j.title) + "</h2>" +
      '<p class="job-oneliner">' + ph(j.oneLiner) + "</p>" +

      (j.why && j.why.length
        ? '<h3 class="sec-title">The work</h3><ul class="list">' +
          j.why.map(function (x) { return "<li>" + ph(x) + "</li>"; }).join("") + "</ul>"
        : "") +

      (j.looking && j.looking.length
        ? '<h3 class="sec-title">Experience</h3><ul class="list">' +
          j.looking.map(function (x) { return "<li>" + ph(x) + "</li>"; }).join("") + "</ul>"
        : "") +

      (j.process && j.process.length
        ? '<h3 class="sec-title">Interview process</h3><ul class="list list-num">' +
          j.process.map(function (x) { return "<li>" + ph(x) + "</li>"; }).join("") + "</ul>"
        : "") +

      (j.note ? '<div class="modal-note">' + ph(j.note) + "</div>" : "") +

      '<h3 class="sec-title">Interested?</h3>' +
      '<p>Email me to ask about the role and current availability.</p>' +
      (S.email ? '<p><a class="row-link" href="mailto:' + esc(S.email) + '?subject=' + encodeURIComponent('About the ' + j.title + ' role') + '">Email about this role &rarr;</a></p>' : "");

    var returnFocus = document.activeElement;
    var previousOverflow = document.body.style.overflow;
    var background = Array.from(document.body.children).filter(function (el) {
      return el !== bg && el.tagName !== "SCRIPT" && !el.inert;
    });
    background.forEach(function (el) { el.inert = true; });
    bg.classList.add("open");
    document.body.style.overflow = "hidden";
    bg.scrollTop = 0;
    $(".modal-close", m).focus();

    function close() {
      bg.classList.remove("open");
      document.body.style.overflow = previousOverflow;
      background.forEach(function (el) { el.inert = false; });
      document.removeEventListener("keydown", onKey);
      bg.removeEventListener("click", onBackdrop);
      if (returnFocus && returnFocus.isConnected) returnFocus.focus();
    }
    function onBackdrop(e) { if (e.target === bg) close(); }
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key !== "Tab") return;
      var focusable = $$("button:not([disabled]), a[href], input:not([disabled]), [tabindex='0']", m);
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    $(".modal-close", m).addEventListener("click", close);
    bg.addEventListener("click", onBackdrop);
    document.addEventListener("keydown", onKey);
  }

  function bindCopy(root) {
    $$("[data-copy]", root).forEach(function (b) {
      b.addEventListener("click", async function () {
        var label = b.textContent;
        var copyLabel = b.getAttribute("data-copy-label") || "Email";
        var copied = false;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(b.getAttribute("data-copy"));
            copied = true;
          }
        } catch (e) { /* Use the local-file fallback below. */ }
        if (!copied) {
          var ta = document.createElement("textarea");
          ta.value = b.getAttribute("data-copy");
          ta.style.cssText = "position:fixed;opacity:0;left:0;top:0";
          b.parentElement.appendChild(ta);
          ta.select();
          try { copied = document.execCommand("copy"); } catch (e) {}
          ta.remove();
          b.focus();
        }
        var status = $("#copy-status");
        if (!status) {
          status = document.createElement("span");
          status.id = "copy-status";
          status.className = "sr-only";
          status.setAttribute("role", "status");
        }
        b.parentElement.appendChild(status);
        status.textContent = copied ? copyLabel + " copied." : "Copy unavailable. Select and copy the text.";
        b.textContent = copied ? "Copied!" : "Copy unavailable";
        b.disabled = true;
        setTimeout(function () { b.textContent = label; b.disabled = false; }, 1800);
      });
    });
  }


  /* ---------- about page (content from ABOUT) ---------- */

  function renderAbout() {
    var head = $("#about-headline");
    if (!head || typeof ABOUT === "undefined") return;
    head.textContent = ABOUT.headline;
    $("#about-body").innerHTML = (ABOUT.paragraphs || []).map(function (text) {
      return '<p>' + esc(text) + '</p>';
    }).join("");
    var contact = $("#about-verify");
    contact.innerHTML = '<h2 class="block-title">' + esc(ABOUT.contactTitle) + '</h2>' +
      '<p>' + esc(ABOUT.contactText) + '</p>' +
      '<div class="contact-methods"><div class="mailbox"><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a>' +
      '<button type="button" data-copy="' + esc(S.email) + '">Copy email</button></div>' +
      (S.wechat ? '<div class="mailbox"><span>WeChat: <span class="contact-value">' + esc(S.wechat) + '</span></span>' +
      '<button type="button" data-copy="' + esc(S.wechat) + '" data-copy-label="WeChat ID">Copy WeChat ID</button></div>' : '') + '</div>';
    bindCopy(contact);
  }

  function bindJobClicks() {
    var box = $("#job-list");
    if (!box) return;
    box.addEventListener("click", function (e) {
      var c = e.target.closest("[data-job]");
      if (c) {
        if (!e.target.closest("button")) $("button", c).focus();
        openJob(c.getAttribute("data-job"));
      }
    });
  }


  /* ---------- featured site ---------- */

  function renderFeaturedSite() {
    var box = $("#featured-site");
    if (!box || typeof FEATURED_SITE === "undefined") return;
    var p = FEATURED_SITE;
    box.innerHTML = '<h2 class="block-title" id="featured-title">' + esc(p.name) + '</h2>' +
      '<p class="feature-desc">' + esc(p.desc) + '</p>' +
      '<a class="row-link" href="' + esc(p.url) + '" target="_blank" rel="noopener">Visit ' + esc(p.name) + ' ↗</a>';
  }


  /* ---------- cocktails ---------- */

  function renderCocktails(query) {
    var box = $("#cocktail-list");
    if (box == null) return;

    var term = (query || "").trim().toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var matches = C.map(function (c, i) { return { drink: c, index: i }; }).filter(function (item) {
      return (item.drink.name + " " + item.drink.note).toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term);
    });
    var count = $("#drink-count");
    if (count) count.textContent = term ? matches.length + " of " + C.length + " notes" : C.length + " notes";
    box.innerHTML = matches.length ? matches.map(function (item) {
      var c = item.drink, i = item.index;
      return '<div class="drink-row">' +
        '<div class="drink-head">' +
          '<span class="drink-idx">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<h3 class="drink-title">' + esc(c.name) + "</h3>" +
          (c.url ? '<a class="drink-link" href="' + esc(c.url) + '" target="_blank" rel="noopener" aria-label="Read notes for ' + esc(c.name) + '">Notes ↗</a>' : "") +
        "</div>" +
        (c.note ? '<p class="drink-recipe">' + esc(c.note) + '</p>' : '') +
      "</div>";
    }).join("") : '<p class="empty-state">No matches. Try a name or ingredient.</p>';
  }


  /* ---------- music ---------- */

  function renderMusic() {
    var box = $("#music-list");
    if (box == null) return;

    var sp = typeof SPOTIFY === "undefined" ? null : SPOTIFY;
    if (sp == null || sp.album == null) { box.innerHTML = ""; return; }

    box.innerHTML =
      (sp.caption ? '<h3 class="embed-caption">' + ph(sp.caption) + "</h3>" : "") +
      '<iframe class="spotify-embed" title="Spotify album player" loading="lazy" frameborder="0" ' +
        'src="https://open.spotify.com/embed/album/' + esc(sp.album) + '?utm_source=generator&theme=0" ' +
        'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ' +
        'allowfullscreen></iframe>' +
      '<p class="embed-fallback">' +
        '<a href="https://open.spotify.com/album/' + esc(sp.album) + '" target="_blank" rel="noopener">Open in Spotify ↗</a>' +
      "</p>" +
      (sp.note ? '<p class="embed-note">' + ph(sp.note) + "</p>" : "");
  }

  /* ---------- boot ---------- */

  function init() {
    buildNav();
    buildFooter();
    buildFilters();
    bindJobClicks();
    renderJobs();
    renderAbout();
    renderFeaturedSite();
    renderCocktails();
    renderMusic();
    var search = $("#drink-search");
    if (search) search.addEventListener("input", function () { renderCocktails(search.value); });
    var clear = $("#clear-search");
    if (clear) clear.addEventListener("click", function () { search.value = ""; renderCocktails(); search.focus(); });
    var intro = $("#home-intro");
    if (intro) intro.textContent = (S.hero || {}).line2 || "";
    var heroName = $("#title");
    if (heroName) heroName.setAttribute("aria-label", S.title || S.name);
    var tagline = $("#home-tagline");
    if (tagline && (S.hero || {}).subtitle) tagline.textContent = S.hero.subtitle;

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
