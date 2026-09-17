<section class="cine-track">
  <div class="cinematic cine-hero">
    <div class="cine-hero-webgl w-full h-full relative">
      <canvas id="walkthrough-canvas" class="cinematic__fx w-full h-full"></canvas>

      <!-- Overlay scene annotations -->
      <div class="scene__content scene__content--hero scene__content--left">
        <span class="scene__eyebrow">3D Interactive Experience</span>
        <h1 class="scene__title scene__title--hero">Walk Through Your Dream Home</h1>
        <p class="scene__body">Scroll to move the camera through our living, kitchen, and bedroom scenes rendered live in 3D WebGL.</p>
        <a href="<?= url('/get-free-quote') ?>" class="scene__cta">Book Free 3D Design Session →</a>
      </div>

      <!-- HUD scroll progress -->
      <div class="cinematic__progress"><span id="cine-progress-bar" style="transform: scaleX(0);"></span></div>
      <div class="cinematic__hint" id="cine-scroll-hint"><span>Scroll to Walk</span><span>↓</span></div>
    </div>

    <!-- Static fallback for mobile / low-end devices -->
    <div class="cine-hero-static cinematic--static">
      <div class="cinematic__staticInner">
        <span class="scene__eyebrow">3D Interactive Experience</span>
        <h1 class="cinematic__staticTitle">Walk Through Your Dream Home</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 1.5rem 0 2rem; line-height: 1.7;">
          Experience an immersive 3D walkthrough of your living room, modular kitchen, and master bedroom before a single piece of wood is cut.
        </p>
        <a href="<?= url('/get-free-quote') ?>" class="btn-pill btn-gold">Book Free 3D Design Session →</a>
      </div>
    </div>
  </div>
</section>

<!-- Include Three.js & GLTFLoader / RGBELoader from CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/RGBELoader.js"></script>

<!-- Include 3D Engine scripts -->
<script src="<?= asset('js/3d/config.js') ?>"></script>
<script src="<?= asset('js/3d/textures.js') ?>"></script>
<script src="<?= asset('js/3d/CameraPath.js') ?>"></script>
<script src="<?= asset('js/3d/HouseScene.js') ?>"></script>
<script src="<?= asset('js/3d/ScrollController.js') ?>"></script>
<script src="<?= asset('js/3d/CinematicEngine.js') ?>"></script>
