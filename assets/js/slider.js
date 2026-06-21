const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = Array.from(slider.querySelectorAll("[data-slide]"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const intervalTime = 6500;
  const transitionTime = 1400;

  let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains("active")));
  let autoplayId = null;
  let fadeTimeoutId = null;

  function render() {
    slides.forEach((slide, index) => {
      const isActive = index === current;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
  }

  function nextSlide() {
    const previous = current;
    current = (current + 1) % slides.length;

    if (!prefersReducedMotion.matches && previous !== current) {
      window.clearTimeout(fadeTimeoutId);
      slides[previous].classList.add("leaving");
      fadeTimeoutId = window.setTimeout(() => {
        slides[previous].classList.remove("leaving");
      }, transitionTime);
    }

    render();
  }

  function startAutoplay() {
    stopAutoplay();

    if (!prefersReducedMotion.matches && slides.length > 1) {
      autoplayId = window.setInterval(nextSlide, intervalTime);
    }
  }

  function stopAutoplay() {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function handleReducedMotionChange() {
    render();
    startAutoplay();
  }

  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
  });

  if (prefersReducedMotion.addEventListener) {
    prefersReducedMotion.addEventListener("change", handleReducedMotionChange);
  } else if (prefersReducedMotion.addListener) {
    prefersReducedMotion.addListener(handleReducedMotionChange);
  }

  render();
  startAutoplay();
}
