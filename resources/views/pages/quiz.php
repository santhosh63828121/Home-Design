<?php
use App\Services\QuizData;
$questions = QuizData::getQuestions();
?>
<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Design Language Finder</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Find Your Design Style</h1>
    <p class="text-lede" style="color: var(--muted);">
      A 2-minute quiz that translates how you live into a curated material palette and room layout.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell" style="max-width: 44rem;">
    <div class="shadow-card" style="padding: 3rem; border-radius: 4px;">
      <form action="<?= url('/get-free-quote') ?>" method="GET" style="display: flex; flex-direction: column; gap: 2rem;">
        <?php foreach ($questions as $q): ?>
          <div>
            <h3 class="font-serif text-title" style="margin-bottom: 1rem;"><?= e($q['id']) ?>. <?= e($q['question']) ?></h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <?php foreach ($q['options'] as $opt): ?>
                <label style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border: 1px solid var(--divider); border-radius: 4px; cursor: pointer;" class="hover:bg-bone transition-colors">
                  <input type="radio" name="q_<?= e($q['id']) ?>" value="<?= e($opt['style']) ?>" required>
                  <span style="font-size: 0.95rem; color: var(--ink);"><?= e($opt['label']) ?></span>
                </label>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endforeach; ?>

        <button type="submit" class="btn-pill btn-gold" style="margin-top: 1rem;">
          <span>Get Your Style Recommendation →</span>
        </button>
      </form>
    </div>
  </div>
</section>
