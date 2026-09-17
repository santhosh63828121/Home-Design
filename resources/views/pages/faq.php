<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Got Questions?</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Frequently Asked Questions</h1>
    <p class="text-lede" style="color: var(--muted);">
      Everything you need to know about pricing, warranties, material options, and our 45-day installation timeline.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell" style="max-width: 48rem;">
    <?php foreach ($categories as $cat): ?>
      <div style="margin-bottom: 3rem;">
        <h2 class="font-serif text-headline" style="margin-bottom: 1.5rem; color: var(--accent);"><?= e($cat['name']) ?></h2>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <?php foreach ($cat['faqs'] as $faq): ?>
            <details class="shadow-card" style="padding: 1.5rem; border-radius: 4px; cursor: pointer;">
              <summary class="font-serif text-title" style="font-size: 1.25rem; font-weight: 500; color: var(--ink); list-style: none; display: flex; justify-content: space-between; align-items: center;">
                <span><?= e($faq['q']) ?></span>
                <span style="color: var(--gold); font-size: 1.5rem;">+</span>
              </summary>
              <p style="color: var(--muted); line-height: 1.7; margin-top: 1rem; margin-bottom: 0;">
                <?= e($faq['a']) ?>
              </p>
            </details>
          <?php endforeach; ?>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</section>
