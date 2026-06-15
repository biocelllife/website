const steps = document.querySelectorAll('.step');

const observer = new IntersectionObserver(
(entries) => {
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add('visible');
}
});
},
{
threshold:0.4
}
);

steps.forEach(step=>{
observer.observe(step);
});

const form = document.getElementById('contactForm');
const success = document.getElementById('successMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Replace with Formspree, Netlify, EmailJS, or backend endpoint
    success.classList.add('show');

    form.reset();

    setTimeout(() => {
        success.classList.remove('show');
    }, 5000);
});