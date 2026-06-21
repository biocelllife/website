document.addEventListener("click", event => {
const hamburger = event.target.closest("#hamburger");

if(hamburger){
const navMenu = document.getElementById("nav-menu");

if(!navMenu){
return;
}

navMenu.classList.toggle("open");

const expanded = hamburger.getAttribute("aria-expanded") === "true";

hamburger.setAttribute("aria-expanded", String(!expanded));
return;
}

const dropdownLink = event.target.closest(".dropdown > a");

if(dropdownLink && window.innerWidth <= 768){
event.preventDefault();
dropdownLink.parentElement.classList.toggle("open");
}
});
