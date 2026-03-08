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