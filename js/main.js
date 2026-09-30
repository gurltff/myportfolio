/* Ansshita Kumar · portfolio: all the little interactions */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const SVGNS = 'http://www.w3.org/2000/svg';

  const hero = $('.hero');
  let heroH = hero.offsetHeight;
  let vh = window.innerHeight;

  const useIcon = (id, cls) => {
    const svg = document.createElementNS(SVGNS, 'svg');
    if (cls) svg.setAttribute('class', cls);
    svg.setAttribute('aria-hidden', 'true');
    const u = document.createElementNS(SVGNS, 'use');
    u.setAttribute('href', id);
    svg.appendChild(u);
    return svg;
  };

  /* ---------------------------------------------------------
     smooth scrolling
     --------------------------------------------------------- */
  let lenis = null;
  if (!reduce && typeof window.Lenis === 'function') {
    lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1 });
  }

  const scrollToTarget = (el) => {
    if (lenis) lenis.scrollTo(el || 0, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else if (!el) window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = id === 'top' ? null : document.getElementById(id);
    if (id !== 'top' && !target) return;
    e.preventDefault();
    scrollToTarget(target);
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
    history.replaceState(null, '', '#' + id);
  });

  /* ---------------------------------------------------------
     cover: chalk stars (positions traced from the poster, 736×520)
     --------------------------------------------------------- */
  const W = 736, H = 520;
  const whiteStars = [
    [28, 18, 1.1], [43, 57, 1.3], [107, 100, 1], [135, 57, 1.2], [160, 130, 1.4], [185, 22, 1],
    [270, 105, 1.2], [297, 92, 1.3, 'sp'], [335, 145, 1.3], [418, 95, 1.5], [440, 40, 1.2, 'sp'],
    [470, 20, 1], [555, 20, 1.1], [580, 55, 1.3], [630, 120, 1.5], [700, 168, 1.3], [722, 240, 1.2],
    [690, 300, 1], [640, 292, 1.4], [600, 332, 1], [560, 372, 1.2], [700, 382, 1.3], [712, 432, 1.1],
    [662, 470, 1.4], [555, 488, 1.3], [602, 505, 0.9], [440, 410, 1.2], [330, 410, 1.3], [185, 432, 1.5],
    [150, 392, 0.9], [30, 352, 1.3], [55, 300, 1.1], [20, 232, 1.4], [60, 190, 1.2], [40, 490, 1.3],
    [190, 500, 1], [122, 322, 1.2], [75, 372, 0.9], [255, 470, 1.1], [380, 40, 0.9], [520, 140, 1.3, 'sp'],
    [668, 212, 1.3, 'sp'], [248, 62, 1], [505, 440, 0.9], [712, 505, 1], [15, 120, 1], [655, 20, 0.9],
    [500, 92, 1.2], [88, 262, 1.2, 'sp'], [665, 345, 0.9], [268, 378, 1], [470, 375, 0.8], [720, 118, 0.9]
  ];
  const blueStars = [
    [88, 50, 4.6, -8, 'big'], [684, 58, 4.0, 14, 'b'], [232, 133, 1.8, -10, 'b2'], [437, 168, 2.2, 12, 'b'],
    [630, 398, 3.2, -6, 'b2'], [488, 495, 3.2, 10, 'b'], [92, 442, 2.6, -14, 'b'], [235, 395, 1.5, 0, 'b2']
  ];
  const layers = $$('.hero__layer');

  whiteStars.forEach(([x, y, s, kind], i) => {
    const el = document.createElement('span');
    el.className = 'st ' + (kind === 'sp' ? 'st--sp' : 'st--w');
    el.style.cssText = `--x:${(x / W * 100).toFixed(2)}%;--y:${(y / H * 100).toFixed(2)}%;--s:${s};--r:${(i * 47) % 70 - 35}deg;` +
      `--pd:${(0.25 + (i % 17) * 0.06).toFixed(2)}s;--tw:${(2.6 + (i * 37 % 30) / 10).toFixed(1)}s;--td:${(-(i * 0.53) % 4).toFixed(2)}s`;
    el.appendChild(useIcon(kind === 'sp' ? '#s-sparkle' : '#s-star'));
    layers[i % 2].appendChild(el);
  });
  blueStars.forEach(([x, y, s, r, kind], i) => {
    const el = document.createElement('span');
    el.className = 'st st--b';
    el.style.cssText = `--x:${(x / W * 100).toFixed(2)}%;--y:${(y / H * 100).toFixed(2)}%;--s:${s};--r:${r}deg;` +
      `--pd:${(0.1 + i * 0.12).toFixed(2)}s;--tw:${(6 + i % 3).toFixed(1)}s;--td:${(-i * 1.3).toFixed(1)}s`;
    el.appendChild(useIcon(kind === 'b2' ? '#s-star-blue-2' : '#s-star-blue'));
    if (kind === 'big') {
      const inner = document.createElement('span');
      inner.className = 'st__inner';
      inner.appendChild(useIcon('#s-sparkle'));
      el.appendChild(inner);
    }
    layers[s > 2.5 ? 2 : 1].appendChild(el);
  });

  /* ---------------------------------------------------------
     cover: the hand-drawn "portfolio" writes itself
     --------------------------------------------------------- */
  const letters = $$('.lettering .ltr');
  let t0 = 0.25;
  letters.forEach((g, i) => {
    let t = t0;
    $$('.ln', g).forEach((p) => {
      const len = p.getTotalLength();
      const dur = clamp(len / 520, 0.28, 0.75);
      p.style.setProperty('--len', (len + 2).toFixed(1));
      p.style.setProperty('--dd', t.toFixed(2) + 's');
      p.style.setProperty('--dur', dur.toFixed(2) + 's');
      t += dur * 0.62;
    });
    $$('.fl', g).forEach((f) => f.style.setProperty('--dd', (t + 0.05).toFixed(2) + 's'));
    t0 += i === 0 ? 0.3 : 0.17;
  });

  const wiggle = (g) => {
    if (reduce || g.classList.contains('wiggle')) return;
    g.classList.add('wiggle');
    g.addEventListener('animationend', () => g.classList.remove('wiggle'), { once: true });
  };
  $('.lettering').addEventListener('pointerover', (e) => {
    const g = e.target.closest('.ltr');
    if (g) wiggle(g);
  });
  $('.hero__title').addEventListener('click', () => {
    letters.forEach((g, i) => setTimeout(() => wiggle(g), i * 70));
  });

  // "line boil": re-seed the displacement so the chalk lines shimmer like a hand-drawn cartoon
  const boilNoise = $('#boil-noise');
  let heroVisible = true;
  if (!reduce && boilNoise) {
    let seed = 1;
    setInterval(() => {
      if (!heroVisible || document.hidden) return;
      seed = (seed % 4) + 1;
      boilNoise.setAttribute('seed', seed);
    }, 140);
  }
  new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }).observe(hero);

  const ready = () => requestAnimationFrame(() => hero.classList.add('is-ready'));
  Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((r) => setTimeout(r, 1400))
  ]).then(ready);

  /* ---------------------------------------------------------
     reveal-on-scroll ("slap the sticker down")
     --------------------------------------------------------- */
  $$('.collage > [data-reveal]').forEach((el, i) => el.style.setProperty('--rd', (i * 0.07).toFixed(2) + 's'));
  $$('.stamp, .ticket').forEach((el) => el.style.setProperty('--rd', '0s'));

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('is-in');
      revealIO.unobserve(el);
      // once it has landed, hover tilts shouldn't wait for the stagger delay
      const d = parseFloat(getComputedStyle(el).getPropertyValue('--rd')) || 0;
      setTimeout(() => el.style.setProperty('--rd', '0s'), 1200 + d * 1000);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal], .collage, .booth').forEach((el) => revealIO.observe(el));

  // split the name so each letter can bounce
  const nameTitle = $('.c-name__title');
  if (nameTitle) {
    nameTitle.setAttribute('aria-label', nameTitle.textContent.replace(/\s+/g, ' ').trim());
    $$('span', nameTitle).forEach((word) => {
      const txt = word.textContent;
      word.textContent = '';
      word.setAttribute('aria-hidden', 'true');
      [...txt].forEach((ch) => {
        const c = document.createElement('span');
        c.className = 'ch';
        c.textContent = ch;
        word.appendChild(c);
      });
    });
  }

  /* ---------------------------------------------------------
     draggable stickers
     --------------------------------------------------------- */
  $$('[data-drag]').forEach((el) => {
    let id = null, sx = 0, sy = 0, ox = 0, oy = 0;
    el.addEventListener('pointerdown', (e) => {
      id = e.pointerId;
      el.setPointerCapture(id);
      sx = e.clientX - ox;
      sy = e.clientY - oy;
      el.classList.add('is-dragging');
      e.preventDefault();
    });
    el.addEventListener('pointermove', (e) => {
      if (e.pointerId !== id) return;
      ox = e.clientX - sx;
      oy = e.clientY - sy;
      el.style.transform = `translate(${ox}px, ${oy}px)`;
    });
    const end = (e) => {
      if (e.pointerId !== id) return;
      id = null;
      el.classList.remove('is-dragging');
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  });

  /* ---------------------------------------------------------
     raffle: pull a ticket, get a fun fact
     --------------------------------------------------------- */
  const facts = [
    'i study physics at DU and computer applications at Manipal, at the same time ✦',
    'i ranked in the top 1 percentile at the Tata Bharat YUVAi Hackathon',
    'my SIH team is called CoolKats 🐾 and we won the internal round!',
    'this summer i learnt high-vacuum thermal evaporation for nanomaterials research',
    "Coco's Corner is a comfort app made in memory of Coco, a chubby black cat",
    'one of my projects lets you inspect space-grade chips with hand gestures',
    "every star on this page is drawn in code. try clicking anywhere!"
  ];
  const raffle = $('.c-raffle');
  const note = $('#raffle-note');
  if (raffle && note) {
    let order = facts.map((_, i) => i).sort(() => Math.random() - 0.5);
    let k = 0, hideT;
    raffle.addEventListener('click', () => {
      note.textContent = facts[order[k % order.length]];
      k++;
      note.classList.remove('is-shown');
      void note.offsetWidth;
      note.classList.add('is-shown');
      raffle.animate(
        [{ transform: 'rotate(0)' }, { transform: 'rotate(-7deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(0)' }],
        { duration: reduce ? 1 : 450, easing: 'ease-out' }
      );
      clearTimeout(hideT);
      hideT = setTimeout(() => note.classList.remove('is-shown'), 5600);
    });
  }

  /* ---------------------------------------------------------
     stamp rally
     --------------------------------------------------------- */
  const card = $('[data-stampcard]');
  if (card) {
    const stamps = $$('[data-stamp]', card);
    const count = $('[data-stamp-count]', card);
    count.textContent = '0';
    const update = () => {
      const n = stamps.filter((s) => s.classList.contains('is-stamped')).length;
      count.textContent = String(n);
      if (n === stamps.length && !card.classList.contains('is-full')) {
        card.classList.add('is-full');
        const r = card.getBoundingClientRect();
        burst(r.left + r.width / 2, r.bottom - 40, 16, true);
      }
    };
    const stamp = (s) => {
      if (s.classList.contains('is-stamped')) {
        s.classList.remove('is-stamped');
        void s.offsetWidth;
      }
      s.classList.add('is-stamped');
      card.classList.remove('is-shaking');
      void card.offsetWidth;
      card.classList.add('is-shaking');
      update();
    };
    stamps.forEach((s) => $('.stamp__slot', s).addEventListener('click', () => stamp(s)));
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      stamps.forEach((s, i) => setTimeout(() => stamp(s), reduce ? 0 : 450 + i * 560));
    }, { threshold: 0.35 });
    io.observe(card);
  }

  /* ---------------------------------------------------------
     journey: a ribbon that draws itself as you scroll
     --------------------------------------------------------- */
  const road = $('.journey__road');
  const trail = $('.journey__trail');
  const ink = $('.journey__ink');
  const walker = $('.journey__walker');
  const roadSvg = $('.journey__path');
  let roadLen = 0;
  const buildRoad = () => {
    if (!road) return;
    const w = road.clientWidth, h = road.clientHeight;
    roadSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    let d;
    if (w >= 820) {
      const cx = w / 2, amp = Math.min(80, w * 0.07), n = Math.max(3, Math.round(h / 240));
      d = `M${cx} 0`;
      for (let i = 0; i < n; i++) {
        const y0 = (h * i) / n, y1 = (h * (i + 1)) / n, dir = i % 2 ? -1 : 1;
        d += ` C${cx + amp * dir} ${y0 + (y1 - y0) * 0.3} ${cx + amp * dir} ${y0 + (y1 - y0) * 0.7} ${cx} ${y1}`;
      }
    } else {
      const x = 18, amp = 9, n = Math.max(4, Math.round(h / 160));
      d = `M${x} 0`;
      for (let i = 0; i < n; i++) {
        const y0 = (h * i) / n, y1 = (h * (i + 1)) / n, dir = i % 2 ? -1 : 1;
        d += ` C${x + amp * dir} ${y0 + (y1 - y0) * 0.3} ${x + amp * dir} ${y0 + (y1 - y0) * 0.7} ${x} ${y1}`;
      }
    }
    trail.setAttribute('d', d);
    ink.setAttribute('d', d);
    roadLen = ink.getTotalLength();
    ink.style.strokeDasharray = `${roadLen} ${roadLen}`;
    ink.style.strokeDashoffset = roadLen;
  };

  const journeyFx = () => {
    if (!road || !roadLen) return;
    const r = road.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) return;
    const p = clamp((vh * 0.62 - r.top) / r.height, 0, 1);
    ink.style.strokeDashoffset = (roadLen * (1 - p)).toFixed(1);
    const pt = ink.getPointAtLength(roadLen * p);
    walker.style.transform = `translate(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px) rotate(${(p * 720).toFixed(1)}deg)`;
  };

  /* ---------------------------------------------------------
     projects: walk sideways past the booths (desktop)
     --------------------------------------------------------- */
  const booths = $('.booths');
  const track = $('.booths__track');
  const pinMQ = matchMedia('(min-width: 980px)');
  let pinOn = false, travel = 0, skew = 0;
  const setupPin = () => {
    pinOn = pinMQ.matches && !reduce;
    root.classList.toggle('can-pin', pinOn);
    if (!pinOn) {
      booths.style.removeProperty('--booths-h');
      track.style.transform = '';
      return;
    }
    track.style.transform = 'none';
    // if any booth is taller than the space under the nav, its buttons would be cut off:
    // fall back to the normal stacked list instead
    const room = vh - 64 - 18 - 16;
    const tallest = Math.max(...$$('.booth', track).map((c) => c.offsetHeight));
    if (tallest > room) {
      pinOn = false;
      root.classList.remove('can-pin');
      booths.style.removeProperty('--booths-h');
      track.style.transform = '';
      return;
    }
    travel = Math.max(0, track.scrollWidth - window.innerWidth);
    booths.style.setProperty('--booths-h', (travel + vh) + 'px');
  };
  const boothsFx = (vel) => {
    if (!pinOn) return;
    const r = booths.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const p = travel ? clamp(-r.top / travel, 0, 1) : 0;
    skew = lerp(skew, clamp(vel * -0.0025, -3.5, 3.5), 0.12);
    track.style.transform = `translate3d(${(-p * travel).toFixed(1)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
  };

  // tilt the booth cards toward the pointer
  if (fine && !reduce) {
    $$('[data-tilt]').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateZ(0)`;
      });
      c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------------
     contact: the envelope opens when you arrive
     --------------------------------------------------------- */
  const env = $('[data-envelope]');
  const letter = env && $('.letter', env);
  const sizeEnvelope = () => {
    if (!env) return;
    const eh = env.clientHeight || env.clientWidth / 1.55;
    // the front pocket's top edge runs from 38% (sides) down to 60% (middle)
    const padB = Math.round(eh * 0.22 + 34);
    env.style.setProperty('--pad-b', padB + 'px');
    env.style.setProperty('--ps-y', Math.round(eh * 0.1 + 26) + 'px');
    const lh = letter.offsetHeight;
    const bottom = eh * 0.6 + 14;                 // letter's bottom edge, hidden just below the V
    const openTop = bottom - lh;                  // letter's top when pulled out (can be negative)
    const flapH = eh * 0.62;                      // the opened flap stands this tall above the envelope
    const lift = Math.max(120, Math.round(Math.max(-openTop, flapH) + 16));
    env.style.setProperty('--lift', lift + 'px');
    env.style.setProperty('--closed-top', Math.round(lift + eh * 0.07) + 'px');
    env.style.setProperty('--open-shift', Math.round(eh * 0.07 - openTop) + 'px');
  };
  if (env) {
    const toggle = (open) => env.classList.toggle('is-open', open);
    $('.envelope__flap', env).addEventListener('click', (e) => {
      e.stopPropagation();
      toggle(!env.classList.contains('is-open'));
    });
    env.addEventListener('click', () => { if (!env.classList.contains('is-open')) toggle(true); });
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      setTimeout(() => toggle(true), reduce ? 0 : 350);
    }, { threshold: 0.55 });
    io.observe(env);
  }

  /* ---------------------------------------------------------
     nav + progress
     --------------------------------------------------------- */
  const nav = $('.nav');
  const bar = $('.progress span');
  const navLinks = $$('[data-nav]', nav);
  const sections = navLinks.map((a) => document.getElementById(a.dataset.nav)).filter(Boolean);
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.nav === en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => navIO.observe(s));

  /* ---------------------------------------------------------
     marquee ribbon (speeds up with your scroll)
     --------------------------------------------------------- */
  const mqTrack = $('.marquee__track');
  let mqX = 0, mqVis = false, mqDir = 1, mqBoost = 0;
  new IntersectionObserver(([en]) => { mqVis = en.isIntersecting; }).observe($('.marquee'));
  const marqueeFx = (dt, vel) => {
    if (!mqVis || reduce) return;
    if (Math.abs(vel) > 30) mqDir = vel > 0 ? 1 : -1;
    mqBoost = lerp(mqBoost, Math.min(Math.abs(vel) * 0.25, 900), 0.08);
    const half = mqTrack.scrollWidth / 2;
    mqX -= (55 + mqBoost) * dt * mqDir;
    if (mqX <= -half) mqX += half;
    if (mqX > 0) mqX -= half;
    mqTrack.style.transform = `translate3d(${mqX.toFixed(1)}px, 0, 0)`;
  };

  /* ---------------------------------------------------------
     sparkle cursor + click bursts
     --------------------------------------------------------- */
  const cursor = $('.cursor');
  let mx = -100, my = -100, cx = -100, cy = -100, pmx = 0, pmy = 0, hx = 0, hy = 0;
  window.addEventListener('pointermove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    pmx = mx / window.innerWidth - 0.5;
    pmy = my / vh - 0.5;
    if (fine && cursor) cursor.classList.toggle('is-hover', !!e.target.closest('a, button, [data-drag], .ltr, .c-name__title .ch'));
  }, { passive: true });
  document.addEventListener('pointerleave', () => { mx = my = -100; });

  const heroBurst = ['#fffdf6', '#fffdf6', '#a9cbe9', '#d3e9f7'];
  const pageBurst = ['#fbe3ad', '#f5b9c6', '#c2dcee', '#cfe8d5', '#eebfe3', '#f8cf9f'];
  let liveBursts = 0;
  function burst(x, y, n = 7, big = false) {
    if (reduce || liveBursts > 70) return;
    const onHero = y + window.scrollY < heroH;
    const colors = onHero ? heroBurst : pageBurst;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      el.className = 'burst';
      const svg = useIcon(i % 3 === 2 ? '#s-sparkle' : '#s-star');
      svg.style.fill = colors[i % colors.length];
      svg.style.stroke = onHero ? colors[i % colors.length] : '#5b2c17';
      svg.style.strokeWidth = onHero ? '0' : '7';
      el.appendChild(svg);
      document.body.appendChild(el);
      liveBursts++;
      const a = (i / n) * Math.PI * 2 + Math.random() * 0.6;
      const dist = (big ? 90 : 38) + Math.random() * (big ? 120 : 46);
      const s = (big ? 1.1 : 0.7) + Math.random() * 0.7;
      const rot = Math.random() * 360 - 180;
      el.animate([
        { transform: `translate(${x}px, ${y}px) scale(.2) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${x + Math.cos(a) * dist}px, ${y + Math.sin(a) * dist - 12}px) scale(${s}) rotate(${rot}deg)`, opacity: 1, offset: 0.7 },
        { transform: `translate(${x + Math.cos(a) * dist * 1.1}px, ${y + Math.sin(a) * dist * 1.1 + 10}px) scale(${s * 0.6}) rotate(${rot * 1.3}deg)`, opacity: 0 }
      ], { duration: 750 + Math.random() * 350, easing: 'cubic-bezier(.22,1,.36,1)' }).onfinish = () => {
        el.remove();
        liveBursts--;
      };
    }
  }
  document.addEventListener('pointerdown', (e) => {
    if (e.button && e.button !== 0) return;
    if (e.target.closest('[data-drag]')) return;
    burst(e.clientX, e.clientY);
  });

  /* ---------------------------------------------------------
     one frame loop for everything scroll/pointer driven
     --------------------------------------------------------- */
  const heroLayers = layers.map((el) => ({ el, depth: parseFloat(el.dataset.depth) || 0.5 }));
  const heroTitle = $('.hero__title');
  const heroText = $$('.hero__kicker, .hero__date, .hero__venue, .hero__logo');
  let lastY = window.scrollY, lastT = performance.now();

  const frame = (t) => {
    if (lenis) lenis.raf(t);
    const dt = Math.min(0.05, (t - lastT) / 1000) || 0.016;
    lastT = t;
    const y = window.scrollY;
    const vel = (lenis && typeof lenis.velocity === 'number') ? lenis.velocity / dt : (y - lastY) / dt;
    lastY = y;

    // cover parallax: stars drift with the pointer and scroll at different depths
    if (y < heroH + 50 && !reduce) {
      hx = lerp(hx, pmx, 0.06);
      hy = lerp(hy, pmy, 0.06);
      heroLayers.forEach(({ el, depth }) => {
        el.style.transform = `translate3d(${(hx * depth * -34).toFixed(1)}px, ${(hy * depth * -24 - y * depth * 0.22).toFixed(1)}px, 0)`;
      });
      const k = clamp(y / (heroH * 0.85), 0, 1);
      heroTitle.style.transform = `translate3d(${(hx * -10).toFixed(1)}px, ${(y * 0.32).toFixed(1)}px, 0) scale(${(1 - k * 0.08).toFixed(3)})`;
      heroTitle.style.opacity = (1 - k * 1.05).toFixed(3);
      heroText.forEach((el) => { el.style.transform = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0)`; el.style.opacity = (1 - k * 1.2).toFixed(3); });
    }

    nav.classList.toggle('is-hidden', y < heroH * 0.6);
    const docH = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${docH > 0 ? (y / docH).toFixed(4) : 0})`;
    bar.parentElement.style.opacity = y < heroH * 0.6 ? '0' : '1';

    journeyFx();
    boothsFx(vel);
    marqueeFx(dt, vel);

    if (fine && cursor && !reduce) {
      cx = lerp(cx, mx, 0.24);
      cy = lerp(cy, my, 0.24);
      cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0) rotate(${((cx + cy) * 0.4).toFixed(1)}deg)`;
      cursor.classList.toggle('on-hero', my + y < heroH);
    }
    requestAnimationFrame(frame);
  };

  /* ---------------------------------------------------------
     layout-dependent setup
     --------------------------------------------------------- */
  const layout = () => {
    vh = window.innerHeight;
    heroH = hero.offsetHeight;
    setupPin();
    buildRoad();
    sizeEnvelope();
    if (lenis) lenis.resize();
  };
  let rT;
  window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(layout, 120); });
  if (document.fonts) document.fonts.ready.then(layout);
  window.addEventListener('load', layout);
  layout();
  requestAnimationFrame(frame);

  const yearEl = $('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
