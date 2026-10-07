/* simonewongg.com — progressive enhancement only. The site is complete
   without this file; it adds the entrance choreography, scroll reveals,
   and the live Berlin clock. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Split display text into per-letter spans so the name can stagger in.
  // The original text stays available to assistive tech via aria-label.
  document.querySelectorAll('[data-split]').forEach((el) => {
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    let i = 0;
    const splitInto = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          // letters are grouped into whole-word boxes so a line can only
          // break between words, never inside one
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const word = document.createElement('span');
            word.className = 'word';
            word.setAttribute('aria-hidden', 'true');
            [...part].forEach((ch) => {
              const s = document.createElement('span');
              s.textContent = ch;
              s.style.setProperty('--i', i++);
              word.appendChild(s);
            });
            frag.appendChild(word);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          splitInto(child);   // keep <em> etc., split what's inside
        }
      });
    };
    splitInto(el);
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
  // Hidden sections (Research, Personal for now) report a top of 0, so they
  // would always win; only follow sections that are actually on the page.
  const spied = [...document.querySelectorAll('[data-nav]')].filter((s) => !s.hidden);
  const navLinks = [...document.querySelectorAll('.nav a')];
  // Inner pages only have the footer to follow, so they keep their
  // aria-current="page" instead.
  if (spied.length > 1 && navLinks.length) {
    let current = null;
    const update = () => {
      const line = window.innerHeight * 0.4;
      let active = spied[0];
      for (const s of spied) {
        if (s.getBoundingClientRect().top <= line) active = s;
      }
      // The footer is short and can never reach the line: at the very
      // bottom of the page, it's the one you're reading.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) active = spied[spied.length - 1];
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

  // Sticky header: on the home page the small "Simone Wong" fades in once
  // the big hero name has scrolled out of view, so the name never shows twice.
  const header = document.querySelector('.top');
  if (header) {
    const heroName = document.querySelector('.hero .name');
    if (heroName && 'IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        header.classList.toggle('show-name', !e.isIntersecting);
      }, { rootMargin: '-64px 0px 0px 0px' }).observe(heroName);
    } else {
      header.classList.add('show-name');
    }
  }

  // Phone menu: the nav folds into a dropdown under the Menu button.
  const toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    const top = toggle.closest('.top');
    const set = (open) => {
      top.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', () => set(!top.classList.contains('is-open')));
    top.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('click', (e) => { if (!top.contains(e.target)) set(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && top.classList.contains('is-open')) { set(false); toggle.focus(); }
    });
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

  // Orbit: tap a node and its children branch out. Arms are exclusive with
  // each other; category leaves are exclusive with their siblings.
  const orbit = document.querySelector('[data-orbit]');
  if (orbit) {
    const setBranch = (branch, open) => {
      branch.classList.toggle('open', open);
      const node = branch.querySelector(':scope > .orb-node');
      node.setAttribute('aria-expanded', String(open));
      branch.querySelector(':scope > .leaves, :scope > .twigs')?.setAttribute('aria-hidden', String(!open));
      if (!open) branch.classList.remove('open');
      if (!open) branch.querySelectorAll('.open').forEach((b) => setBranch(b, false));
    };
    orbit.querySelectorAll('.orb-node').forEach((node) => {
      node.addEventListener('click', () => {
        const branch = node.closest('.arm, .leaf');
        const willOpen = !branch.classList.contains('open');
        // A category only makes sense with its arm extended, so make sure
        // the parent is open before opening a child.
        const parentArm = branch.classList.contains('leaf') ? branch.closest('.arm') : null;
        if (willOpen && parentArm && !parentArm.classList.contains('open')) setBranch(parentArm, true);
        [...branch.parentElement.children].forEach((sib) => {
          if (sib !== branch && sib.classList.contains('open')) setBranch(sib, false);
        });
        setBranch(branch, willOpen);
        const anyArm = orbit.querySelector('.arm.open');
        if (anyArm) orbit.dataset.open = anyArm.querySelector('.orb-node').dataset.node; else delete orbit.dataset.open;
        // On narrow screens the third level is listed under the map instead.
        const detail = document.querySelector('[data-orb-detail]');
        const openLeaf = orbit.querySelector('.leaf.open');
        const openArm = orbit.querySelector('.arm.open');
        const text = (lbl) => [...lbl.childNodes].map((n) => n.nodeType === 3 ? n.textContent : (n.classList?.contains('sub') ? ' · ' + n.textContent : (n.tagName === 'BR' ? ' ' : n.textContent))).join('').replace(/\s+/g, ' ').trim();
        // Holding the map still makes an open list readable.
        orbit.classList.toggle('is-still', !!openLeaf);
        if (detail) {
          let title = null, items = [];
          // Narrow screens don't draw the category fan, so when Services is
          // open the whole breakdown is listed here in one go.
          const listAll = window.matchMedia('(max-width: 719px)').matches
            && openArm?.querySelector(':scope > .orb-node')?.dataset.node === 'services';
          if (listAll) {
            detail.innerHTML = [...openArm.querySelectorAll(':scope > .leaves > .leaf')].map((leaf) => {
              const t = leaf.querySelector(':scope > .orb-node .lbl').textContent;
              const li = [...leaf.querySelectorAll('.twigs li')].map((x) => `<li>${x.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim()}</li>`).join('');
              return `<div class="orb-group"><span class="mono">${t}</span><ul class="chips">${li}</ul></div>`;
            }).join('');
            detail.hidden = false;
            return;
          }
          if (openLeaf) {
            title = openLeaf.querySelector(':scope > .orb-node .lbl').textContent;
            items = [...openLeaf.querySelectorAll('.twigs li')].map((li) => li.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim());
          } else if (openArm) {
            const statics = [...openArm.querySelectorAll(':scope > .leaves > .leaf > .leaf-end .lbl')];
            if (statics.length) { title = openArm.querySelector(':scope > .orb-node .lbl').textContent; items = statics.map(text); }
          }
          if (title) {
            detail.innerHTML = `<span class="mono">${title}</span><ul class="chips">${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
            detail.hidden = false;
          } else {
            detail.hidden = true;
          }
        }
      });
    });
    // Services is expanded by default; the other arms start closed.
    const svc = orbit.querySelector('.orb-node[data-node="services"]');
    if (svc && !orbit.querySelector('.arm.open')) svc.click();

    orbit.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { orbit.querySelectorAll('.open').forEach((b) => setBranch(b, false)); delete orbit.dataset.open; orbit.classList.remove('is-still'); const d = document.querySelector('[data-orb-detail]'); if (d) d.hidden = true; }
    });
  }

  // Keep the map beside the text: scale it to its column when the column is
  // narrower than the map's natural footprint. Phones use the stacked layout.
  const orbitEl = document.querySelector('[data-orbit]');
  if (orbitEl && 'ResizeObserver' in window) {
    const NATURAL = 580;   // orbit (460) + room for the lists that hang off it
    const wide = window.matchMedia('(min-width: 720px)');
    const fit = () => {
      if (!wide.matches) { orbitEl.style.zoom = ''; return; }
      // the orbit is a grid item: read its track, not the whole grid
      const tracks = getComputedStyle(orbitEl.parentElement).gridTemplateColumns.split(' ').map(parseFloat);
      const col = tracks.length > 1 ? tracks[tracks.length - 1] : orbitEl.parentElement.getBoundingClientRect().width;
      const z = Math.max(0.72, Math.min(1, col / NATURAL));
      orbitEl.style.zoom = z === 1 ? '' : String(z);
    };
    new ResizeObserver(fit).observe(orbitEl.parentElement);
    wide.addEventListener('change', fit);
    fit();
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
