<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">RGL Referral Program</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Refer & Earn Rewards</h1>
    <p class="text-lede" style="color: var(--muted);">
      Refer your friends, family, or colleagues in Chennai to RGL Decors and receive attractive cash rewards upon project sign-off.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell" style="max-width: 44rem;">
    <div class="shadow-card" style="padding: 3rem; border-radius: 4px;">
      <h2 class="font-serif text-title" style="margin-bottom: 1.5rem;">Submit A Referral</h2>
      <form action="<?= url('/api/leads/submit') ?>" method="POST" style="display: flex; flex-direction: column; gap: 1.25rem;">
        <?= csrf_field() ?>
        <input type="hidden" name="source" value="referral-program">

        <h3 class="font-caps text-xs text-accent uppercase">Your Information</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <input type="text" name="referrer_name" placeholder="Your Name *" required style="padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
          <input type="tel" name="referrer_phone" placeholder="Your Phone *" required style="padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
        </div>

        <h3 class="font-caps text-xs text-accent uppercase" style="margin-top: 1rem;">Referral's Information</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <input type="text" name="name" placeholder="Friend's Name *" required style="padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
          <input type="tel" name="phone" placeholder="Friend's Phone *" required style="padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
        </div>
        <input type="email" name="email" placeholder="Friend's Email *" required style="padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
        
        <textarea name="message" rows="2" placeholder="Property details / location of your friend's home..." style="padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;"></textarea>

        <button type="submit" class="btn-pill btn-gold" style="margin-top: 1rem;">
          <span>Submit Referral →</span>
        </button>
      </form>
    </div>
  </div>
</section>
