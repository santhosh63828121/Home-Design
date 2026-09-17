<?php
use App\Services\BusinessData;
$b = BusinessData::getBusiness();
?>
<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Get In Touch</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Contact Our Design Studio</h1>
    <p class="text-lede" style="color: var(--muted);">
      Have a question or ready to discuss your home interior project? Send us a message or call our Chennai studio.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 4rem;">
      <!-- Contact Form -->
      <div class="shadow-card" style="padding: 3rem; border-radius: 4px;">
        <h2 class="font-serif text-title" style="margin-bottom: 1.5rem;">Send Us A Message</h2>
        <form action="<?= url('/api/contact/submit') ?>" method="POST" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <?= csrf_field() ?>
          
          <div>
            <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Full Name *</label>
            <input type="text" name="name" required style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Email Address *</label>
              <input type="email" name="email" required style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
            </div>
            <div>
              <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Phone Number *</label>
              <input type="tel" name="phone" required style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
            </div>
          </div>

          <div>
            <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Subject</label>
            <input type="text" name="subject" placeholder="e.g. 2BHK Interior Enquiry" style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
          </div>

          <div>
            <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Your Message *</label>
            <textarea name="message" rows="4" required style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;"></textarea>
          </div>

          <button type="submit" class="btn-pill btn-olive" style="margin-top: 1rem;">
            <span>Send Message</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </form>
      </div>

      <!-- Studio Details & Direct Desks -->
      <div>
        <h2 class="font-serif text-title" style="margin-bottom: 1.5rem;">Studio & Direct Lines</h2>
        
        <div style="margin-bottom: 2.5rem; line-height: 1.8; color: var(--muted);">
          <p style="margin-bottom: 0.5rem;"><strong style="color: var(--ink);">Primary Inbox:</strong> <?= e($b['nap']['email']) ?></p>
          <p style="margin-bottom: 0.5rem;"><strong style="color: var(--ink);">Secondary Email:</strong> <?= e($b['nap']['emailSecondary']) ?></p>
          <p style="margin-bottom: 0.5rem;"><strong style="color: var(--ink);">Operating Hours:</strong> <?= e($b['nap']['hoursLabel']) ?></p>
          <p style="margin-bottom: 0.5rem;"><strong style="color: var(--ink);">Location:</strong> <?= e($b['nap']['addressLocality']) ?>, <?= e($b['nap']['addressRegion']) ?> - <?= e($b['nap']['postalCode']) ?></p>
        </div>

        <h3 class="font-caps text-xs text-accent uppercase" style="letter-spacing: 0.2em; margin-bottom: 1rem;">Department Contact Desks</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <?php foreach ($b['contacts']['departments'] as $dept): ?>
            <div style="padding: 1rem; background: var(--bone); border-radius: 4px; border-left: 3px solid var(--gold);">
              <span class="font-caps text-xs text-gold-ink font-bold uppercase"><?= e($dept['role']) ?></span>
              <div style="font-weight: 500; color: var(--ink); margin-top: 0.2rem;"><?= e($dept['name']) ?></div>
              <a href="mailto:<?= e($dept['email']) ?>" style="font-size: 0.85rem; color: var(--accent);" class="hover:underline"><?= e($dept['email']) ?></a>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>
