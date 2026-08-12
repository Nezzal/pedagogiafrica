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
  const modalBadge = modal.querySelector('.modal-header .badge');
  const modalTitle = modal.querySelector('.modal-header h3');
  const modalSubtitle = modal.querySelector('.modal-header p');
  const modalSubmitBtn = formAcces.querySelector('button[type="submit"]');

  let currentModalType = 'moodle';

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
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // Close Mobile Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
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

    const triggerBtn = e.currentTarget;
    const modalType = triggerBtn ? triggerBtn.getAttribute('data-modal-type') || 'moodle' : 'moodle';
    currentModalType = modalType;

    if (modalType === 'mentorat') {
      modalBadge.innerHTML = '<i class="fa-solid fa-stethoscope"></i> Mentorat Sur-Mesure';
      modalTitle.textContent = "Demande d'Entretien de Mentorat";
      modalSubtitle.textContent = "Remplissez ce formulaire pour réserver votre séance d'identification de vos besoins d'accompagnement avec le Pr. Nezzal Abdelmalek.";
      modalSubmitBtn.innerHTML = '<i class="fa-solid fa-calendar-check"></i> Réserver mon entretien de Mentorat';
    } else {
      modalBadge.innerHTML = '<i class="fa-solid fa-key"></i> Espace Membres Moodle';
      modalTitle.textContent = "Demande d'Accès au Hub Moodle";
      modalSubtitle.textContent = "Remplissez ce formulaire pour recevoir vos identifiants d'accès par e-mail.";
      modalSubmitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Transmettre ma demande d\'accès';
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    // Reset form after closing
    setTimeout(() => {
      formAcces.style.display = 'flex';
      formSuccess.style.display = 'none';
      formAcces.reset();
    }, 400);
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

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
      userFirstnameSpan.textContent = prenom;
      formAcces.style.display = 'none';
      formSuccess.style.display = 'block';

      // Customize Subject and Email Body depending on Context (Mentorat vs Moodle)
      const isMentorat = currentModalType === 'mentorat';
      const subjectText = isMentorat 
        ? `Demande d'Entretien de Mentorat - ${prenom} ${nom}`
        : `Demande d'accès Moodle - ${prenom} ${nom}`;

      const introText = isMentorat
        ? `Voici une nouvelle demande d'entretien d'identification des besoins d'accompagnement :`
        : `Voici une nouvelle demande d'accès à la plateforme Moodle PedagogiAfrica :`;

      const subject = encodeURIComponent(subjectText);
      const body = encodeURIComponent(
        `Bonjour Dr. Nezzal Abdelmalek,\n\n${introText}\n\n` +
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
