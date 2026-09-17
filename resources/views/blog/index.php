<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Interior Design Insights</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Blogs & Cost Guides</h1>
    <p class="text-lede" style="color: var(--muted);">
      Expert advice on Chennai home interiors, material selection, pricing breakdowns, and Vastu planning.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem;">
      <?php foreach ($posts as $p): ?>
        <a href="<?= url('/blog/' . $p['slug']) ?>" class="shadow-card lux-media" style="display: block; border-radius: 4px; overflow: hidden; text-decoration: none;">
          <img src="<?= e($p['cover']) ?>" alt="<?= e($p['coverAlt']) ?>" style="width: 100%; height: 240px; object-fit: cover;">
          <div style="padding: 2rem;">
            <span class="eyebrow" style="color: var(--gold-ink);"><?= e($p['category']) ?> • <?= e(date('M j, Y', strtotime($p['date']))) ?></span>
            <h3 class="font-serif" style="font-size: 1.4rem; margin: 0.5rem 0; color: var(--ink); line-height: 1.3;"><?= e($p['title']) ?></h3>
            <p style="color: var(--muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.25rem;"><?= e($p['description']) ?></p>
            <span style="color: var(--accent); font-weight: 500;" class="font-caps text-sm">Read Article →</span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
