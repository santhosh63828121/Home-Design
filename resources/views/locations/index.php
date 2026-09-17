<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Service Locations</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Interior Designers Near You</h1>
    <p class="text-lede" style="color: var(--muted);">
      We design and install factory-built modular interiors across Chennai and key cities in Tamil Nadu.
    </p>
  </div>
</section>

<!-- Tamil Nadu Cities -->
<section class="section-y bg-background">
  <div class="shell">
    <h2 class="font-serif text-headline" style="margin-bottom: 2rem;">Major Cities in Tamil Nadu</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
      <?php foreach ($cities as $c): ?>
        <a href="<?= url('/' . $c['slug']) ?>" class="shadow-card" style="padding: 2rem; border-radius: 4px; display: block; text-decoration: none;">
          <h3 class="font-serif text-title" style="margin-bottom: 0.5rem; color: var(--ink);"><?= e($c['name']) ?></h3>
          <p style="color: var(--muted); font-size: 0.9rem; margin-bottom: 1rem;"><?= e($c['tagline']) ?></p>
          <span style="color: var(--accent); font-weight: 500;" class="font-caps text-sm">View Location Details →</span>
        </a>
      <?php endforeach; ?>
    </div>

    <!-- Chennai Suburbs -->
    <h2 class="font-serif text-headline" style="margin-bottom: 2rem;">Chennai Neighborhoods & Suburbs</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
      <?php foreach ($suburbs as $sub): ?>
        <a href="<?= url('/' . $sub['slug']) ?>" class="shadow-card" style="padding: 2rem; border-radius: 4px; display: block; text-decoration: none;">
          <h3 class="font-serif text-title" style="margin-bottom: 0.5rem; color: var(--ink);"><?= e($sub['name']) ?></h3>
          <p style="color: var(--muted); font-size: 0.9rem; margin-bottom: 1rem;"><?= e($sub['tagline']) ?></p>
          <span style="color: var(--accent); font-weight: 500;" class="font-caps text-sm">Explore <?= e($sub['name']) ?> Services →</span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
