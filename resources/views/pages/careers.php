<section class="section-y bg-bone">
  <div class="shell" style="text-align: center; max-width: 48rem;">
    <span class="eyebrow">Join Our Team</span>
    <h1 class="text-display font-serif" style="margin-top: 1rem; margin-bottom: 1.5rem;">Careers at RGL Decors</h1>
    <p class="text-lede" style="color: var(--muted);">
      We are always looking for talented interior designers, 3D visualisers, site engineers, and project managers in Chennai.
    </p>
  </div>
</section>

<section class="section-y bg-background">
  <div class="shell" style="max-width: 44rem;">
    <div class="shadow-card" style="padding: 3rem; border-radius: 4px;">
      <h2 class="font-serif text-title" style="margin-bottom: 1.5rem;">Submit Your Application</h2>
      <form action="<?= url('/api/careers/submit') ?>" method="POST" enctype="multipart/form-data" style="display: flex; flex-direction: column; gap: 1.25rem;">
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
          <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Role Applied For *</label>
          <select name="role" required style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px; background: #FFF;">
            <option value="Interior Designer">Interior Designer</option>
            <option value="3D Visualiser">3D Visualiser</option>
            <option value="Project Manager / Site Engineer">Project Manager / Site Engineer</option>
            <option value="Sales & Client Relationship Manager">Sales & Client Relationship Manager</option>
          </select>
        </div>

        <div>
          <label class="font-caps text-xs text-muted uppercase" style="display: block; margin-bottom: 0.5rem;">Cover Note / Experience Summary</label>
          <textarea name="message" rows="3" style="width: 100%; padding: 0.875rem; border: 1px solid var(--divider); border-radius: 4px;"></textarea>
        </div>

        <button type="submit" class="btn-pill btn-olive" style="margin-top: 1rem;">
          <span>Submit Resume</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </form>
    </div>
  </div>
</section>
