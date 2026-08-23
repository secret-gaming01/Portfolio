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
    grd.addColorStop(0, "rgba(150,245,255,0.85)");
    grd.addColorStop(0.25, "rgba(59,130,246,0.32)");
    grd.addColorStop(0.6, "rgba(124,58,237,0.10)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(),
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  halo.scale.setScalar(36);
  group.add(halo);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(4.4, 48, 48),
    new THREE.MeshBasicMaterial({ color: 0xc4f5ff })
  );
  group.add(core);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(7.4, 1),
    new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.26 })
  );
  group.add(shell);

  const ringDefs = [
    { r: 11.2, tube: 0.09, color: 0x00e5ff, tilt: [Math.PI / 2.15, 0, 0], opacity: 0.55 },
    { r: 14, tube: 0.07, color: 0x3b82f6, tilt: [Math.PI / 2.6, 0.5, 0.4], opacity: 0.45 },
    { r: 16.8, tube: 0.055, color: 0x8b5cf6, tilt: [Math.PI / 1.9, -0.4, 0.7], opacity: 0.38 }
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

  const isMobile = () => window.innerWidth < 768;
  const count = isMobile() ? 700 : 1500;
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
      color: 0x86d8ff,
      size: 1.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
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

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    const pulse = 1 + Math.sin(t * 1.5) * 0.045;
    core.scale.setScalar(pulse);
    halo.material.opacity = 0.72 + Math.sin(t * 1.5) * 0.16;
    halo.scale.setScalar(36 + Math.sin(t * 1.5) * 3);

    shell.rotation.y += 0.0016;
    shell.rotation.x += 0.0007;

    rings[0].rotation.z += 0.0022;
    rings[1].rotation.z -= 0.0016;
    rings[1].rotation.x += 0.0005;
    rings[2].rotation.z += 0.0011;
    rings[2].rotation.y -= 0.0004;

    points.rotation.y += 0.0004;

    camera.position.x += (mouse.x * 6 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();
})();
