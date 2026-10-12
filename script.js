(() => {
  const links = [...document.querySelectorAll('[data-nav]')];
  const sections = ['home','about','support'].map(id => document.getElementById(id)).filter(Boolean);
  function setActive(id){ links.forEach(link => link.classList.toggle('active', link.dataset.nav === id)); }
  links.forEach(link => link.addEventListener('click', () => setActive(link.dataset.nav)));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, {rootMargin:'-20% 0px -58% 0px',threshold:[0,.1,.25,.5]});
    sections.forEach(section => observer.observe(section));
  }
})();
