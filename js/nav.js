// Nav behaviour: owned by UI/UX
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  document.documentElement.classList.add('js');

  function set(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.setAttribute('data-open', String(open));
  }
  set(false);

  toggle.addEventListener('click', function () {
    set(toggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      set(false);
      toggle.focus();
    }
  });
})();
