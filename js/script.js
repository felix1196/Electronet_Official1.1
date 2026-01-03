document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // NAVBAR SCROLL CLASS
  // -------------------------------
  const navbar = document.getElementById('mainNavbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add('navbar-scrolled');
    else navbar.classList.remove('navbar-scrolled');
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // ejecutar al cargar



  // -------------------------------
  // REVEAL + CASCADA
  // -------------------------------
  const revealElems = Array.from(document.querySelectorAll('.reveal'));
  if (revealElems.length === 0) return;

  const cascadeDelay = 200; // Tiempo entre cada caja (ms)

  // Función que activa con retraso en cascada
  const activateWithCascade = (elements) => {
    elements.forEach((el, index) => {
      if (el.classList.contains('active')) return;
      setTimeout(() => {
        el.classList.add('active');
      }, index * cascadeDelay);
    });
  };



  // ------------------------------------
  // IntersectionObserver (Método ideal)
  // ------------------------------------
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -100px 0px", 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries, obs) => {
      const visibleBatch = [];

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleBatch.push(entry.target);
          obs.unobserve(entry.target); // lo animamos solo una vez
        }
      });

      if (visibleBatch.length) activateWithCascade(visibleBatch);
    }, observerOptions);

    revealElems.forEach(el => observer.observe(el));

  } else {
    // Fallback para navegadores antiguos
    const fallbackReveal = () => {
      const windowHeight = window.innerHeight;
      const visibleBatch = [];

      revealElems.forEach(el => {
        if (el.classList.contains("active")) return;
        const rectTop = el.getBoundingClientRect().top;
        if (rectTop < windowHeight - 150) visibleBatch.push(el);
      });

      if (visibleBatch.length) activateWithCascade(visibleBatch);
    };

    window.addEventListener("scroll", fallbackReveal);
    window.addEventListener("resize", fallbackReveal);
    fallbackReveal();
  }
});

/* ==========================
   ANIMACIONES AL SCROLL
   ========================== */

const reveals = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2
  }
);

reveals.forEach(el => observer.observe(el));