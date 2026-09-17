window.ScrollController = class ScrollController {
  constructor() {
    this.enabled = true;
  }

  init() {
    return this;
  }

  get velocity() {
    return 0;
  }

  scrollTo(target) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  stop() {}
  start() {}
  destroy() {}
};
