<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Client Feedback</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Stories From Transformed Homes</h1>
    <p class="text-lede" style="color: var(--muted);">
      Read how homeowners across Chennai experienced our 45-day turnkey delivery, 3D walkthrough precision, and factory quality.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem;">
      <?php foreach ($reviews as $rev): ?>
        <div class="shadow-card" style="padding: 2.5rem; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="color: var(--gold); font-size: 1.25rem; margin-bottom: 1rem;">★★★★★</div>
            <p class="font-serif text-title" style="font-size: 1.25rem; font-style: italic; line-height: 1.6; color: var(--ink); margin-bottom: 1.5rem;">
              "<?= e($rev['quote']) ?>"
            </p>
          </div>
          <div style="border-top: 1px solid var(--divider); padding-top: 1rem;">
            <div style="font-weight: 600; color: var(--ink);"><?= e($rev['name']) ?></div>
            <div class="font-caps text-xs text-muted" style="margin-top: 0.2rem;"><?= e($rev['project']) ?> • <?= e($rev['location']) ?></div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
