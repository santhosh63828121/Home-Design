<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <?= render_seo_tags($meta ?? []) ?>

  <link rel="icon" type="image/svg+xml" href="<?= url('icon.svg') ?>">
  <link rel="stylesheet" href="<?= asset('css/globals.css') ?>">
  <link rel="stylesheet" href="<?= asset('css/cinematic.css') ?>">
</head>
<body class="bg-background text-ink antialiased">
  <div id="scroll-progress-bar" style="position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--accent), var(--gold)); width: 0%; z-index: 10000; transition: width 0.1s linear;"></div>

  <?php component('navbar'); ?>

  <main id="main-content">
    <?= $content ?? '' ?>
  </main>

  <?php component('footer'); ?>
  <?php component('floating_contact'); ?>

  <script src="<?= asset('js/cursor.js') ?>" defer></script>
  <script src="<?= asset('js/magnetic.js') ?>" defer></script>
  <script src="<?= asset('js/scroll_progress.js') ?>" defer></script>
  <script src="<?= asset('js/reveal.js') ?>" defer></script>
</body>
</html>
