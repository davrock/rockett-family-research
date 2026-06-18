/* Progressive enhancement: turn the existing .topnav into a hamburger menu on
   mobile. No-JS fallback = the plain wrapping nav. One file, all pages. */
(function () {
  var wrap = document.querySelector('.topnav .wrap');
  if (!wrap) return;

  var home = wrap.querySelector('a.home');
  var links = Array.prototype.slice.call(wrap.querySelectorAll('a')).filter(function (a) {
    return a !== home;
  });
  if (!links.length) return;

  // move the non-home links into a collapsible panel
  var panel = document.createElement('div');
  panel.className = 'navlinks';
  panel.id = 'navlinks';
  links.forEach(function (a) { panel.appendChild(a); });

  // build the hamburger button
  var btn = document.createElement('button');
  btn.className = 'navtoggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-controls', 'navlinks');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';

  function setOpen(open) {
    panel.classList.toggle('open', open);
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  btn.addEventListener('click', function () {
    setOpen(!panel.classList.contains('open'));
  });
  // close after following a link, or on Escape
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  wrap.appendChild(btn);
  wrap.appendChild(panel);
})();
