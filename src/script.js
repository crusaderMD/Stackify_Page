document.addEventListener("DOMContentLoaded", function () {
    // Verifica se o Swiper foi carregado
    if (typeof Swiper === "undefined") {
        console.error("Swiper.js não foi carregado corretamente!");
        return;
    }

    // Inicializa o Swiper
    const swiper = new Swiper('.mySwiper', {
        loop: true,  // Loop infinito
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,  // Intervalo entre slides
            disableOnInteraction: false,
        },
    });
});
