const panels = document.querySelectorAll(".panel");
const syncSection = document.getElementById("scroll-section");
const syncItems = document.querySelectorAll(".text-item");
const syncImages = document.querySelectorAll(".image-container img");

function updatePanels() {
  panels.forEach((panel) => {
    const rect = panel.getBoundingClientRect();
    const progress = 1 - Math.abs(rect.top / window.innerHeight);
    const offset = rect.top * 0.15;

    panel.classList.toggle("active", progress > 0.5);
    panel.style.setProperty("--parallax", `${offset}px`);
  });
}

function updateSyncScroll() {
  if (!syncSection || syncItems.length === 0 || syncImages.length === 0) {
    return;
  }

  const rect = syncSection.getBoundingClientRect();
  const scrollable = Math.max(syncSection.offsetHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
  const lastIndex = Math.min(syncItems.length, syncImages.length) - 1;
  const activeIndex = Math.min(lastIndex, Math.round(progress * lastIndex));

  syncItems.forEach((item, index) => {
    item.classList.toggle("active", index === activeIndex);
  });

  syncImages.forEach((image, index) => {
    image.classList.toggle("active", index === activeIndex);
  });
}

function handleScrollEffects() {
  updatePanels();
  updateSyncScroll();
}

window.addEventListener("scroll", handleScrollEffects, { passive: true });
window.addEventListener("resize", handleScrollEffects);
window.addEventListener("load", handleScrollEffects);

handleScrollEffects();
