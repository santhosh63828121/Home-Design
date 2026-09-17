<?php
use App\Services\BusinessData;
use App\Services\LocationData;

$b = BusinessData::getBusiness();
$socials = BusinessData::getSocials();
$cities = LocationData::getCities();
?>
<footer style="background-color: var(--olive-deep); color: #FFFFFF; padding-top: 5rem; padding-bottom: 3rem;" class="font-sans">
  <div class="shell">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 3rem; margin-bottom: 4rem;">
      <!-- Col 1: Brand Info -->
      <div>
        <h3 class="font-serif" style="font-size: 1.8rem; color: var(--gold); margin-bottom: 1rem; font-weight: 400;"><?= e($b['brand']) ?></h3>
        <p style="color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          <?= e($b['taglineLong']) ?>
        </p>
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
          <?php foreach ($socials as $s): ?>
            <a href="<?= e($s['url']) ?>" target="_blank" rel="noopener noreferrer" style="color: var(--gold); font-size: 0.85rem;" class="font-caps hover:underline">
              <?= e($s['name']) ?>
            </a>
          <?php endforeach; ?>
        </div>
        <p style="color: rgba(255,255,255,0.6); font-size: 0.85rem;">
          📍 <?= e($b['nap']['addressLocality']) ?>, <?= e($b['nap']['addressRegion']) ?> | 📞 <?= e($b['nap']['phoneDisplay']) ?>
        </p>
      </div>

      <!-- Col 2: Services -->
      <div>
        <h4 class="font-caps" style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem;">Services</h4>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem; color: rgba(255,255,255,0.8);">
          <li><a href="<?= url('/services/modular-kitchen-chennai') ?>" class="hover:text-gold transition-colors">Modular Kitchens</a></li>
          <li><a href="<?= url('/services/wardrobe-design-chennai') ?>" class="hover:text-gold transition-colors">Wardrobe Designs</a></li>
          <li><a href="<?= url('/services/tv-units-chennai') ?>" class="hover:text-gold transition-colors">TV & Media Units</a></li>
          <li><a href="<?= url('/services/bedroom-interior-chennai') ?>" class="hover:text-gold transition-colors">Bedroom Interiors</a></li>
          <li><a href="<?= url('/3d-walkthrough') ?>" class="hover:text-gold transition-colors">3D Walkthrough</a></li>
          <li><a href="<?= url('/services') ?>" class="hover:text-gold transition-colors" style="color: var(--gold);">View All 15 Services →</a></li>
        </ul>
      </div>

      <!-- Col 3: Company -->
      <div>
        <h4 class="font-caps" style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem;">Company</h4>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem; color: rgba(255,255,255,0.8);">
          <li><a href="<?= url('/about') ?>" class="hover:text-gold transition-colors">About Us</a></li>
          <li><a href="<?= url('/process') ?>" class="hover:text-gold transition-colors">45-Day Process</a></li>
          <li><a href="<?= url('/portfolio') ?>" class="hover:text-gold transition-colors">Portfolio</a></li>
          <li><a href="<?= url('/interior-design-cost-chennai') ?>" class="hover:text-gold transition-colors">Pricing & Cost</a></li>
          <li><a href="<?= url('/careers') ?>" class="hover:text-gold transition-colors">Careers</a></li>
          <li><a href="<?= url('/contact') ?>" class="hover:text-gold transition-colors">Contact Us</a></li>
        </ul>
      </div>

      <!-- Col 4: Locations -->
      <div>
        <h4 class="font-caps" style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem;">Locations</h4>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem; color: rgba(255,255,255,0.8);">
          <?php foreach ($cities as $c): ?>
            <li><a href="<?= url('/' . $c['slug']) ?>" class="hover:text-gold transition-colors">Interiors in <?= e($c['name']) ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>

      <!-- Col 5: Legal -->
      <div>
        <h4 class="font-caps" style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.25rem;">Legal</h4>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem; color: rgba(255,255,255,0.8);">
          <li><a href="<?= url('/privacy-policy') ?>" class="hover:text-gold transition-colors">Privacy Policy</a></li>
          <li><a href="<?= url('/terms-and-conditions') ?>" class="hover:text-gold transition-colors">Terms & Conditions</a></li>
          <li><a href="<?= url('/cancellation-refund-policy') ?>" class="hover:text-gold transition-colors">Cancellation & Refund</a></li>
          <li><a href="<?= url('/warranty') ?>" class="hover:text-gold transition-colors">Warranty Terms</a></li>
          <li><a href="<?= url('/gst-policy') ?>" class="hover:text-gold transition-colors">GST Policy</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; font-size: 0.85rem; color: rgba(255,255,255,0.6);">
      <p>© <?= date('Y') ?> <?= e($b['legalName']) ?>. All rights reserved.</p>
      <p>Designed with Quiet-Luxury Aesthetics in Chennai, Tamil Nadu.</p>
    </div>
  </div>
</footer>
