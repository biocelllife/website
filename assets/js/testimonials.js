const slides = document.querySelectorAll('.testimonial-slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let current = 0;
let autoSlide;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slides[index].classList.add('active');
}

function nextSlide() {
    current++;

    if (current >= slides.length) {
        current = 0;
    }

    showSlide(current);
}

function prevSlide() {
    current--;

    if (current < 0) {
        current = slides.length - 1;
    }

    showSlide(current);
}

function startAutoSlide() {
    autoSlide = setInterval(() => {
        nextSlide();
    }, 7000);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

startAutoSlide();