(async () => {
  const canvas = document.getElementById("bg3d");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 400);
  camera.position.z = 64;

  const group = new THREE.Group();
  scene.add(group);

  function makeGlowTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grd.addColorStop(0, "rgba(147,197,253,0.55)");
    grd.addColorStop(0.25, "rgba(147,197,253,0.22)");
    grd.addColorStop(0.6, "rgba(191,219,254,0.10)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
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

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(4.4, 48, 48),
    new THREE.MeshBasicMaterial({ color: 0xbfdbfe })
  );
  group.add(core);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(7.4, 1),
    new THREE.MeshBasicMaterial({ color: 0x93c5fd, wireframe: true, transparent: true, opacity: 0.16 })
  );
  group.add(shell);

  const ringDefs = [
    { r: 11.2, tube: 0.09, color: 0x93c5fd, tilt: [Math.PI / 2.15, 0, 0], opacity: 0.24 },
    { r: 14, tube: 0.07, color: 0x3b82f6, tilt: [Math.PI / 2.6, 0.5, 0.4], opacity: 0.19 },
    { r: 16.8, tube: 0.055, color: 0xbfdbfe, tilt: [Math.PI / 1.9, -0.4, 0.7], opacity: 0.15 }
  ];
  const rings = ringDefs.map((d) => {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(d.r, d.tube, 10, 150),
      new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: d.opacity })
    );
    m.rotation.set(d.tilt[0], d.tilt[1], d.tilt[2]);
    group.add(m);
    return m;
  });

  const electronDefs = [
    { d: 9.2, s: 0.42, c: 0x3b82f6, rx: 1.1, rz: 0.3, sp: 0.018 },
    { d: 10.4, s: 0.34, c: 0x93c5fd, rx: 2.05, rz: -0.5, sp: -0.014 },
    { d: 11.6, s: 0.28, c: 0xbfdbfe, rx: 1.55, rz: 0.95, sp: 0.01 }
  ];
  const electrons = electronDefs.map((def) => {
    const pivot = new THREE.Object3D();
    pivot.rotation.set(def.rx, Math.random() * Math.PI * 2, def.rz);
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(def.s, 16, 16),
      new THREE.MeshBasicMaterial({ color: def.c })
    );
    m.position.x = def.d;
    pivot.add(m);
    group.add(pivot);
    return { pivot, sp: def.sp };
  });

  const isMobile = () => window.innerWidth < 768;
  const count = isMobile() ? 250 : 550;
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
      color: 0x9ca3af,
      size: 1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  scene.add(points);

  const mouse = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

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
  });

  const clock = new THREE.Clock();
  let running = true;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true;
      clock.getDelta();
      animate();
    }
  });

  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    const pulse = 1 + Math.sin(t * 0.7) * 0.02;
    core.scale.setScalar(pulse);
    halo.material.opacity = 0.32 + Math.sin(t * 0.7) * 0.04;
    halo.scale.setScalar(34 + Math.sin(t * 0.7) * 1.2);

    shell.rotation.y += 0.0006;
    shell.rotation.x += 0.0003;

    rings[0].rotation.z += 0.0009;
    rings[1].rotation.z -= 0.0007;
    rings[1].rotation.x += 0.0002;
    rings[2].rotation.z += 0.0004;
    rings[2].rotation.y -= 0.00015;
    rings.forEach((r, i) => {
      r.material.opacity = ringDefs[i].opacity * (0.85 + 0.08 * Math.sin(t * 0.7 + i * 2));
    });

    electrons.forEach((e) => {
      e.pivot.rotation.y += e.sp * 0.55;
    });

    points.rotation.y += 0.00016;

    camera.position.x += (mouse.x * 2.4 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 1.8 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();
})();
