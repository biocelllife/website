const panels = document.querySelectorAll('.panel');

window.addEventListener('scroll', () => {
  panels.forEach((panel) => {
    const rect = panel.getBoundingClientRect();
    const progress = 1 - Math.abs(rect.top / window.innerHeight);

    if (progress > 0.5) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }

    // parallax background movement
    const bg = panel.querySelector('::before'); // conceptual
    const offset = rect.top * 0.15;
    panel.style.setProperty('--parallax', `${offset}px`);
  });
});

gsap.registerPlugin(ScrollTrigger);

const items = document.querySelectorAll('.text-item');
const images = document.querySelectorAll('.image-container img');

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    snap: 1 / (items.length - 1), // snapping
  }
});

items.forEach((item, i) => {
  tl.to({}, {
    duration: 1,
    onUpdate: () => {
      items.forEach((el, index) => {
        el.classList.toggle('active', index === i);
        images[index].classList.toggle('active', index === i);
      });
    }
  });
});