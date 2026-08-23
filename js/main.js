(() => {
  "use strict";

  const $ = (s, e = document) => e.querySelector(s);
  const $$ = (s, e = document) => Array.from(e.querySelectorAll(s));

  $("#year").textContent = new Date().getFullYear();

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
        $$(".nav-links a").forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => spy.observe(s));

  const words = [
    "Développeur Web & C#",
    "Créateur d'expériences interactives",
    "Passionné de tech & gaming",
    "En train d'apprendre Rust"
  ];
  const typingEl = $("#typing");
  let wI = 0, cI = 0, deleting = false;
  function typeLoop() {
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
  }
  typeLoop();

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

  const canHover = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  if (canHover && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$(".tilt").forEach((el) => {
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
    });

    $$(".glass").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });

    const glow = $("#cursorGlow");
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

  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  $$("[data-soon]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Lien bientôt disponible — projet en cours !");
    })
  );

  class Ambient {
    constructor() { this.ctx = null; this.playing = false; }
    init() {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      const c = this.ctx;
      this.master = c.createGain();
      this.master.gain.value = 0;
      this.master.connect(c.destination);
      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 850;
      filter.Q.value = 0.7;
      filter.connect(this.master);
      [110, 164.81, 220, 329.63].forEach((f) => {
        const o = c.createOscillator();
        o.type = f > 200 ? "sine" : "triangle";
        o.frequency.value = f;
        o.detune.value = (Math.random() - 0.5) * 8;
        const g = c.createGain();
        g.gain.value = 0.16;
        o.connect(g);
        g.connect(filter);
        o.start();
      });
      const lfo = c.createOscillator();
      lfo.frequency.value = 0.07;
      const lfoGain = c.createGain();
      lfoGain.gain.value = 320;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
    }
    toggle() {
      if (!this.ctx) this.init();
      this.ctx.resume();
      const t = this.ctx.currentTime;
      this.playing = !this.playing;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setTargetAtTime(this.playing ? 0.055 : 0, t, 0.6);
      return this.playing;
    }
  }
  const ambient = new Ambient();
  const audioBtn = $("#audioToggle");
  audioBtn.addEventListener("click", () => {
    const on = ambient.toggle();
    audioBtn.classList.toggle("on", on);
    audioBtn.setAttribute("aria-pressed", String(on));
    audioBtn.setAttribute("aria-label", on ? "Couper le son ambiant" : "Activer le son ambiant");
    showToast(on ? "Son ambiant activé" : "Son ambiant coupé");
  });

  const NS = "portfoliosecretgaming01";
  const fmt = (n) => n.toLocaleString("fr-FR");
  async function fetchCount(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("counter");
    return parseInt(await res.text(), 10) || 0;
  }
  async function loadStats() {
    try {
      const firstVisit = !sessionStorage.getItem("sg_seen");
      sessionStorage.setItem("sg_seen", "1");
      const viewsUrl = `https://abacus.jasoncameron.dev/hit/${NS}/views`;
      const visitsUrl = firstVisit
        ? `https://abacus.jasoncameron.dev/hit/${NS}/visits`
        : `https://abacus.jasoncameron.dev/get/${NS}/visits`;
      const [views, visits] = await Promise.all([fetchCount(viewsUrl), fetchCount(visitsUrl)]);
      $("#statViews").textContent = fmt(views);
      $("#statVisits").textContent = fmt(visits);
    } catch {
      let v = parseInt(localStorage.getItem("sg_views") || "0", 10) + 1;
      localStorage.setItem("sg_views", String(v));
      $("#statViews").textContent = fmt(v);
      $("#statVisits").textContent = "1";
    }
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
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

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
      grid.innerHTML = repos
        .map(
          (r) => `
        <article class="project-card glass">
          <div class="card-body repo-body">
            <div class="repo-head">
              <h3><a href="${esc(r.html_url)}" target="_blank" rel="noopener">${esc(r.name)}</a></h3>
              ${r.language ? `<span class="lang-dot" style="background:${LANG_COLORS[r.language] || "#8b949e"}" title="${esc(r.language)}"></span>` : ""}
            </div>
            <p>${r.description ? esc(r.description) : "Pas encore de description."}</p>
            <ul class="tags">
              <li>★ ${r.stargazers_count}</li>
              <li>Maj ${new Date(r.updated_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</li>
            </ul>
          </div>
        </article>`
        )
        .join("");
    } catch {
      section.style.display = "none";
    }
  }
  loadRepos();

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
})();
