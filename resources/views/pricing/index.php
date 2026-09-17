<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Transparent Pricing</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Interior Design Cost Guide</h1>
    <p class="text-lede" style="color: var(--muted);">
      Itemised package ranges, cost calculator, and sq.ft rates for Chennai home interiors with zero hidden costs.
    </p>
  </div>
</section>

<!-- Package Grid -->
<section class="section-y bg-background">
  <div class="shell">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2.5rem;">
      <?php foreach ($packages as $pkg): ?>
        <div class="shadow-card" style="padding: 2.5rem; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 class="font-serif text-title" style="margin-bottom: 0.5rem; color: var(--ink);"><?= e($pkg['name']) ?></h3>
            <p style="color: var(--muted); font-size: 0.9rem; margin-bottom: 1.5rem;"><?= e($pkg['scope']) ?></p>
            <div class="font-serif text-accent" style="font-size: 2rem; font-weight: 500; margin-bottom: 1.5rem;">
              <?= \App\Services\PricingData::priceLabel($pkg['range']) ?>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <span class="font-caps text-xs text-accent font-bold uppercase">Included:</span>
              <ul style="list-style: none; padding: 0; margin: 0.5rem 0 0; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: var(--muted);">
                <?php foreach ($pkg['included'] as $inc): ?>
                  <li>✓ <?= e($inc) ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
          </div>

          <a href="<?= url('/get-free-quote') ?>" class="btn-pill btn-olive" style="width: 100%; justify-content: center;">
            <span>Get Detailed Quote →</span>
          </a>
        </div>
      <?php endforeach; ?>
    </div>

    <div style="margin-top: 3rem; text-align: center; font-size: 0.85rem; color: var(--muted);">
      <?= e(\App\Services\PricingData::PRICING_FOOTNOTE) ?>
    </div>
  </div>
</section>

<!-- Sub-pages quick links -->
<section class="section-y bg-bone">
  <div class="shell" style="text-align: center;">
    <h2 class="font-serif text-headline" style="margin-bottom: 2rem;">Explore Specific Cost Guides</h2>
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem;">
      <a href="<?= url('/modular-kitchen-price-chennai') ?>" class="btn-pill btn-ghost">Modular Kitchen Price →</a>
      <a href="<?= url('/2bhk-interior-cost-chennai') ?>" class="btn-pill btn-ghost">2BHK Interior Cost →</a>
      <a href="<?= url('/3bhk-interior-cost-chennai') ?>" class="btn-pill btn-ghost">3BHK Interior Cost →</a>
    </div>
  </div>
</section>
