window.CINE_TEXTURES = (function () {
  function makeCanvas(size = 512) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    return c;
  }

  function finish(canvas, { repeat = 1, aniso = 1, srgb = true } = {}) {
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat, repeat);
    tex.anisotropy = aniso;
    tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    tex.needsUpdate = true;
    return tex;
  }

  function washes(g, size, count, colorFn, r0, r1) {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = r0 + Math.random() * (r1 - r0);
      const grd = g.createRadialGradient(x, y, 0, x, y, r);
      const col = colorFn();
      grd.addColorStop(0, col);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grd;
      g.fillRect(0, 0, size, size);
    }
  }

  return {
    marble: function (opts = {}) {
      const { base = '#f1ede6', vein = 'rgba(120,110,95,0.5)', size = 512, repeat = 1, aniso = 1 } = opts;
      const c = makeCanvas(size);
      const g = c.getContext('2d');
      g.fillStyle = base;
      g.fillRect(0, 0, size, size);
      washes(g, size, 22, () => 'rgba(255,255,255,0.06)', size * 0.2, size * 0.6);
      washes(g, size, 14, () => 'rgba(150,140,120,0.05)', size * 0.2, size * 0.5);
      const veinCount = 10;
      for (let i = 0; i < veinCount; i++) {
        g.beginPath();
        let x = Math.random() * size;
        let y = -10;
        g.moveTo(x, y);
        const steps = 28;
        for (let s = 0; s < steps; s++) {
          x += (Math.random() - 0.5) * size * 0.12;
          y += size / steps;
          g.lineTo(x, y);
        }
        g.strokeStyle = vein;
        g.lineWidth = 0.6 + Math.random() * 1.8;
        g.globalAlpha = 0.4 + Math.random() * 0.5;
        g.stroke();
        g.globalAlpha = 0.15;
        g.lineWidth = 0.5;
        g.stroke();
      }
      g.globalAlpha = 1;
      return finish(c, { repeat, aniso });
    },
    wood: function (opts = {}) {
      const { size = 512, repeat = 1 } = opts;
      const c = makeCanvas(size);
      const g = c.getContext('2d');
      const baseCol = opts.base || '#43301d';
      g.fillStyle = baseCol;
      g.fillRect(0, 0, size, size);
      for (let x = 0; x < size; x += 1) {
        const n = Math.sin(x * 0.06) * 0.5 + Math.sin(x * 0.21) * 0.3 + (Math.random() - 0.5) * 0.4;
        const l = 0.5 + n * 0.18;
        g.strokeStyle = `rgba(${Math.floor(90 * l)},${Math.floor(62 * l)},${Math.floor(36 * l)},0.5)`;
        g.beginPath();
        g.moveTo(x, 0);
        g.lineTo(x + (Math.random() - 0.5) * 4, size);
        g.stroke();
      }
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * size;
        g.strokeStyle = `rgba(20,12,6,${0.05 + Math.random() * 0.12})`;
        g.lineWidth = 0.5 + Math.random() * 1.5;
        g.beginPath();
        g.moveTo(x, 0);
        g.lineTo(x + (Math.random() - 0.5) * 8, size);
        g.stroke();
      }
      return finish(c, { repeat, aniso: opts.aniso || 1 });
    },
    fabric: function (opts = {}) {
      const { base = '#b3a692', size = 256, repeat = 1 } = opts;
      const c = makeCanvas(size);
      const g = c.getContext('2d');
      g.fillStyle = base;
      g.fillRect(0, 0, size, size);
      washes(g, size, 16, () => 'rgba(255,255,255,0.04)', size * 0.15, size * 0.5);
      washes(g, size, 10, () => 'rgba(80,70,55,0.05)', size * 0.15, size * 0.45);
      g.globalAlpha = 0.06;
      for (let i = 0; i < size; i += 3) {
        g.strokeStyle = '#ffffff';
        g.beginPath(); g.moveTo(0, i); g.lineTo(size, i); g.stroke();
        g.strokeStyle = '#000000';
        g.beginPath(); g.moveTo(i, 0); g.lineTo(i, size); g.stroke();
      }
      g.globalAlpha = 1;
      return finish(c, { repeat });
    },
    rug: function (opts = {}) {
      const { base = '#cdc4b4', size = 256, repeat = 1 } = opts;
      const c = makeCanvas(size);
      const g = c.getContext('2d');
      g.fillStyle = base;
      g.fillRect(0, 0, size, size);
      washes(g, size, 40, () => `rgba(255,255,255,${0.03 + Math.random() * 0.04})`, 10, 60);
      washes(g, size, 40, () => `rgba(90,80,65,${0.03 + Math.random() * 0.04})`, 10, 60);
      return finish(c, { repeat });
    },
    blackStone: function (opts = {}) {
      const { size = 512 } = opts;
      const c = makeCanvas(size);
      const g = c.getContext('2d');
      g.fillStyle = '#0e0d0c';
      g.fillRect(0, 0, size, size);
      washes(g, size, 16, () => `rgba(120,110,95,${0.04 + Math.random() * 0.05})`, size * 0.1, size * 0.4);
      washes(g, size, 8, () => 'rgba(200,190,170,0.04)', size * 0.05, size * 0.2);
      return finish(c, {});
    },
    shadowBlob: function () {
      const c = makeCanvas(128);
      const g = c.getContext('2d');
      const grd = g.createRadialGradient(64, 64, 3, 64, 64, 64);
      grd.addColorStop(0, 'rgba(0,0,0,0.5)');
      grd.addColorStop(0.6, 'rgba(0,0,0,0.22)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grd;
      g.fillRect(0, 0, 128, 128);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.NoColorSpace;
      return t;
    },
    artwork: function () {
      const w = 512, h = 700;
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const g = c.getContext('2d');
      g.fillStyle = '#efe9dd';
      g.fillRect(0, 0, w, h);
      g.fillStyle = '#e7dcc6';
      g.beginPath();
      g.moveTo(0, h * 0.1);
      g.bezierCurveTo(w * 0.3, h * 0.25, w * 0.2, h * 0.6, w * 0.55, h);
      g.lineTo(0, h);
      g.closePath(); g.fill();
      g.fillStyle = '#1f3148';
      g.beginPath();
      g.moveTo(w, h * 0.32);
      g.bezierCurveTo(w * 0.55, h * 0.34, w * 0.55, h * 0.62, w, h * 0.72);
      g.closePath(); g.fill();
      g.fillStyle = '#b08a4e';
      g.beginPath();
      g.moveTo(w * 0.6, h * 0.7);
      g.lineTo(w, h * 0.62);
      g.lineTo(w, h * 0.86);
      g.lineTo(w * 0.62, h * 0.9);
      g.closePath(); g.fill();
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }
  };
})();
