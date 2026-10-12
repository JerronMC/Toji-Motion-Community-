(() => {
  const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
  const trackedSections = ['home', 'community', 'download']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach((link) => {
      const active = link.dataset.nav === id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setActive(link.dataset.nav));
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, {
      rootMargin: '-18% 0px -62% 0px',
      threshold: [0, 0.1, 0.25, 0.5]
    });
    trackedSections.forEach((section) => observer.observe(section));
  }
})();
