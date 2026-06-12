// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.innerHTML = isOpen
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h18M3 12h18M3 17h18"/></svg>';
    });
  }

  // Collections: filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      productCards.forEach(card => {
        card.style.display = (cat === 'All' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });

  // Collections: detail overlay
  const overlay = document.querySelector('.overlay');
  if (overlay) {
    const overlayImg = overlay.querySelector('.overlay-img img');
    const overlayName = overlay.querySelector('.detail-name');
    const overlayCat = overlay.querySelector('.detail-cat');
    const overlayDesc = overlay.querySelector('.detail-desc');
    const overlayWa = overlay.querySelector('.detail-wa');
    const overlayMail = overlay.querySelector('.detail-mail');

    productCards.forEach(card => {
      card.addEventListener('click', () => {
        const d = card.dataset;
        overlayImg.src = d.img;
        overlayImg.alt = d.name;
        overlayImg.style.objectPosition = d.pos || 'center';
        overlayName.textContent = d.name;
        overlayCat.textContent = d.category;
        overlayDesc.textContent = d.desc;
        overlayWa.href = 'https://wa.me/919929008928?text=' + encodeURIComponent('Hello Amer Jewels — I would like to enquire about the ' + d.name + '.');
        overlayMail.href = 'mailto:hello@amerjewels.com?subject=' + encodeURIComponent('Enquiry — ' + d.name) + '&body=' + encodeURIComponent('Hello Amer Jewels,\n\nI would like to enquire about the ' + d.name + '.\n\nThank you.');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    overlay.querySelector('.overlay-close').addEventListener('click', closeOverlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOverlay(); });

    function closeOverlay() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const nameInput = contactForm.querySelector('[name="name"]');
    const emailInput = contactForm.querySelector('[name="email"]');
    const messageInput = contactForm.querySelector('[name="message"]');
    const hint = contactForm.querySelector('.form-hint');

    function compose() {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      if (!message && !name) {
        hint.textContent = 'Add your name and a short message first.';
        hint.classList.add('show');
        return null;
      }
      hint.classList.remove('show');
      const lines = ['Hello Amer Jewels,', '', message || 'I would like to make an enquiry.', ''];
      if (name) lines.push('— ' + name);
      if (email) lines.push(email);
      return lines.join('\n');
    }

    contactForm.querySelector('.btn-email').addEventListener('click', () => {
      const body = compose();
      if (!body) return;
      const name = nameInput.value.trim();
      const subject = 'Enquiry' + (name ? ' from ' + name : '');
      window.open('mailto:hello@amerjewels.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body), '_self');
    });

    contactForm.querySelector('.btn-whatsapp').addEventListener('click', () => {
      const body = compose();
      if (!body) return;
      window.open('https://wa.me/919929008928?text=' + encodeURIComponent(body), '_blank');
    });
  }
});
