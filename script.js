/* ==========================================================================
   PedagogiAfrica - Interactive Script & Contextual Modal Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const sections = document.querySelectorAll('section[id]');

  // Modal elements
  const modal = document.getElementById('modal-acces');
  const openModalBtns = document.querySelectorAll('.btn-open-modal');
  const closeModalBtn = document.querySelector('.modal-close');
  const closeSuccessBtn = document.querySelector('.btn-close-success');
  const formAcces = document.getElementById('form-acces');
  const formSuccess = document.getElementById('form-success');
  const userFirstnameSpan = document.getElementById('user-firstname');

  // Modal Header & Button Elements for Contextual Adaptation
  const modalBadge = modal ? modal.querySelector('.modal-header .badge') : null;
  const modalTitle = modal ? modal.querySelector('.modal-header h3') : null;
  const modalSubtitle = modal ? modal.querySelector('.modal-header p') : null;
  const modalSubmitBtn = formAcces ? formAcces.querySelector('button[type="submit"]') : null;

  let currentModalType = 'moodle';
  let lastFocusedElement = null;

  // Focusable elements inside modal selector
  const getFocusableModalElements = () => {
    if (!modal) return [];
    return Array.from(
      modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.hasAttribute('disabled') && el.offsetWidth > 0 && el.offsetHeight > 0);
  };

  // Header Scroll Effect & ScrollSpy
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);
      }
    });
  }

  // Close Mobile Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      }
    });
  });

  // Modal Context Adaptor & Opener
  const openModal = (e) => {
    if (e) e.preventDefault();

    lastFocusedElement = document.activeElement;
    const triggerBtn = e ? e.currentTarget : null;
    const modalType = triggerBtn ? triggerBtn.getAttribute('data-modal-type') || 'moodle' : 'moodle';
    currentModalType = modalType;

    if (modalType === 'prevention') {
      if (modalBadge) modalBadge.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Prévention des Risques';
      if (modalTitle) modalTitle.textContent = "Demande d'Entretien de Prévention";
      if (modalSubtitle) modalSubtitle.textContent = "Remplissez ce formulaire avec vos coordonnées professionnelles pour réserver votre entretien d'évaluation et de prévention des risques avec le Pr. Nezzal Abdelmalek.";
      if (modalSubmitBtn) modalSubmitBtn.innerHTML = '<i class="fa-solid fa-calendar-check"></i> Demander mon entretien de Prévention';
    } else if (modalType === 'mentorat') {
      if (modalBadge) modalBadge.innerHTML = '<i class="fa-solid fa-stethoscope"></i> Mentorat Sur-Mesure';
      if (modalTitle) modalTitle.textContent = "Demande d'Entretien de Mentorat";
      if (modalSubtitle) modalSubtitle.textContent = "Remplissez ce formulaire pour réserver votre séance d'identification de vos besoins d'accompagnement avec le Pr. Nezzal Abdelmalek.";
      if (modalSubmitBtn) modalSubmitBtn.innerHTML = '<i class="fa-solid fa-calendar-check"></i> Réserver mon entretien de Mentorat';
    } else {
      if (modalBadge) modalBadge.innerHTML = '<i class="fa-solid fa-key"></i> Espace Membres Moodle';
      if (modalTitle) modalTitle.textContent = "Demande d'Accès au Hub Moodle";
      if (modalSubtitle) modalSubtitle.textContent = "Remplissez ce formulaire pour recevoir vos identifiants d'accès par e-mail.";
      if (modalSubmitBtn) modalSubmitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Transmettre ma demande d\'accès';
    }

    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Set focus to the first input in form
      const firstInput = document.getElementById('nom');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }

    // Reset form after closing
    setTimeout(() => {
      if (formAcces) formAcces.style.display = 'flex';
      if (formSuccess) formSuccess.style.display = 'none';
      if (formAcces) formAcces.reset();
    }, 400);
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside content
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Keyboard navigation inside modal (Focus Trap & Escape key)
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;

      if (e.key === 'Escape') {
        closeModal();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = getFocusableModalElements();
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  // Handle Form Submission
  if (formAcces) {
    formAcces.addEventListener('submit', (e) => {
      e.preventDefault();

      const prenom = document.getElementById('prenom').value.trim();
      const nom = document.getElementById('nom').value.trim();
      const email = document.getElementById('email').value.trim();
      const profil = document.getElementById('profil').value;
      const message = document.getElementById('message').value.trim();

      // Show Success state
      if (userFirstnameSpan) userFirstnameSpan.textContent = prenom;
      formAcces.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';

      // Customize Subject and Email Body depending on Context (Prevention vs Mentorat vs Moodle)
      let subjectText = `Demande d'accès Moodle - ${prenom} ${nom}`;
      let introText = `Voici une nouvelle demande d'accès à la plateforme Moodle PedagogiAfrica :`;

      if (currentModalType === 'prevention') {
        subjectText = `Demande d'Entretien Prévention des Risques - ${prenom} ${nom}`;
        introText = `Voici une nouvelle demande d'entretien sur la Prévention des risques professionnels en entreprise :`;
      } else if (currentModalType === 'mentorat') {
        subjectText = `Demande d'Entretien de Mentorat - ${prenom} ${nom}`;
        introText = `Voici une nouvelle demande d'entretien d'identification des besoins d'accompagnement :`;
      }

      const subject = encodeURIComponent(subjectText);
      const body = encodeURIComponent(
        `Bonjour Pr. Nezzal Abdelmalek,\n\n${introText}\n\n` +
        `• Nom : ${nom}\n` +
        `• Prénom : ${prenom}\n` +
        `• E-mail : ${email}\n` +
        `• Profil / Profession : ${profil}\n` +
        (message ? `• Message / Besoins : ${message}\n` : '') +
        `\nMerci d'avance pour votre retour.`
      );

      // Trigger mailto after brief delay
      setTimeout(() => {
        window.location.href = `mailto:pedagogia@pedagogiafrica.org?subject=${subject}&body=${body}`;
      }, 800);
    });
  }
});

