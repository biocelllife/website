const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
navMenu.classList.toggle("open");

const expanded =
hamburger.getAttribute("aria-expanded") === "true" || false;

hamburger.setAttribute("aria-expanded", !expanded);
});

/* mobile dropdown */

document.querySelectorAll(".dropdown > a").forEach(link=>{
link.addEventListener("click", function(e){

if(window.innerWidth <= 768){
e.preventDefault();
this.parentElement.classList.toggle("open");
}

});
});