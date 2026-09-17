<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Our Work</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Interior Design Portfolio</h1>
    <p class="text-lede" style="color: var(--muted);">
      Detailed storyboards of completed residential and commercial projects across Chennai.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem;">
      <?php foreach ($projects as $p): ?>
        <a href="<?= url('/portfolio/' . $p['slug']) ?>" class="shadow-card lux-media" style="display: block; border-radius: 4px; overflow: hidden; text-decoration: none;">
          <?php if (!empty($p['media']['cover']['src'])): ?>
            <img src="<?= e($p['media']['cover']['src']) ?>" alt="<?= e($p['media']['cover']['alt']) ?>" style="width: 100%; height: 280px; object-fit: cover;">
          <?php endif; ?>
          <div style="padding: 2rem;">
            <span class="eyebrow" style="color: var(--gold-ink);"><?= e($p['space']) ?> • <?= e($p['style']) ?> • <?= e($p['budgetBand']) ?></span>
            <h3 class="font-serif" style="font-size: 1.6rem; margin: 0.5rem 0; color: var(--ink);"><?= e($p['title']) ?></h3>
            <p style="color: var(--muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;"><?= e($p['summary']) ?></p>
            <span style="color: var(--accent); font-weight: 500;" class="font-caps text-sm">Read Full Case Study →</span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
