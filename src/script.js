var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu ul');
console.log("O script.js foi carregado e está sendo executado!");

hamburger.addEventListener('click', () => {
    console.log("Botão do menu clicado"); // Teste no console
    menu.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", function(){
    // Obtém o ano atual
    const anoAtual = new Date().getFullYear();

    // Seleciona o <span> com a classe 'ano'
    const spanAno = document.querySelector(".ano");

    // Verifica se o elemento existe antes de modificar
    if (spanAno) {
        spanAno.textContent = anoAtual;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('animate');
});