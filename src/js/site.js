import { Collapse } from 'bootstrap';
import './initializeCookieNotice';
import './youtubeEmbeds';

document.addEventListener('DOMContentLoaded', () => {
  const navbarCollapse = document.getElementById('navbarTogglerForum');
  const managedModals = document.querySelectorAll('.modal');

  managedModals.forEach((modal) => {
    modal.addEventListener('hide.bs.modal', () => {
      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement && modal.contains(activeElement)) {
        activeElement.blur();
      }
    });
  });

  if (!navbarCollapse) {
    return;
  }

  const navbarInstance = Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });

  document.addEventListener('click', (event) => {
    if (window.innerWidth >= 992) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const dropdownToggle = target.closest('.dropdown-toggle');
    if (dropdownToggle) {
      return;
    }

    const navAction = target.closest('.navbar-nav .nav-link, .navbar-nav .dropdown-item');
    if (!navAction || !navbarCollapse.classList.contains('show')) {
      return;
    }

    window.setTimeout(() => {
      navbarInstance.hide();
    }, 0);
  });
});
