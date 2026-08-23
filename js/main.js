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
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    toTop.classList.toggle("show", window.scrollY > 600);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
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
  const music = new Audio("assets/music.mp3");
  music.loop = true;
  music.preload = "none";
  music.volume = 0;
  let musicOn = false;
  let fadeTimer = null;

  function fadeTo(target) {
    clearInterval(fadeTimer);
    fadeTimer = setInterval(() => {
      const v = music.volume;
      const nv = target > v ? Math.min(target, v + 0.04) : Math.max(target, v - 0.05);
      music.volume = nv;
      if (nv === target) {
        clearInterval(fadeTimer);
        if (target === 0) music.pause();
      }
    }, 40);
  }

  const audioBtn = $("#audioToggle");
  audioBtn.addEventListener("click", async () => {
    if (!musicOn) {
      try {
        await music.play();
      } catch {
        showToast("Lecture impossible — réessaie ou change de navigateur");
        return;
      }
      musicOn = true;
      fadeTo(0.45);
    } else {
      musicOn = false;
      fadeTo(0);
    }
    audioBtn.classList.toggle("on", musicOn);
    audioBtn.setAttribute("aria-pressed", String(musicOn));
    audioBtn.setAttribute("aria-label", musicOn ? "Couper la musique" : "Activer la musique");
    showToast(musicOn ? "Musique activée" : "Musique coupée");
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (musicOn) music.pause();
    } else if (musicOn) {
      music.play().catch(() => {});
    }
  });

  const NS = "portfoliosecretgaming01";
  async function fetchCount(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("counter");
    return parseInt(await res.text(), 10) || 0;
  }
  const statViewsEl = $("#statViews");
  const statVisitsEl = $("#statVisits");
  let heroSeen = false;
  let targetViews = null;
  let targetVisits = null;

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
    if (!heroSeen) return;
    if (targetViews !== null) countUp(statViewsEl, targetViews);
    if (targetVisits !== null) countUp(statVisitsEl, targetVisits);
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
      const firstVisit = !sessionStorage.getItem("sg_seen");
      sessionStorage.setItem("sg_seen", "1");
      const viewsUrl = `https://abacus.jasoncameron.dev/hit/${NS}/views`;
      const visitsUrl = firstVisit
        ? `https://abacus.jasoncameron.dev/hit/${NS}/visits`
        : `https://abacus.jasoncameron.dev/get/${NS}/visits`;
      const [views, visits] = await Promise.all([fetchCount(viewsUrl), fetchCount(visitsUrl)]);
      targetViews = views;
      targetVisits = visits;
    } catch {
      targetViews = parseInt(localStorage.getItem("sg_views") || "0", 10) + 1;
      localStorage.setItem("sg_views", String(targetViews));
      targetVisits = 1;
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

  const LANG_COLORS = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    "C#": "#178600",
    Rust: "#dea584",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051"
  };

  async function loadRepos() {
    const section = $("#github");
    const grid = $("#repoGrid");
    if (!section || !grid) return;
    try {
      const res = await fetch("https://api.github.com/users/Secret-gaming01/repos?sort=updated&per_page=8");
      if (!res.ok) throw new Error("api");
      const repos = (await res.json()).filter((r) => !r.fork).slice(0, 6);
      if (!repos.length) {
        section.style.display = "none";
        return;
      }
      const FALLBACK_DESC = "Code, détails et documentation sur GitHub.";
      const mdExcerpt = (md) => {
        for (const raw of md.split("\n")) {
          const t = raw
            .trim()
            .replace(/^#+\s*/, "")
            .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
            .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
            .replace(/[*_`~>|]/g, "")
            .replace(/<[^>]*>/g, "")
            .trim();
          if (!t || /^(http|=|-{3,}|\*{3,})/.test(t)) continue;
          return t.length > 130 ? t.slice(0, 127) + "…" : t;
        }
        return "";
      };
      const fillFromReadme = async (el, name, branch) => {
        for (const file of ["README.md", "readme.md"]) {
          try {
            const res = await fetch(
              `https://raw.githubusercontent.com/Secret-gaming01/${name}/${branch}/${file}`
            );
            if (!res.ok) continue;
            const txt = mdExcerpt(await res.text()) || FALLBACK_DESC;
            el.textContent = txt;
            return;
          } catch {}
        }
        el.textContent = FALLBACK_DESC;
      };
      const ov = CONTENT.repoDesc || {};
      grid.innerHTML = repos
        .map((r) => {
          const custom = ov[r.name] ?? ov[String(r.name || "").toLowerCase()];
          return `
        <article class="project-card glass">
          <div class="card-body repo-body">
            <div class="repo-head">
              <h3><a href="${esc(r.html_url)}" target="_blank" rel="noopener">${esc(r.name)}</a></h3>
              ${r.language ? `<span class="lang-dot" style="background:${LANG_COLORS[r.language] || "#8b949e"}" title="${esc(r.language)}"></span>` : ""}
            </div>
            ${
              custom
                ? `<p>${esc(custom)}</p>`
                : r.description
                  ? `<p>${esc(r.description)}</p>`
                  : `<p data-rd-name="${esc(r.name)}" data-rd-branch="${esc(r.default_branch || "main")}"><span class="rd-pending">Lecture du README…</span></p>`
            }
            <ul class="tags">
              <li>★ ${r.stargazers_count}</li>
              <li>Maj ${new Date(r.updated_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</li>
            </ul>
          </div>
        </article>`;
        })
        .join("");
      $$("#repoGrid [data-rd-name]").forEach((el) => {
        fillFromReadme(el, el.dataset.rdName, el.dataset.rdBranch);
      });
    } catch {
      section.style.display = "none";
    }
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
      const res = await fetch("https://formsubmit.co/ajax/pro.secretgaming01@gmail.com", {
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

  function projectCard(p) {
    const demo = p.demoUrl
      ? `<a href="${esc(p.demoUrl)}" target="_blank" rel="noopener">Voir le projet</a>`
      : `<a href="#" data-soon>Voir le projet</a>`;
    const code = p.repoUrl
      ? `<a href="${esc(p.repoUrl)}" target="_blank" rel="noopener">Code source</a>`
      : `<a href="#" data-soon>Code source</a>`;
    return `
    <article class="project-card glass tilt reveal" data-cat="${esc(p.cat)}">
      <div class="thumb ${esc(p.thumb || "p1")}"></div>
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.short || "")}</p>
        <ul class="tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="card-links">${demo}${code}</div>
      </div>
    </article>`;
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
        $$("#projGrid .project-card").forEach((c) => {
          c.style.display = f === "all" || c.dataset.cat === f ? "" : "none";
        });
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

  function openModal(data) {
    if (!backdrop) return;
    lastFocus = document.activeElement;
    mKicker.textContent = data.kicker || "";
    mTitle.textContent = data.title || "";
    mDesc.textContent = data.desc || "";
    mStack.innerHTML = (data.stack || []).map((s) => `<li>${esc(s)}</li>`).join("");
    mFeats.innerHTML = (data.feats || []).map((f) => `<li>${esc(f)}</li>`).join("");
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    mClose.focus();
  }

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
    if (e.key === "Escape" && backdrop && !backdrop.hidden) closeModal();
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
        openModal(p);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(p);
        }
      });
    });
  }

  let logoClicks = 0;
  let logoTimer;
  $(".logo").addEventListener("click", () => {
    clearTimeout(logoTimer);
    logoClicks++;
    logoTimer = setTimeout(() => (logoClicks = 0), 1600);
    if (logoClicks === 5) {
      logoClicks = 0;
      showToast("Easter egg trouvé ! Le code est ouvert ;)");
    }
  });

  (async () => {
    await loadContent();
    renderSkills();
    setupSkillBars();
    renderMarquee();
    renderProjects();
    setupFilters();
    setupModals();
    startTyping();
  })();

  loadRepos();

  console.log(
    "%c SG_01 %c Portfolio — version finale. Curieux ? Jette un œil au code source ",
    "background:#00e5ff;color:#04121f;font-weight:bold;padding:4px 8px;border-radius:4px 0 0 4px",
    "color:#00e5ff;padding:4px 8px"
  );
})();
