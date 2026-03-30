/* Little Village Preschool — Shared JS */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 30);
    const btn = document.querySelector('.back-to-top');
    btn?.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- Mobile menu toggle ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Fade-in on scroll (Intersection Observer) ---- */
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    faders.forEach(el => observer.observe(el));
  }

  /* ---- Staggered fade-in children ---- */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.querySelectorAll('.fade-in');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 120}ms`;
    });
  });

  /* ---- Back to top ---- */
  document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Form submission via FormSubmit.co ---- */
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const formData = new FormData(form);

      try {
        const response = await fetch('https://formsubmit.co/ajax/Info@lvpreschool.co.nz', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.success === 'true' || data.success === true || response.ok) {
          const successMsg = form.querySelector('.form-success');
          if (successMsg) {
            successMsg.style.display = 'block';
          }
          form.reset();
          setTimeout(() => {
            if (successMsg) successMsg.style.display = 'none';
          }, 6000);
        } else {
          alert('Something went wrong. Please try again or contact us directly.');
        }
      } catch {
        alert('Could not send your message. Please try again or call us directly.');
      }

      btn.textContent = originalText;
      btn.disabled = false;
    });
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* Open pricing accordion when landing with #pricing-table (e.g. from home page) */
  if (window.location.hash === '#pricing-table') {
    const pricingItem = document.getElementById('pricing-table');
    if (pricingItem?.classList.contains('faq-item')) {
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      pricingItem.classList.add('open');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          pricingItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }
  }
});
