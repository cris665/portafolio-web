// Manejo de la navegación y comportamiento del DOM

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cierra automáticamente el menú móvil al hacer clic en un enlace de navegación
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarNav');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // 2. Resalta el enlace de navegación correspondiente a la sección visible
  //    (complementa el data-bs-spy="scroll" del <body> con la clase .active)
  const sections = document.querySelectorAll('main section[id]');

  if (sections.length && 'IntersectionObserver' in window) {
    const setActiveLink = (id) => {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        setActiveLink(visible.target.id);
      }
    }, { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach(section => observer.observe(section));
  }
});