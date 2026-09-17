<section class="section-y bg-bone">
  <div class="shell" style="max-width: 48rem;">
    <span class="eyebrow">Service Location</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Interior Designers in <?= e($location['name']) ?></h1>
    <p class="text-lede" style="color: var(--muted); margin-bottom: 2rem;">
      <?= e($location['intro']) ?>
    </p>
    <a href="<?= url('/get-free-quote') ?>" class="btn-pill btn-gold">
      <span>Book Site Visit in <?= e($location['name']) ?> →</span>
    </a>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell" style="max-width: 48rem;">
    <div class="shadow-card" style="padding: 3rem; border-radius: 4px; margin-bottom: 3rem;">
      <h2 class="font-serif text-title" style="margin-bottom: 1rem;">Housing & Architecture in <?= e($location['name']) ?></h2>
      <p style="color: var(--muted); line-height: 1.7; margin-bottom: 2rem;">
        <?= e($location['housing']) ?>
      </p>

      <h3 class="font-caps text-xs text-accent uppercase" style="letter-spacing: 0.2em; margin-bottom: 1rem;">Localities Covered</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        <?php foreach ($location['areas'] as $area): ?>
          <span style="padding: 0.5rem 1rem; background: var(--bone); border-radius: 999px; font-size: 0.85rem; color: var(--ink);">
            📍 <?= e($area) ?>
          </span>
        <?php endforeach; ?>
      </div>

      <?php if (!empty($location['nearby'])): ?>
        <p style="color: var(--muted); font-size: 0.9rem; font-style: italic; margin: 0;"><?= e($location['nearby']) ?></p>
      <?php endif; ?>
    </div>

    <!-- Location FAQs -->
    <?php if (!empty($location['faqs'])): ?>
      <h2 class="font-serif text-headline" style="margin-bottom: 1.5rem;">Frequently Asked Questions in <?= e($location['name']) ?></h2>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <?php foreach ($location['faqs'] as $faq): ?>
          <details class="shadow-card" style="padding: 1.5rem; border-radius: 4px; cursor: pointer;">
            <summary class="font-serif text-title" style="font-size: 1.2rem; font-weight: 500; color: var(--ink); list-style: none; display: flex; justify-content: space-between; align-items: center;">
              <span><?= e($faq['q']) ?></span>
              <span style="color: var(--gold); font-size: 1.5rem;">+</span>
            </summary>
            <p style="color: var(--muted); line-height: 1.7; margin-top: 1rem; margin-bottom: 0;">
              <?= e($faq['a']) ?>
            </p>
          </details>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
</section>
