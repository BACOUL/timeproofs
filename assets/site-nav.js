(() => {
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'summary',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  let lastTrigger = null;

  function normalizePath(href) {
    try {
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return '';
      if (url.pathname === '/') return '/';
      return url.pathname.replace(/\/+$/, '');
    } catch {
      return '';
    }
  }

  function markCurrentLinks() {
    const current = window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/+$/, '');
    document.querySelectorAll('.ar-shell a[href], .ar-footer a[href]').forEach((link) => {
      if (normalizePath(link.href) === current) link.setAttribute('aria-current', 'page');
    });
  }

  function closeDetails(details, restoreFocus = true) {
    if (!details || !details.open) return;
    details.open = false;
    const summary = details.querySelector('summary');
    if (summary) summary.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('ar-nav-open');
    if (restoreFocus && lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  }

  function closeOtherMenus(currentDetails) {
    document.querySelectorAll('.ar-nav-menu[open], .ar-mobile-nav[open]').forEach((details) => {
      if (details !== currentDetails) closeDetails(details, false);
    });
  }

  function setupDetails(details) {
    const summary = details.querySelector('summary');
    if (!summary) return;
    summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');

    summary.addEventListener('click', () => {
      lastTrigger = summary;
    });

    details.addEventListener('toggle', () => {
      summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
      if (details.open) {
        closeOtherMenus(details);
        if (details.classList.contains('ar-mobile-nav')) {
          document.body.classList.add('ar-nav-open');
          const firstLink = details.querySelector('.ar-mobile-panel a[href]');
          if (firstLink) window.setTimeout(() => firstLink.focus(), 0);
        }
      } else if (details.classList.contains('ar-mobile-nav')) {
        document.body.classList.remove('ar-nav-open');
      }
    });

    details.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDetails(details, true);
        return;
      }

      if (!details.classList.contains('ar-mobile-nav') || event.key !== 'Tab' || !details.open) return;

      const focusable = Array.from(details.querySelectorAll(focusableSelector)).filter((element) => {
        return element.offsetParent !== null || element === summary;
      });
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function closeOnOutsideClick(event) {
    document.querySelectorAll('.ar-nav-menu[open], .ar-mobile-nav[open]').forEach((details) => {
      if (!details.contains(event.target)) closeDetails(details, false);
    });
  }

  function closeMobileAfterNavigation(event) {
    const link = event.target.closest('.ar-mobile-panel a[href]');
    if (!link) return;
    const details = link.closest('.ar-mobile-nav');
    closeDetails(details, true);
  }

  function boot() {
    markCurrentLinks();
    document.querySelectorAll('.ar-nav-menu, .ar-mobile-nav').forEach(setupDetails);
    document.addEventListener('click', closeOnOutsideClick);
    document.addEventListener('click', closeMobileAfterNavigation);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
