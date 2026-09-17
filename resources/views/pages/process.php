<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">How We Work</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">The 45-Day Execution Process</h1>
    <p class="text-lede" style="color: var(--muted);">
      Factory precision meets on-site efficiency. Here is how your dream home moves from concept to handover.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell">
    <div style="display: flex; flex-direction: column; gap: 2.5rem; max-width: 48rem; margin: 0 auto;">
      <?php foreach ($steps as $st): ?>
        <div class="shadow-card" style="padding: 2.5rem; display: flex; gap: 2rem; align-items: flex-start; border-radius: 4px;">
          <span class="font-serif text-gold" style="font-size: 3rem; line-height: 1; flex-shrink: 0;"><?= e($st['step']) ?></span>
          <div>
            <h3 class="font-serif text-title" style="margin-bottom: 0.5rem; color: var(--ink);"><?= e($st['title']) ?></h3>
            <p style="color: var(--muted); line-height: 1.7; margin: 0;"><?= e($st['description']) ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
