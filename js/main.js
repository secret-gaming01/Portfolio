(() => {
  "use strict";

  const $ = (s, e = document) => e.querySelector(s);
  const $$ = (s, e = document) => Array.from(e.querySelectorAll(s));
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

  $("#year").textContent = new Date().getFullYear();

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const preloader = $("#preloader");
  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add("hide");
    setTimeout(() => preloader.remove(), 700);
  }
  if (REDUCED || document.readyState === "complete") hidePreloader();
  else {
    window.addEventListener("load", hidePreloader);
    setTimeout(hidePreloader, 2500);
  }

  const DEFAULT_CONTENT = {
    typing: [
      "Développeur Web & C#",
      "Créateur d'expériences interactives",
      "Passionné de tech & gaming",
      "En train d'apprendre Rust"
    ],
    skills: [
      { name: "C#", level: 85 },
      { name: "HTML / CSS", level: 85 },
      { name: "JavaScript", level: 75 },
      { name: "Python (bases)", level: 45 },
      { name: "Rust (en apprentissage)", level: 20 }
    ],
    marquee: ["C#", ".NET", "HTML5", "CSS3", "JavaScript", "Python", "Rust", "Git"],
    repoDesc: {},
    site: {
      aboutText: "Développeur du Québec, passionné par le code, la tech et le gaming. Je crée des sites web modernes et des applications C#, avec un faible pour les interfaces rapides et immersives.",
      aboutQuote: "« Le silence parle pour ceux qui savent... »",
      factRole: "Développeur Web & C#",
      factBase: "Québec, Canada",
      factStatus: "Ouvert aux opportunités",
      services: [
        { title: "Sites & applications web", desc: "Sites vitrines, landing pages et applis web modernes, responsives et rapides." },
        { title: "Applications C# / .NET", desc: "Outils, logiciels de bureau et utilitaires robustes et performants." },
        { title: "Bots & automatisation", desc: "Bots Discord et scripts qui éliminent les tâches répétitives." },
        { title: "Interfaces & expériences 3D", desc: "Animations, effets interactifs et scènes WebGL qui marquent les esprits." }
      ],
      email: "pro.secretgaming01@gmail.com",
      discord: "secret_gaming01",
      githubUrl: "https://github.com/Secret-gaming01",
      twitchUrl: "https://www.twitch.tv/secret_gaming01",
      location: "Québec, Canada — disponible à distance",
      footerTagline: "Développeur Web & C# basé au Québec. Je construis des sites rapides, des outils solides et des interfaces qui claquent.",
      musicSrc: "assets/music1.mp3"
    },
    projects: [
      {
        title: "Néon Dashboard",
        cat: "web",
        thumb: "p1",
        kicker: "Application web",
        tags: ["React", "WebSocket", "CSS"],
        short: "Dashboard temps réel : graphiques animés, données en direct et thème néon.",
        desc: "Un tableau de bord temps réel pensé pour la performance : connexion WebSocket persistante, graphiques animés à la demande et thème néon personnalisable.",
        feats: ["Streaming de données en temps réel", "Graphiques animés sans librairie lourde", "Thèmes et widgets réorganisables", "100 % responsive"],
        stack: ["React", "WebSocket", "CSS"],
        demoUrl: "",
        repoUrl: ""
      },
      {
        title: "CyberShop",
        cat: "web",
        thumb: "p2",
        kicker: "E-commerce",
        tags: ["Next.js", "Stripe", "Tailwind"],
        short: "Boutique dark mode avec panier persistant et paiement Stripe.",
        desc: "Boutique en ligne dark mode avec parcours d'achat complet : catalogue filtrable, panier persistant et paiement sécurisé via Stripe.",
        feats: ["Panier persistant (localStorage)", "Paiement Stripe Checkout", "Recherche instantanée", "Optimisation mobile"],
        stack: ["Next.js", "Stripe", "Tailwind"],
        demoUrl: "",
        repoUrl: ""
      },
      {
        title: "Orbital 3D",
        cat: "3d",
        thumb: "p3",
        kicker: "Expérience 3D",
        tags: ["Three.js", "GLSL", "JS"],
        short: "Expérience WebGL interactive : système planétaire explorable à la souris.",
        desc: "Un système planétaire interactif en WebGL : orbites calculées en temps réel, contrôles caméra fluides et rendu optimisé pour tourner à 60 fps même sur mobile.",
        feats: ["Orbites physiques en temps réel", "Contrôles souris & tactile", "Textures génératives", "60 fps sur mobile"],
        stack: ["Three.js", "GLSL", "Vanilla JS"],
        demoUrl: "",
        repoUrl: ""
      },
      {
        title: "Bot Discord SG",
        cat: "bot",
        thumb: "p4",
        kicker: "Bot & automatisation",
        tags: ["Node.js", "Discord.js", "MongoDB"],
        short: "Bot de modération et de musique avec panel web de configuration.",
        desc: "Bot multifonction pour serveurs Discord : modération automatique, lecteur de musique et panel web de configuration connecté à une base de données.",
        feats: ["Modération automatique configurable", "Lecteur musique multi-source", "Panel web admin", "Base MongoDB"],
        stack: ["Node.js", "discord.js", "MongoDB"],
        demoUrl: "",
        repoUrl: ""
      },
      {
        title: "Pixel Arena",
        cat: "game",
        thumb: "p5",
        kicker: "Jeu navigateur",
        tags: ["TypeScript", "Canvas", "Socket.io"],
        short: "Mini-jeu multijoueur dans le navigateur, classements et salons privés.",
        desc: "Mini-jeu multijoueur directement dans le navigateur : salons privés, parties rapides et classement global synchronisé en temps réel.",
        feats: ["Multijoueur via Socket.io", "Salons privés par code", "Classement global", "Rendu Canvas optimisé"],
        stack: ["TypeScript", "Canvas", "Socket.io"],
        demoUrl: "",
        repoUrl: ""
      },
      {
        title: "Portfolio v1",
        cat: "web",
        thumb: "p6",
        kicker: "Site vitrine",
        tags: ["HTML", "CSS", "JS"],
        short: "Première version de mon portfolio, à l'origine de celui que vous visitez.",
        desc: "La première version de mon portfolio : le laboratoire qui m'a servi à apprendre les animations CSS, le scroll fluide et l'hébergement.",
        feats: ["Première intégration responsive", "Animations au scroll", "Déploiement continu"],
        stack: ["HTML", "CSS", "JavaScript"],
        demoUrl: "",
        repoUrl: ""
      }
    ]
  };
  let CONTENT = DEFAULT_CONTENT;

  async function loadContent() {
    try {
      const res = await fetch("data/content.json?v=" + Date.now(), { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      CONTENT = { ...DEFAULT_CONTENT, ...json };
    } catch {}
  }

  const navbar = $("#navbar");
  const toTop = $(".to-top");
  const progressBar = $("#scrollProgress");
  let scrollTicking = false;
  const onScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
      toTop.classList.toggle("show", window.scrollY > 600);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar) progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      scrollTicking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $("#burger");
  const navLinks = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", navLinks).forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        $$(".nav-links a").forEach((a) => {
          const isActive = a.getAttribute("href") === `#${id}`;
          a.classList.toggle("active", isActive);
          if (isActive) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => spy.observe(s));

  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  document.addEventListener("click", (e) => {
    const soon = e.target.closest("[data-soon]");
    if (soon) {
      e.preventDefault();
      showToast("Lien bientôt disponible — projet en cours !");
    }
  });

  const DECODE_CHARS = "!<>-_\\/[]{}=+*^?#01";
  function decode(el) {
    const original = el.innerHTML;
    const finalText = el.textContent;
    let frame = 0;
    const total = Math.max(14, finalText.length * 2);
    const iv = setInterval(() => {
      frame++;
      let out = "";
      for (let i = 0; i < finalText.length; i++) {
        out +=
          i < (frame / total) * finalText.length
            ? finalText[i]
            : finalText[i] === " "
              ? " "
              : DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)];
      }
      el.textContent = out;
      if (frame >= total) {
        clearInterval(iv);
        el.innerHTML = original;
      }
    }, 30);
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
          if (entry.target.classList.contains("section-title")) decode(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  const canHover = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  function bindTilt(el) {
    if (!canHover || REDUCED || el.dataset.tiltBound) return;
    el.dataset.tiltBound = "1";
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.transition = "transform 0.08s linear";
      el.style.transform =
        `perspective(900px) rotateY(${(px - 0.5) * 10}deg) rotateX(${(0.5 - py) * 10}deg) translateY(-6px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transition = "transform 0.45s cubic-bezier(0.22,1,0.36,1)";
      el.style.transform = "";
    });
  }

  function bindGlass(el) {
    if (!canHover || el.dataset.glassBound) return;
    el.dataset.glassBound = "1";
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }

  const glow = $("#cursorGlow");
  if (canHover && !REDUCED && glow) {
    let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy;
    window.addEventListener("pointermove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });
    (function loopGlow() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      requestAnimationFrame(loopGlow);
    })();
  }

  const avatar = $("#avatar");
  const avatarImg = $(".avatar img");
  if (avatar && avatarImg) {
    const showPhoto = () => avatar.classList.add("has-photo");
    if (avatarImg.complete && avatarImg.naturalWidth > 0) showPhoto();
    else avatarImg.addEventListener("load", showPhoto);
    avatarImg.addEventListener("error", () => avatarImg.remove());
  }

  // Musique de fond : "Wallpaper" par Kevin MacLeod (incompetech.com), CC BY 4.0
  // Les navigateurs interdisent le son avant toute interaction : la piste démarre
  // immédiatement mais muette, puis devient audible au premier clic/touche/scroll,
  // sauf si la préférence "mute" est enregistrée.
  const music = $("#bgMusic");
  music.muted = true;
  music.volume = 0;
  const audioBtn = $("#audioToggle");
  let started = false;
  let audible = false;
  let userMuted = localStorage.getItem("sg_music") === "off";
  let fadeTimer = null;

  function fadeTo(target, duration) {
    clearInterval(fadeTimer);
    const start = music.volume;
    const dist = Math.abs(target - start);
    if (dist < 0.001) { music.volume = target; if (target === 0) music.pause(); return; }
    const ms = duration || 600;
    const steps = Math.max(1, Math.round(ms / 30));
    const step = (target - start) / steps;
    let i = 0;
    fadeTimer = setInterval(() => {
      i++;
      const nv = i >= steps ? target : start + step * i;
      music.volume = Math.max(0, Math.min(1, nv));
      if (i >= steps) {
        clearInterval(fadeTimer);
        music.volume = target;
        if (target === 0) music.pause();
      }
    }, 30);
  }

  function setAudible(on) {
    audible = on;
    if (on) {
      music.muted = false;
      ensureAmp();
      if (music.paused) music.play().catch(() => {});
    }
    fadeTo(on ? musicVol : 0, on ? 6000 : 400);
    audioBtn.classList.toggle("on", on);
    audioBtn.setAttribute("aria-pressed", String(on));
    audioBtn.setAttribute("aria-label", on ? "Couper la musique" : "Activer la musique");
  }

  let ampCtx = null;
  let ampGain = null;
  function ensureAmp() {
    if (ampGain) {
      if (ampCtx && ampCtx.state === "suspended") ampCtx.resume().catch(() => {});
      return;
    }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      ampCtx = new AC();
      const src = ampCtx.createMediaElementSource(music);
      ampGain = ampCtx.createGain();
      ampGain.gain.value = 1.35;
      src.connect(ampGain);
      ampGain.connect(ampCtx.destination);
      ampCtx.resume().catch(() => {});
    } catch {
      ampCtx = null;
      ampGain = null;
    }
  }

  let musicVol = Math.min(1, Math.max(0, parseFloat(localStorage.getItem("sg_music_vol") || "0.7")) || 0.7);
  const volSlider = $("#volumeSlider");
  if (volSlider) {
    volSlider.value = Math.round(musicVol * 100);
    volSlider.addEventListener("input", () => {
      musicVol = Number(volSlider.value) / 100;
      localStorage.setItem("sg_music_vol", String(musicVol));
      if (audible) music.volume = musicVol;
    });
  }

  async function startMusic() {
    if (started) return true;
    music.muted = true;
    try {
      await music.play();
      started = true;
      return true;
    } catch {
      return false;
    }
  }
  startMusic();

  const welcome = $("#welcomeOverlay");
  function dismissWelcome() {
    if (!welcome || welcome.classList.contains("leave")) return;
    welcome.classList.add("leave");
    setTimeout(() => welcome.remove(), 800);
  }
  function enterSite(withMusic) {
    dismissWelcome();
    localStorage.setItem("sg_music", withMusic ? "on" : "off");
    userMuted = !withMusic;
    if (withMusic) {
      startMusic().then((ok) => {
        if (ok) setAudible(true);
      });
    }
  }
  $("#enterBtn").addEventListener("click", () => enterSite(true));

  audioBtn.addEventListener("click", () => {
    startMusic().then((ok) => {
      if (!ok) {
        showToast("Lecture impossible — vérifie ta connexion");
        return;
      }
      const next = !audible;
      userMuted = !next;
      localStorage.setItem("sg_music", next ? "on" : "off");
      setAudible(next);
      showToast(next ? "Musique activée" : "Musique coupée");
    });
  });

  music.addEventListener("error", () => {
    if (audible) showToast("Problème avec le fichier musical");
    started = false;
    audioBtn.classList.remove("on");
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (started) music.pause();
    } else if (started) {
      music.play().catch(() => {});
    }
  });

  const NS = "portfoliosecretgaming01";
  async function fetchCount(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("counter");
    const raw = await res.text();
    try {
      return parseInt(JSON.parse(raw).value, 10) || 0;
    } catch {
      return parseInt(raw, 10) || 0;
    }
  }
  const statViewsEl = $("#statViews");
  let heroSeen = false;
  let targetViews = null;

  const countUp = (el, to) => {
    if (!el) return;
    if (REDUCED) {
      el.textContent = to.toLocaleString("fr-FR");
      return;
    }
    const t0 = performance.now();
    const dur = 1100;
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString("fr-FR");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const flushCounters = () => {
    if (!heroSeen || targetViews === null) return;
    countUp(statViewsEl, targetViews);
  };

  const heroIO = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          heroSeen = true;
          heroIO.disconnect();
          flushCounters();
        }
      }),
    { threshold: 0.35 }
  );
  const heroStatsEl = $(".hero-stats");
  if (heroStatsEl) heroIO.observe(heroStatsEl);

  async function loadStats() {
    try {
      targetViews = await fetchCount(`https://abacus.jasoncameron.dev/hit/${NS}/views`);
    } catch {
      targetViews = parseInt(localStorage.getItem("sg_views") || "0", 10) + 1;
      localStorage.setItem("sg_views", String(targetViews));
    }
    flushCounters();
  }
  loadStats();

  const qcTimeEl = $("#qcTime");
  function tickQC() {
    if (!qcTimeEl) return;
    qcTimeEl.textContent = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Toronto"
    }).format(new Date());
  }
  tickQC();
  setInterval(tickQC, 30000);

  const copyBtn = $("#copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText($("#emailText").textContent.trim());
        showToast("Adresse email copiée !");
      } catch {
        showToast("Impossible de copier l'email");
      }
    });
  }

  const discordCopy = $("#discordText");
  if (discordCopy) {
    const copyDiscord = async () => {
      try {
        await navigator.clipboard.writeText((CONTENT.site && CONTENT.site.discord) || "secret_gaming01");
        showToast("Pseudo Discord copié !");
      } catch {
        showToast("Impossible de copier le pseudo");
      }
    };
    discordCopy.addEventListener("click", copyDiscord);
    discordCopy.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); copyDiscord(); }
    });
  }

  const form = $("#contactForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return;
    btn.disabled = true;
    btn.textContent = "Envoi en cours...";
    try {
      const targetEmail = (CONTENT.site && CONTENT.site.email) || "pro.secretgaming01@gmail.com";
      const res = await fetch("https://formsubmit.co/ajax/" + targetEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("send failed");
      form.reset();
      showToast("Message envoyé avec succès ! Réponse bientôt.");
    } catch {
      showToast("Erreur d'envoi — contacte-moi sur Discord : secret_gaming01");
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });

  function applySite() {
    const s = CONTENT.site || {};
    const t = (id, v) => {
      const el = $("#" + id);
      if (el && v != null && v !== "") el.textContent = v;
    };
    t("aboutText", s.aboutText);
    t("aboutQuote", s.aboutQuote);
    t("factRole", s.factRole);
    t("factBase", s.factBase);
    t("factStatus", s.factStatus);
    (s.services || []).forEach((svc, i) => {
      t("svcTitle" + (i + 1), svc.title);
      t("svcDesc" + (i + 1), svc.desc);
    });
    if (s.email) {
      t("emailText", s.email);
      const copy = $("#copyEmail");
      if (copy) {
        copy.replaceWith(copy.cloneNode(true));
        $("#copyEmail").addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(s.email);
            showToast("Adresse email copiée !");
          } catch {
            showToast("Impossible de copier l'email");
          }
        });
      }
    }
    t("discordText", s.discord);
    t("locationText", s.location);
    t("footerTagline", s.footerTagline);
    if (s.githubUrl) {
      const a = $("#githubLink");
      if (a) { a.href = s.githubUrl; a.textContent = s.githubUrl.replace(/^https?:\/\/(www\.)?/, ""); }
    }
    if (s.twitchUrl) {
      const a = $("#twitchLink");
      if (a) { a.href = s.twitchUrl; a.textContent = s.twitchUrl.replace(/^https?:\/\/(www\.)?/, ""); }
    }
  }

  function startTyping() {
    const typingEl = $("#typing");
    if (!typingEl) return;
    const words = CONTENT.typing;
    let wI = 0, cI = 0, deleting = false;
    (function typeLoop() {
      const word = words[wI];
      typingEl.textContent = word.slice(0, cI);
      let delay = deleting ? 45 : 85;
      if (!deleting && cI === word.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && cI === 0) {
        deleting = false;
        wI = (wI + 1) % words.length;
        delay = 350;
      } else {
        cI += deleting ? -1 : 1;
      }
      setTimeout(typeLoop, delay);
    })();
  }

  function renderSkills() {
    const list = $("#skillsList");
    if (!list) return;
    list.innerHTML = CONTENT.skills
      .map(
        (s) => `
      <div class="skill">
        <div class="skill-head"><span>${esc(s.name)}</span><em>${Number(s.level)}%</em></div>
        <div class="bar"><i data-level="${Number(s.level)}"></i></div>
      </div>`
      )
      .join("");
  }

  function setupSkillBars() {
    const skillsSection = $("#presentation");
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          $$(".bar i").forEach((bar, i) => {
            bar.style.transitionDelay = `${i * 90}ms`;
            bar.style.width = `${bar.dataset.level}%`;
          });
          barObserver.disconnect();
        });
      },
      { threshold: 0.25 }
    );
    if (skillsSection) barObserver.observe(skillsSection);
  }

  function renderMarquee() {
    const track = $("#marqueeTrack");
    if (!track) return;
    const items = CONTENT.marquee.map((m) => `<span>${esc(m)}</span><i>•</i>`).join("");
    track.innerHTML = items + items;
  }

  const CAT_LABELS = {
    web: "Web",
    "3d": "3D",
    bot: "Bots",
    game: "Jeux",
    desktop: "Bureau",
    mobile: "Mobile",
    api: "Backend",
    tool: "Outils",
    discord: "Discord"
  };
  const catLabel = (c) => CAT_LABELS[c] || (c ? c.charAt(0).toUpperCase() + c.slice(1) : "");
  const IMG_RE = /^(https?:\/\/|assets\/|images\/)/i;

  function thumbInner(p) {
    const t = String(p.thumb || "");
    const img = IMG_RE.test(t) ? `<img src="${esc(t)}" alt="" loading="lazy" />` : "";
    const star = p.featured ? '<span class="feat-star" title="Projet vedette">★</span>' : "";
    return img + star;
  }
  function thumbClass(p) {
    const t = String(p.thumb || "");
    return /^p\d+$/i.test(t) ? `thumb has-bg ${t.toLowerCase()}` : "thumb";
  }
  function projMeta(p) {
    const bits = [];
    if (p.year) bits.push(`<span>${esc(p.year)}</span>`);
    if (p.status) bits.push(`<em class="badge-status">${esc(p.status)}</em>`);
    return bits.length ? `<div class="proj-meta">${bits.join("")}</div>` : "";
  }

  function projectCard(p) {
    return `
    <article class="project-card glass tilt reveal${p.featured ? " featured" : ""}" data-cat="${esc(p.cat)}">
      <div class="${thumbClass(p)}">${thumbInner(p)}</div>
      <div class="card-body">
        ${projMeta(p)}
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.short || "")}</p>
        <ul class="tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <span class="card-more">Voir les détails<span class="arrow">→</span></span>
      </div>
    </article>`;
  }

  function renderFilters() {
    const wrap = $("#filterRow");
    if (!wrap) return;
    const cats = [...new Set(CONTENT.projects.map((p) => p.cat).filter(Boolean))];
    const btn = (f, label, active) =>
      `<button type="button" class="filter-btn${active ? " active" : ""}" data-filter="${esc(f)}">${esc(label)}</button>`;
    wrap.innerHTML = btn("all", "Tous", true) + cats.map((c) => btn(c, catLabel(c), false)).join("");
  }

  function renderProjects() {
    const grid = $("#projGrid");
    if (!grid) return;
    grid.innerHTML = CONTENT.projects.map(projectCard).join("");
    $$("#projGrid .reveal").forEach((el) => revealObserver.observe(el));
    if (canHover) $$("#projGrid .tilt").forEach(bindTilt);
    $$("#projGrid .glass").forEach(bindGlass);
  }

  function setupFilters() {
    const FILTERS = $$(".filter-btn");
    FILTERS.forEach((btn) =>
      btn.addEventListener("click", () => {
        FILTERS.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        let visible = 0;
        $$("#projGrid .project-card").forEach((c) => {
          const show = f === "all" || c.dataset.cat === f;
          c.style.display = show ? "" : "none";
          if (show) visible++;
        });
        const empty = $("#projEmpty");
        if (empty) empty.hidden = visible > 0;
      })
    );
  }

  const backdrop = $("#modalBackdrop");
  const mKicker = $("#modalKicker");
  const mTitle = $("#modalTitle");
  const mDesc = $("#modalDesc");
  const mStack = $("#modalStack");
  const mFeats = $("#modalFeats");
  const mClose = $("#modalClose");
  let lastFocus = null;

  let modalIdx = -1;

  function openModal(data, idx) {
    if (!backdrop) return;
    lastFocus = document.activeElement;
    modalIdx = typeof idx === "number" ? idx : CONTENT.projects.indexOf(data);
    mKicker.textContent = data.kicker || "";
    mTitle.textContent = data.title || "";
    $("#modalMeta").textContent = [data.year, data.status].filter(Boolean).join(" · ");
    mDesc.textContent = data.desc || "";
    mStack.innerHTML = (data.stack || []).map((s) => `<li>${esc(s)}</li>`).join("");
    mFeats.innerHTML = (data.feats || []).map((f) => `<li>${esc(f)}</li>`).join("");
    const actions = [];
    if (data.demoUrl)
      actions.push(`<a class="btn btn-primary" href="${esc(data.demoUrl)}" target="_blank" rel="noopener">Ouvrir le projet</a>`);
    if (data.repoUrl)
      actions.push(`<a class="btn btn-ghost" href="${esc(data.repoUrl)}" target="_blank" rel="noopener">Code source</a>`);
    $("#modalActions").innerHTML = actions.join("");
    const total = CONTENT.projects.length;
    $("#modalCount").textContent = `${modalIdx + 1} / ${total}`;
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    mClose.focus();
  }

  function stepModal(dir) {
    const total = CONTENT.projects.length;
    if (!total) return;
    const next = (modalIdx + dir + total) % total;
    openModal(CONTENT.projects[next], next);
  }
  $("#modalPrev").addEventListener("click", () => stepModal(-1));
  $("#modalNext").addEventListener("click", () => stepModal(1));

  function closeModal() {
    if (!backdrop) return;
    backdrop.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  if (mClose) mClose.addEventListener("click", closeModal);
  if (backdrop)
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
  window.addEventListener("keydown", (e) => {
    if (!backdrop || backdrop.hidden) return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowLeft") stepModal(-1);
    else if (e.key === "ArrowRight") stepModal(1);
    else if (e.key === "Tab") {
      const focusables = $$(".modal a, .modal button", backdrop).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  function setupModals() {
    $$("#projGrid .project-card").forEach((card, i) => {
      const p = CONTENT.projects[i];
      if (!p) return;
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Voir les détails du projet ${p.title}`);
      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        openModal(p, i);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(p, i);
        }
      });
    });
  }

  const headerLogo = $("#navbar .logo");
  if (headerLogo) {
    headerLogo.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload();
    });
  }

  (async () => {
    await loadContent();
    applySite();
    if (CONTENT.site && CONTENT.site.musicSrc && music.getAttribute("src") !== CONTENT.site.musicSrc && !started) {
      music.src = CONTENT.site.musicSrc;
    }
    renderSkills();
    setupSkillBars();
    renderMarquee();
    renderFilters();
    renderProjects();
    setupFilters();
    setupModals();
    startTyping();
  })();

  console.log(
    "%c SG_01 %c Portfolio — version 2. Curieux ? Jette un oeil au code source ",
    "background:#4f8eff;color:#ffffff;font-weight:bold;padding:4px 8px;border-radius:4px 0 0 4px",
    "color:#4f8eff;padding:4px 8px"
  );
})();
