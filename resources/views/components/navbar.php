<?php
use App\Services\BusinessData;
use App\Services\ServiceData;

$b = BusinessData::getBusiness();
$services = ServiceData::getServiceGroups();
?>
<header style="position: sticky; top: 0; z-index: 1000; width: 100%;" class="glass">
  <div class="shell" style="display: flex; align-items: center; justify-content: space-between; height: 80px;">
    <!-- Brand Logo -->
    <a href="<?= url('/') ?>" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#5E6746"/>
        <path d="M12 28V12H20C23.3137 12 26 14.6863 26 18C26 21.3137 23.3137 24 20 24H12" stroke="#C5A572" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M20 24L26 28" stroke="#C5A572" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      <div style="display: flex; flex-direction: column;">
        <span class="font-serif" style="font-size: 1.35rem; font-weight: 600; letter-spacing: 0.05em; color: var(--ink); line-height: 1;">RGL DÉCORS</span>
        <span class="font-caps" style="font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); margin-top: 3px;"><?= e($b['tagline']) ?></span>
      </div>
    </a>

    <!-- Desktop Navigation -->
    <nav style="display: flex; align-items: center; gap: 2rem;" class="font-caps">
      <a href="<?= url('/') ?>" class="lux-underline" style="font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;">Home</a>
      <a href="<?= url('/about') ?>" class="lux-underline" style="font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;">About Us</a>
      
      <!-- Services Mega Dropdown trigger -->
      <div style="position: relative;" class="nav-dropdown-group">
        <a href="<?= url('/services') ?>" class="lux-underline" style="font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; display: flex; align-items: center; gap: 4px;">
          Services ▾
        </a>
      </div>

      <a href="<?= url('/portfolio') ?>" class="lux-underline" style="font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;">Portfolio</a>
      <a href="<?= url('/interior-design-cost-chennai') ?>" class="lux-underline" style="font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;">Pricing</a>
      <a href="<?= url('/blog') ?>" class="lux-underline" style="font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;">Blogs</a>
      <a href="<?= url('/contact') ?>" class="lux-underline" style="font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;">Contact</a>
    </nav>

    <!-- Header CTA -->
    <div style="display: flex; align-items: center; gap: 1rem;">
      <a href="<?= url('/get-free-quote') ?>" class="btn-pill btn-olive">
        <span>Get Free Quote</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</header>
