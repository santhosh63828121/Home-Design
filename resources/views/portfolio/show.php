<section class="section-y bg-bone">
  <div class="shell" style="max-width: 48rem;">
    <span class="eyebrow"><?= e($project['client']) ?> • <?= e($project['space']) ?></span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;"><?= e($project['title']) ?></h1>
    <p class="text-lede" style="color: var(--muted); margin-bottom: 2rem;"><?= e($project['scope']) ?></p>

    <div style="display: flex; gap: 2rem; padding: 1.25rem 0; border-top: 1px solid var(--divider); border-bottom: 1px solid var(--divider);">
      <div>
        <span class="font-caps text-xs text-muted uppercase">Style</span>
        <div style="font-weight: 500; color: var(--ink); margin-top: 0.2rem;"><?= e($project['style']) ?></div>
      </div>
      <div>
        <span class="font-caps text-xs text-muted uppercase">Budget Band</span>
        <div style="font-weight: 500; color: var(--ink); margin-top: 0.2rem;"><?= e($project['budgetBand']) ?></div>
      </div>
    </div>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell" style="max-width: 56rem;">
    <!-- Gallery Grid -->
    <?php if (!empty($project['media']['gallery'])): ?>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
        <?php foreach ($project['media']['gallery'] as $img): ?>
          <div class="shadow-card" style="border-radius: 4px; overflow: hidden;">
            <img src="<?= e($img['src']) ?>" alt="<?= e($img['alt']) ?>" style="width: 100%; height: 320px; object-fit: cover;">
            <div style="padding: 1rem; background: #FFF; font-size: 0.85rem; color: var(--muted);" class="font-caps">
              📍 <?= e($img['room'] ?? 'Interior Room') ?> — <?= e($img['alt']) ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

    <!-- Media Disclosure Note -->
    <div style="padding: 1.5rem; background: var(--bone); border-left: 3px solid var(--gold); font-size: 0.85rem; color: var(--muted); line-height: 1.6;">
      <?= e(\App\Services\PortfolioData::PORTFOLIO_MEDIA_NOTE) ?>
    </div>
  </div>
</section>
