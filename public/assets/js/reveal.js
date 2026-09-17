document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal-item, .section-reveal, .plate-rule');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
});
