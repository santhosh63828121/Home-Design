<section class="section-y bg-bone">
  <div class="shell" style="max-width: 48rem;">
    <span class="eyebrow"><?= e($service['group_name'] ?? 'Service Specification') ?></span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;"><?= e($service['name']) ?></h1>
    <p class="text-lede" style="color: var(--muted); margin-bottom: 2rem;">
      Custom <?= strtolower(e($service['name'])) ?> designed for Chennai homes — precision factory cutting, 360° edge-banding, and soft-close hardware.
    </p>
    <a href="<?= url('/get-free-quote') ?>" class="btn-pill btn-olive">
      <span>Request 3D Design & Quote →</span>
    </a>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell" style="max-width: 48rem;">
    <div class="shadow-card" style="padding: 3rem; border-radius: 4px;">
      <h2 class="font-serif text-title" style="margin-bottom: 1rem;">Why Choose RGL For <?= e($service['name']) ?></h2>
      <ul style="display: flex; flex-direction: column; gap: 1rem; padding-left: 1.25rem; color: var(--muted); line-height: 1.7;">
        <li>Precision manufacturing in an automated factory for zero-defect edge-banding.</li>
        <li>BWP Plywood and HDHMR substrates engineered specifically for coastal Chennai humidity.</li>
        <li>5-year warranty on branded hardware (Hettich, Hafele, Blum).</li>
        <li>Included in your complimentary HD 3D walkthrough before production starts.</li>
      </ul>
    </div>
  </div>
</section>
