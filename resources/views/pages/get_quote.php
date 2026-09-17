<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Free Consultation & Quote</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Estimate Your Interior Project</h1>
    <p class="text-lede" style="color: var(--muted);">
      Fill in your home details to receive a free site measurement session, 3D walkthrough, and itemised quotation.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell" style="max-width: 44rem;">
    <div class="shadow-card" style="padding: 3rem; border-radius: 4px;">
      <form action="<?= url('/api/leads/submit') ?>" method="POST" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <?= csrf_field() ?>
        <input type="hidden" name="source" value="get-free-quote">

        <div>
          <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Home Type / Scope *</label>
          <select name="homeType" required style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px; background: #FFF;">
            <option value="2BHK Apartment">2BHK Apartment</option>
            <option value="3BHK Apartment">3BHK Apartment</option>
            <option value="Modular Kitchen Only">Modular Kitchen Only</option>
            <option value="Independent Villa / House">Independent Villa / House</option>
            <option value="Commercial / Office Fit-out">Commercial / Office Fit-out</option>
          </select>
        </div>

        <div>
          <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Location / City *</label>
          <input type="text" name="city" placeholder="e.g. Chennai (Velachery / OMR)" required style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
        </div>

        <div>
          <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Target Budget Range</label>
          <select name="budget" style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px; background: #FFF;">
            <option value="From ₹50,000 (Kitchen Only)">From ₹50,000 (Kitchen Only)</option>
            <option value="₹3.5 - ₹6 Lakhs (Essentials)">₹3.5 - ₹6 Lakhs (Essentials)</option>
            <option value="₹6 - ₹12 Lakhs (Premium)">₹6 - ₹12 Lakhs (Premium)</option>
            <option value="₹12 Lakhs+ (Luxury Turnkey)">₹12 Lakhs+ (Luxury Turnkey)</option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Full Name *</label>
            <input type="text" name="name" required style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
          </div>
          <div>
            <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Phone Number *</label>
            <input type="tel" name="phone" required style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
          </div>
        </div>

        <div>
          <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Email Address *</label>
          <input type="email" name="email" required style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;">
        </div>

        <div>
          <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Project Details / Requirements</label>
          <textarea name="message" rows="3" placeholder="Tell us about your home floor plan or key requirements..." style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;"></textarea>
        </div>

        <button type="submit" class="btn-pill btn-gold" style="margin-top: 1rem; width: 100%; justify-content: center;">
          <span>Submit Request & Get Free 3D Design</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </form>
    </div>
  </div>
</section>
