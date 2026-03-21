
// SCROLL STORY CONTROL
const panels = document.querySelectorAll('.scroll-panel');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const stage = document.querySelector('.scroll-stage');
  if (!stage) return;

  const start = stage.offsetTop;
  const height = stage.offsetHeight;

  const progress = (scrollY - start) / height;

  panels.forEach((panel, i) => {
    const point = i / panels.length;
    const nextPoint = (i + 1) / panels.length;

    if (progress >= point && progress < nextPoint) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });
});


// IMAGE REVEAL OBSERVER
const revealImgs = document.querySelectorAll('.image-reveal');

const imgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
});

revealImgs.forEach(img => imgObserver.observe(img));

const steps = document.querySelectorAll('.sync-step');
const images = document.querySelectorAll('.sync-image img');

window.addEventListener('scroll', () => {
  const section = document.querySelector('.scroll-sync');
  if (!section) return;

  const rect = section.getBoundingClientRect();
  const progress = -rect.top / rect.height;

  const index = Math.min(
    steps.length - 1,
    Math.max(0, Math.floor(progress * steps.length))
  );

  steps.forEach((s, i) => s.classList.toggle('active', i === index));
  images.forEach((img, i) => img.classList.toggle('active', i === index));
});

const slider = document.querySelector('.compare-slider');
if (slider) {
  const after = slider.querySelector('.after');
  const handle = slider.querySelector('.handle');

  slider.addEventListener('mousemove', e => {
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;

    after.style.width = x + 'px';
    handle.style.left = x + 'px';
  });
}