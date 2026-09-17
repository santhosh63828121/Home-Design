<section class="section-y bg-bone">
  <div class="shell" style="max-width: 48rem;">
    <span class="eyebrow"><?= e($post['category']) ?> • Published <?= e(date('F j, Y', strtotime($post['date']))) ?></span>
    <h1 class="text-headline font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem; font-size: clamp(2rem, 4vw, 3rem); line-height: 1.15;"><?= e($post['title']) ?></h1>
    <p class="text-lede" style="color: var(--muted); margin-bottom: 2rem;"><?= e($post['description']) ?></p>

    <div style="border-radius: 4px; overflow: hidden; margin-bottom: 3rem;">
      <img src="<?= e($post['cover']) ?>" alt="<?= e($post['coverAlt']) ?>" style="width: 100%; max-height: 480px; object-fit: cover;">
    </div>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell" style="max-width: 48rem;">
    <article class="prose max-w-none">
      <?= $post['html'] ?>
    </article>

    <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--divider); text-align: center;">
      <a href="<?= url('/blog') ?>" class="btn-pill btn-ghost">← Back to All Articles</a>
    </div>
  </div>
</section>
