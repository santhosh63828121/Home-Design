<?php
use App\Services\BusinessData;
$b = BusinessData::getBusiness();
$wa = BusinessData::whatsappLink("Hi RGL Decors, I'd like to book a free 3D design consultation.");
?>
<div style="position: fixed; bottom: 2rem; right: 2rem; z-index: 999; display: flex; flex-direction: column; gap: 0.75rem;">
  <!-- WhatsApp Button -->
  <a href="<?= e($wa) ?>" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style="width: 50px; height: 50px; border-radius: 50%; background-color: #25D366; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(37,211,102,0.4); transition: transform 0.3s ease;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  </a>

  <!-- Phone Call Button -->
  <a href="<?= e($b['nap']['tel']) ?>" aria-label="Call RGL Decors" style="width: 50px; height: 50px; border-radius: 50%; background-color: var(--accent); color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(94,103,70,0.4); transition: transform 0.3s ease;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  </a>
</div>
