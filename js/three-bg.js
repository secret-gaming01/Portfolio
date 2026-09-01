(async () => {
  const canvas = document.getElementById("bg3d");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    canvas.style.display = "none";
    return;
  }

  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency <= 4 || /Mobi|Android/i.test(navigator.userAgent);
  const isSmallScreen = window.innerWidth < 480;

  if (isLowEnd && isSmallScreen) {
    canvas.style.display = "none";
    return;
  }

  let THREE;
  try {
    THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");
  } catch (e) {
    canvas.style.display = "none";
    return;
  }

  const quality = isLowEnd ? 0.5 : isMobile ? 0.75 : 1;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isLowEnd,
    powerPreference: isLowEnd ? "low-power" : "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowEnd ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 400);
  camera.position.z = 64;

  const group = new THREE.Group();
  scene.add(group);

  function makeGlowTexture() {
    const size = isLowEnd ? 128 : 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const g = c.getContext("2d");
    const half = size / 2;
    const grd = g.createRadialGradient(half, half, 0, half, half, half);
    grd.addColorStop(0, "rgba(79,142,255,0.70)");
    grd.addColorStop(0.25, "rgba(110,168,254,0.20)");
    grd.addColorStop(0.6, "rgba(180,210,254,0.08)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(),
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  halo.scale.setScalar(34);
  group.add(halo);

  const coreSegments = isLowEnd ? 24 : 48;
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(4.4, coreSegments, coreSegments),
    new THREE.MeshBasicMaterial({ color: 0xa7c3e6 })
  );
  group.add(core);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(7.4, isLowEnd ? 0 : 1),
    new THREE.MeshBasicMaterial({ color: 0x84a8e0, wireframe: true, transparent: true, opacity: 0.14 })
  );
  group.add(shell);

  const ringsToUse = isLowEnd ? 2 : 3;
  const ringDefs = [
    { r: 11.2, tube: 0.09, color: 0x84a8e0, tilt: [Math.PI / 2.15, 0, 0], opacity: 0.20 },
    { r: 14, tube: 0.07, color: 0x6b93d6, tilt: [Math.PI / 2.6, 0.5, 0.4], opacity: 0.16 },
    { r: 16.8, tube: 0.055, color: 0xa7c3e6, tilt: [Math.PI / 1.9, -0.4, 0.7], opacity: 0.12 }
  ].slice(0, ringsToUse);
  const torusSegs = isLowEnd ? 8 : 10;
  const torusRadSegs = isLowEnd ? 60 : 150;
  const rings = ringDefs.map((d) => {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(d.r, d.tube, torusSegs, torusRadSegs),
      new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: d.opacity })
    );
    m.rotation.set(d.tilt[0], d.tilt[1], d.tilt[2]);
    group.add(m);
    return m;
  });

  const electronsToUse = isLowEnd ? 2 : 3;
  const electronDefs = [
    { d: 9.2, s: 0.42, c: 0x6b93d6, rx: 1.1, rz: 0.3, sp: 0.018 },
    { d: 10.4, s: 0.34, c: 0x84a8e0, rx: 2.05, rz: -0.5, sp: -0.014 },
    { d: 11.6, s: 0.28, c: 0xa7c3e6, rx: 1.55, rz: 0.95, sp: 0.01 }
  ].slice(0, electronsToUse);
  const eSegs = isLowEnd ? 8 : 16;
  const electrons = electronDefs.map((def) => {
    const pivot = new THREE.Object3D();
    pivot.rotation.set(def.rx, Math.random() * Math.PI * 2, def.rz);
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(def.s, eSegs, eSegs),
      new THREE.MeshBasicMaterial({ color: def.c })
    );
    m.position.x = def.d;
    pivot.add(m);
    group.add(pivot);
    return { pivot, sp: def.sp };
  });

  const count = isMobile ? (isLowEnd ? 100 : 200) : (isLowEnd ? 300 : 550);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 140;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({
      color: 0x84a8e0,
      size: isMobile ? 0.8 : 1,
      sizeAttenuation: true,
      transparent: true,
      opacity: isLowEnd ? 0.20 : 0.30,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  scene.add(points);

  let mouseX = 0, mouseY = 0;
  if (!isMobile) {
    window.addEventListener("pointermove", (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });
  }

  function layout() {
    const wide = window.innerWidth > 960;
    group.position.x = wide ? 17 : 0;
    group.position.y = wide ? 0 : 9;
    group.scale.setScalar(wide ? 1 : 0.66);
  }
  layout();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    layout();
  }, { passive: true });

  const clock = new THREE.Clock();
  let running = true;
  let frameId;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
    } else if (!running) {
      running = true;
      clock.getDelta();
      animate();
    }
  });

  const lerpFactor = isLowEnd ? 0.012 : 0.02;
  const rotSpeed = isLowEnd ? 0.4 : 1;

  function animate() {
    if (!running) return;
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    const pulse = 1 + Math.sin(t * 0.7) * 0.02;
    core.scale.setScalar(pulse);
    halo.material.opacity = 0.32 + Math.sin(t * 0.7) * 0.04;
    halo.scale.setScalar(34 + Math.sin(t * 0.7) * 1.2);

    shell.rotation.y += 0.0006 * rotSpeed;
    shell.rotation.x += 0.0003 * rotSpeed;

    rings.forEach((r, i) => {
      const def = ringDefs[i];
      if (i === 0) r.rotation.z += 0.0009 * rotSpeed;
      else if (i === 1) { r.rotation.z -= 0.0007 * rotSpeed; r.rotation.x += 0.0002 * rotSpeed; }
      else { r.rotation.z += 0.0004 * rotSpeed; r.rotation.y -= 0.00015 * rotSpeed; }
      r.material.opacity = def.opacity * (0.85 + 0.08 * Math.sin(t * 0.7 + i * 2));
    });

    electrons.forEach((e) => {
      e.pivot.rotation.y += e.sp * 0.55 * rotSpeed;
    });

    points.rotation.y += 0.00016 * rotSpeed;

    camera.position.x += (mouseX * 2.4 - camera.position.x) * lerpFactor;
    camera.position.y += (mouseY * 1.8 - camera.position.y) * lerpFactor;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();
})();
