/* simonewongg.com — progressive enhancement only. The site is complete
   without this file; it adds the entrance choreography, scroll reveals,
   and the live Berlin clock. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Split display text into per-letter spans so the name can stagger in.
  // The original text stays available to assistive tech via aria-label.
  document.querySelectorAll('[data-split]').forEach((el) => {
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.setProperty('--i', i);
      s.setAttribute('aria-hidden', 'true');
      el.appendChild(s);
    });
  });

  // Give each child of a stagger group an index for its transition delay.
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    [...group.children].forEach((child, i) => child.style.setProperty('--i', i));
  });

  // Scroll reveals.
  const targets = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((el) => io.observe(el));
  }

  // Load choreography: flip the flag one frame in so transitions actually
  // run. rAF is paused in background tabs, so a timer and a visibility
  // listener back it up — the page must never stay hidden waiting on it.
  const loaded = () => document.documentElement.classList.add('is-loaded');
  requestAnimationFrame(() => requestAnimationFrame(loaded));
  setTimeout(loaded, 400);
  document.addEventListener('visibilitychange', loaded, { once: true });

  // Scroll-spy: on pages with [data-nav] sections (the home page), the nav
  // pill follows the section you're reading. Real page identity keeps
  // aria-current="page"; a scroll position gets aria-current="location".
  const spied = [...document.querySelectorAll('[data-nav]')];
  const navLinks = [...document.querySelectorAll('.nav a')];
  if (spied.length && navLinks.length) {
    let current = null;
    const update = () => {
      const line = window.innerHeight * 0.4;
      let active = spied[0];
      for (const s of spied) {
        if (s.getBoundingClientRect().top <= line) active = s;
      }
      const href = active.dataset.nav;
      if (href === current) return;
      current = href;
      navLinks.forEach((a) => {
        if (a.getAttribute('href') === href) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    };
    // Four rect reads per event is cheap; no rAF gate, which background
    // tabs pause and which would leave the highlight stale.
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    document.addEventListener('visibilitychange', update);
    update();
  }

  // Live local time, the way a studio site would show it.
  const clocks = document.querySelectorAll('[data-clock]');
  if (clocks.length) {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin',
    });
    const tick = () => { const t = fmt.format(new Date()); clocks.forEach((c) => { c.textContent = t; }); };
    tick();
    setInterval(tick, 30_000);
  }

  // Orbit: tap a node and its skills branch out from it. One open at a time.
  const orbit = document.querySelector('[data-orbit]');
  if (orbit) {
    const arms = [...orbit.querySelectorAll('.arm')];
    const setOpen = (key) => {
      if (key) orbit.dataset.open = key; else delete orbit.dataset.open;
      arms.forEach((arm) => {
        const node = arm.querySelector('.orb-node');
        const open = node.dataset.node === key;
        arm.classList.toggle('open', open);
        node.setAttribute('aria-expanded', String(open));
        arm.querySelector('.leaves').setAttribute('aria-hidden', String(!open));
      });
    };
    arms.forEach((arm) => {
      const node = arm.querySelector('.orb-node');
      node.addEventListener('click', () => setOpen(orbit.dataset.open === node.dataset.node ? null : node.dataset.node));
    });
    orbit.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(null); });
    setOpen(null);
  }

  // Off the clock: flip the lights off to expand the after-hours section.
  const lights = document.querySelector('[data-lights]');
  if (lights) {
    const btn = lights.querySelector('.switch');
    const state = lights.querySelector('[data-state]');
    const hint = lights.querySelector('[data-hint]');
    const panel = lights.querySelector('.after-hours');
    const set = (off) => {
      lights.classList.toggle('is-off', off);
      btn.setAttribute('aria-expanded', String(off));
      state.textContent = off ? 'Off' : 'On';
      hint.textContent = off
        ? 'Lights off. This is the after-hours version.'
        : 'Work\'s done for the day. Flip the switch.';
      if (off) panel.removeAttribute('inert'); else panel.setAttribute('inert', '');
      if (off) panel.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    };
    set(false);
    btn.addEventListener('click', () => set(!lights.classList.contains('is-off')));
  }
})();
