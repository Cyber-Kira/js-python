const showMenu = (headerToggle, navbarId) =>{
    const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId)
    
    if(headerToggle && navbarId){
        toggleBtn.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')

            toggleBtn.classList.toggle('bx-x')
        });
    }
}
showMenu('header-toggle','navbar');

const linkColor = document.querySelectorAll('.nav__link');

function colorLink() {
    linkColor.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
}

linkColor.forEach(l => l.addEventListener('click', colorLink));

window.addEventListener("scroll", function() {
    if(window.scrollY > 45) {
        document.querySelector(".header").classList.add("white");
        document.querySelector(".header").classList.remove("transparent");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
        document.querySelector(".header").classList.remove("white");
        document.querySelector(".header").classList.add("transparent");
    }
});