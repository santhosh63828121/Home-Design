<!-- Hero Section -->
<section class="cine-hero relative overflow-hidden bg-ink text-white" style="min-height: 90vh; display: flex; align-items: center;">
  <div class="shell relative z-10 section-y">
    <div style="max-width: 44rem;">
      <span class="eyebrow hero-rise" style="--d: 100ms; color: var(--gold);">★ 45-Day Guaranteed Move-In</span>
      <h1 class="font-serif hero-rise text-display-xl" style="--d: 250ms; margin: 1rem 0 1.5rem; color: #FFFFFF; font-weight: 300;">
        Dreams <br><span style="color: var(--gold); font-style: italic;">Delivered.</span>
      </h1>
      <p class="hero-fade text-lede" style="--d: 400ms; color: rgba(255,255,255,0.85); margin-bottom: 2.5rem; max-width: 36rem;">
        Complete turnkey home interiors in Chennai — designed, factory-engineered, and installed under one accountable roof with photoreal 3D walkthroughs.
      </p>
      <div class="hero-fade" style="--d: 550ms; display: flex; flex-wrap: wrap; gap: 1.25rem;">
        <a href="<?= url('/get-free-quote') ?>" class="btn-pill btn-gold">
          <span>Book Free Site Visit</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="<?= url('/3d-walkthrough') ?>" class="btn-pill btn-ghost" style="color: #FFFFFF; border-color: rgba(255,255,255,0.3);">
          <span>Experience 3D Walkthrough</span>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Trust Ribbon / Stats Bar -->
<section class="bg-bone section-y-sm" style="border-bottom: 1px solid var(--divider);">
  <div class="shell">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 2rem; text-align: center;">
      <?php foreach ($stats as $st): ?>
        <div>
          <div class="font-serif" style="font-size: 3rem; font-weight: 500; color: var(--accent); line-height: 1;">
            <?= e($st['value']) ?><?= e($st['suffix'] ?? '') ?>
          </div>
          <div class="font-caps" style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-top: 0.5rem;">
            <?= e($st['label']) ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 8 USPs Grid -->
<section class="section-y bg-background">
  <div class="shell">
    <div style="text-align: center; max-width: 36rem; margin: 0 auto 4rem;">
      <span class="eyebrow">Why Homeowners Choose RGL</span>
      <h2 class="text-headline font-serif" style="margin-top: 0.75rem;">Crafted For Longevity & Precision</h2>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem;">
      <?php foreach ($usps as $usp): ?>
        <div class="shadow-card" style="padding: 2rem; border-radius: 4px;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--olive-wash); color: var(--accent); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <h3 class="font-serif" style="font-size: 1.35rem; margin-bottom: 0.75rem; color: var(--ink);"><?= e($usp['title']) ?></h3>
          <p style="color: var(--muted); font-size: 0.95rem; line-height: 1.6; margin: 0;"><?= e($usp['description']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Services Split -->
<section class="section-y bg-bone">
  <div class="shell">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem;">
      <div>
        <span class="eyebrow">Our Capabilities</span>
        <h2 class="text-headline font-serif" style="margin-top: 0.75rem;">Full-Home Interior Solutions</h2>
      </div>
      <a href="<?= url('/services') ?>" class="btn-pill btn-ghost">View All Services →</a>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
      <?php foreach (array_slice($services, 0, 4) as $g): ?>
        <div class="shadow-card" style="padding: 2.5rem; background: #FFFFFF;">
          <span class="font-serif" style="font-size: 2.5rem; color: var(--gold); display: block; margin-bottom: 1rem;"><?= e($g['letter']) ?></span>
          <h3 class="font-serif" style="font-size: 1.6rem; margin-bottom: 1rem;"><?= e($g['name']) ?></h3>
          <p style="color: var(--muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;"><?= e($g['body']) ?></p>
          <a href="<?= url('/services') ?>" style="color: var(--accent); font-weight: 500;" class="font-caps text-sm hover:underline">Explore Scope →</a>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Featured Projects -->
<section class="section-y bg-background">
  <div class="shell">
    <div style="text-align: center; max-width: 36rem; margin: 0 auto 4rem;">
      <span class="eyebrow">Recent Work</span>
      <h2 class="text-headline font-serif" style="margin-top: 0.75rem;">Featured Case Studies</h2>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem;">
      <?php foreach ($featuredProjects as $p): ?>
        <a href="<?= url('/portfolio/' . $p['slug']) ?>" class="shadow-card lux-media" style="display: block; border-radius: 4px; overflow: hidden; text-decoration: none;">
          <?php if (!empty($p['media']['cover']['src'])): ?>
            <img src="<?= e($p['media']['cover']['src']) ?>" alt="<?= e($p['media']['cover']['alt']) ?>" style="width: 100%; height: 260px; object-fit: cover;">
          <?php endif; ?>
          <div style="padding: 2rem;">
            <span class="eyebrow" style="color: var(--gold-ink);"><?= e($p['space']) ?> • <?= e($p['style']) ?></span>
            <h3 class="font-serif" style="font-size: 1.5rem; margin: 0.5rem 0; color: var(--ink);"><?= e($p['title']) ?></h3>
            <p style="color: var(--muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;"><?= e($p['summary']) ?></p>
            <span style="color: var(--accent); font-weight: 500;" class="font-caps text-sm">View Story →</span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
