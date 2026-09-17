<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Complete Interior Scope</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Our Services Taxonomy</h1>
    <p class="text-lede" style="color: var(--muted);">
      <?= e($positioning) ?>
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell">
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <?php foreach ($groups as $g): ?>
        <div class="shadow-card" style="padding: 3rem; border-radius: 4px;">
          <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1rem;">
            <span class="font-serif text-gold" style="font-size: 2rem; font-weight: 500;"><?= e($g['letter']) ?>.</span>
            <h2 class="font-serif text-headline" style="margin: 0; color: var(--ink);"><?= e($g['name']) ?></h2>
          </div>
          <p style="color: var(--muted); font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem; max-width: 44rem;"><?= e($g['body']) ?></p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <?php foreach ($g['items'] as $item): ?>
              <div style="padding: 0.75rem 1rem; background: var(--bone); border-radius: 4px; font-size: 0.9rem; color: var(--ink);">
                <?php if (isset($item['slug'])): ?>
                  <a href="<?= url('/services/' . $item['slug']) ?>" style="color: var(--accent); font-weight: 500;" class="hover:underline">
                    ✓ <?= e($item['name']) ?> →
                  </a>
                <?php else: ?>
                  ✓ <?= e($item['name']) ?>
                <?php endif; ?>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
