(() => {
  const menuLinks = [
    ['/', 'Home'],
    ['/agentready.html', 'OpenAPI scanner'],
    ['/agentready-mcp.html', 'MCP scanner'],
    ['/agentready-simulation.html', 'Static simulation'],
    ['/agentready-docs.html', 'Docs'],
    ['/agentready-examples.html', 'Examples'],
    ['/agentready-test.html', 'Tests'],
    ['/legal.html', 'Legal notice'],
    ['/privacy.html', 'Privacy'],
    ['/terms.html', 'Terms']
  ];

  function ensureStylesheet() {
    if (document.querySelector('link[href="/assets/site-nav.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/site-nav.css';
    document.head.appendChild(link);
  }

  function createMobileMenu() {
    if (document.querySelector('.site-menu-toggle')) return null;
    const details = document.createElement('details');
    details.className = 'site-menu-toggle';

    const summary = document.createElement('summary');
    summary.className = 'site-menu-button';
    summary.setAttribute('aria-label', 'Open navigation menu');
    summary.innerHTML = '<span></span>Menu';

    const nav = document.createElement('nav');
    nav.className = 'site-menu-panel';
    nav.setAttribute('aria-label', 'Mobile navigation');

    menuLinks.forEach(([href, label]) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      nav.appendChild(a);
    });

    details.appendChild(summary);
    details.appendChild(nav);
    return details;
  }

  function ensureMobileMenu() {
    const navBar = document.querySelector('header .nav');
    if (!navBar) return;
    const menu = createMobileMenu();
    if (menu) navBar.appendChild(menu);
  }

  function ensureFooterLinks() {
    const footer = document.querySelector('footer .wrap');
    if (!footer || footer.querySelector('.footer-links')) return;

    const links = document.createElement('div');
    links.className = 'footer-links';
    [
      ['/legal.html', 'Legal notice'],
      ['/privacy.html', 'Privacy'],
      ['/terms.html', 'Terms'],
      ['/agentready-docs.html', 'Docs']
    ].forEach(([href, label]) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      links.appendChild(a);
    });
    footer.appendChild(links);
  }

  function closeMenuAfterClick() {
    document.addEventListener('click', (event) => {
      const openMenu = document.querySelector('.site-menu-toggle[open]');
      if (!openMenu) return;
      if (openMenu.contains(event.target)) {
        if (event.target && event.target.tagName === 'A') openMenu.removeAttribute('open');
        return;
      }
      openMenu.removeAttribute('open');
    });
  }

  function boot() {
    ensureStylesheet();
    ensureMobileMenu();
    ensureFooterLinks();
    closeMenuAfterClick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
