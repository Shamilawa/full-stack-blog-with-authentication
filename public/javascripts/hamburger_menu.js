const hamburger = document.querySelector(".hamburger-menu");
const mainMenu = document.querySelector(".main-menu");


hamburger.addEventListener("click", function(){
    hamburger.classList.toggle("active");
    mainMenu.classList.toggle("active");
})

// Make the main menu remove when the any page link click
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function(){
        hamburger.classList.remove("active");
        mainMenu.classList.remove("active");
    })
});
