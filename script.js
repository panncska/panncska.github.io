/**
 * Pann C. Ska — Author Website
 * Vanilla JS: mobile nav, contact form, chat widget, region selection.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSubscribeForm();
  initChatWidget();
  initRegionFlags();
  setCurrentYear();
});

/**
 * Toggles the mobile navigation menu.
 */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Handles contact form submission with simple client-side validation.
 * Replace the submitEmail() body with a real API call to your ESP
 * (Mailchimp, ConvertKit, Klaviyo, etc.) when ready.
 */
function initSubscribeForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');

  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('contactrEmail');
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.style.color = '#b3402f';
      emailInput.focus();
      return;
    }

    status.textContent = 'Signing you up...';
    status.style.color = '';

    try {
      await submitEmail(email);
      status.textContent = 'Thanks for subscribing! Keep an eye on your inbox.';
      form.reset();
    } catch (error) {
      status.textContent = 'Something went wrong. Please try again shortly.';
    }
  });
}

/**
 * Validates an email address using a standard pattern.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

/**
 * Placeholder for the email service provider integration.
 * @param {string} email
 * @returns {Promise<void>}
 */
function submitEmail(email) {
  return new Promise((resolve) => {
    setTimeout(resolve, 600);
  });
}

/**
 * Controls the floating "Let's Chat!" widget.
 */
function initChatWidget() {
  const bubble = document.getElementById('chatBubble');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');

  if (!bubble || !panel || !closeBtn) return;

  const openPanel = () => {
    panel.hidden = false;
    bubble.setAttribute('aria-expanded', 'true');
  };

  const closePanel = () => {
    panel.hidden = true;
    bubble.setAttribute('aria-expanded', 'false');
    bubble.focus();
  };

  bubble.addEventListener('click', () => {
    panel.hidden ? openPanel() : closePanel();
  });

  closeBtn.addEventListener('click', closePanel);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      closePanel();
    }
  });
}

/**
 * Tracks the selected pre-order region (AU / UK) and updates the
 * primary pre-order link accordingly. Update the URLs to your real
 * retailer links per region.
 */
function initRegionFlags() {
  const flagButtons = document.querySelectorAll('.preorder-btn');
  const preorderLinks = document.querySelectorAll('a[href="#preorder"]');

  const regionUrls = {
    AU: 'https://www.booktopia.com.au/',
    UK: 'https://www.waterstones.com/',
  };

  flagButtons.forEach((button) => {
    button.addEventListener('click', () => {
      flagButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      const region = button.dataset.region;
      const url = regionUrls[region];

      if (url) {
        preorderLinks.forEach((link) => {
          link.dataset.region = region;
        });
      }
    });
  });
}

/**
 * Sets the current year in the footer copyright notice.
 */
function setCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

/**
 * Handle mobile navigation
 */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navClose = document.getElementById('navClose');

  if (!navToggle || !navMenu) return;

  const openMenu = () => {
    navMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };

  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    navToggle.focus();
  };

  navToggle.addEventListener('click', () => {
    navMenu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  if (navClose) {
    navClose.addEventListener('click', closeMenu);
  }

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}