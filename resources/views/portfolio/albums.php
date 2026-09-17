<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Photo Albums</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Interior Design Photo Gallery</h1>
    <p class="text-lede" style="color: var(--muted);">
      High-resolution photography of modular kitchens, wardrobes, living room TV walls, and luxury bedrooms.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
      <?php foreach ($projects as $p): ?>
        <?php if (!empty($p['media']['gallery'])): ?>
          <?php foreach ($p['media']['gallery'] as $img): ?>
            <div class="shadow-card lux-media" style="border-radius: 4px; overflow: hidden;">
              <img src="<?= e($img['src']) ?>" alt="<?= e($img['alt']) ?>" style="width: 100%; height: 260px; object-fit: cover;">
              <div style="padding: 1rem; font-size: 0.85rem; color: var(--muted);" class="font-caps">
                <?= e($img['room'] ?? 'Interior Room') ?> • <?= e($p['title']) ?>
              </div>
            </div>
          <?php endforeach; ?>
        <?php endif; ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>
