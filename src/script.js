var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3, // Mostra 3 slides ao mesmo tempo
    spaceBetween: 20, // Espaço entre os slides
    centeredSlides: true, // Centraliza o slide ativo
    loop: true, // Faz o carrossel ser infinito
    autoplay: {
        delay: 2500, // Tempo em ms para a transição automática (2,5 segundos)
        disableOnInteraction: false, // Continua o autoplay mesmo depois da interação
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
