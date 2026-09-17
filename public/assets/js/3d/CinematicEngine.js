window.CinematicEngine = class CinematicEngine {
  constructor({ canvas, onProgress, onReady }) {
    this.canvas = canvas;
    this.onProgress = onProgress;
    this.onReady = onReady;
  }

  init() {
    this.scroll = new window.ScrollController().init();
    this.house = new window.HouseScene(this.canvas, window.CINE_CONFIG);
    this.house.init();

    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      this.house.setProgress(progress);
      if (this.onProgress) this.onProgress(progress);
    }, { passive: true });

    window.addEventListener('resize', () => this.house.resize(), { passive: true });

    if (this.onReady) this.onReady();
  }

  scrollTo(target) {
    this.scroll.scrollTo(target);
  }

  destroy() {
    if (this.house) this.house.dispose();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('walkthrough-canvas');
  if (canvas && typeof window.HouseScene !== 'undefined') {
    const engine = new window.CinematicEngine({
      canvas: canvas,
      onReady: () => {
        canvas.style.opacity = '1';
      }
    });
    engine.init();
  }
});
