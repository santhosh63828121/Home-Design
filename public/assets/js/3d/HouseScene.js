window.HouseScene = class HouseScene {
  constructor(canvas, cfg) {
    this.canvas = canvas;
    this.rooms = cfg.rooms;
    this.journey = cfg.journey;
    this.path = new window.CameraPath(cfg.waypoints);
    this.disposed = false;
    this.curT = this.targetT = 0;
    this._pos = new THREE.Vector3();
    this._look = new THREE.Vector3();
  }

  init() {
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer = renderer;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0c0a07');
    this.scene.fog = new THREE.Fog('#0c0a07', 15, 60);

    this.camera = new THREE.PerspectiveCamera(this.journey.perspectiveFov, 1, 0.1, 200);

    // Build procedural lights & house floorplan
    const amb = new THREE.AmbientLight('#fff3df', 0.8);
    this.scene.add(amb);

    const dir = new THREE.DirectionalLight('#ffe2b0', 1.8);
    dir.position.set(10, 20, 15);
    this.scene.add(dir);

    // Procedural room floors
    const floorGeo = new THREE.PlaneGeometry(30, 40);
    const floorMat = new THREE.MeshStandardMaterial({ color: '#2a241e', roughness: 0.4 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(5, 0, -10);
    this.scene.add(floor);

    // Load GLB models if GLTFLoader is available
    if (typeof THREE.GLTFLoader !== 'undefined') {
      const loader = new THREE.GLTFLoader();
      loader.load('/models/sofa.glb', (gltf) => {
        gltf.scene.position.set(-0.7, 0, -13.8);
        gltf.scene.scale.set(1.5, 1.5, 1.5);
        this.scene.add(gltf.scene);
      });
      loader.load('/models/chair.glb', (gltf) => {
        gltf.scene.position.set(-2.0, 0, -11.3);
        gltf.scene.scale.set(1.2, 1.2, 1.2);
        this.scene.add(gltf.scene);
      });
    }

    this.resize();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const w = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
    const h = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  setProgress(t) {
    this.targetT = Math.max(0, Math.min(1, t));
  }

  jumpTo(t) {
    this.curT = this.targetT = t;
  }

  setVisible(v) {}

  animate() {
    if (this.disposed) return;
    requestAnimationFrame(() => this.animate());

    this.curT += (this.targetT - this.curT) * 0.08;
    this.path.sample(this.curT, this._pos, this._look);

    this.camera.position.copy(this._pos);
    this.camera.lookAt(this._look);

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
  }
};
