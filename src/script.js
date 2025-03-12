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

// Responsável pelo ano atual no footer
document.addEventListener("DOMContentLoaded", function () {
    // Obtém o ano atual
    const anoAtual = new Date().getFullYear();

    // Seleciona o <span> com a classe 'ano'
    const spanAno = document.querySelector(".ano");

    // Verifica se o elemento existe antes de modificar
    if (spanAno) {
        spanAno.textContent = anoAtual;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add('animate');
});

// Responsável pelo envio do Formulário
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Previne o envio padrão e recarregamento da página

    // Objeto mapeando o formulário
    let formData = {
        nome: document.querySelector("input[name='nome']").value,
        email: document.querySelector("input[name='email']").value,
        telefone: document.querySelector("input[name='telefone']").value,
        servico: document.querySelector("select[name='servico']").value,
        orcamento: document.querySelector("input[name='orcamento']").value,
        mensagem: document.querySelector("textarea[name='mensagem']").value,
        origem: document.querySelector("select[name='origem']").value
    };

    // Metodo fetch usado para enviar ou buscar dados no servidor
    // await espera a resposta do servidor antes de continuar com o código
    let response = await fetch("https://localhost:5001/api/contato", {
        method: "POST", // Metodo para enviar dados
        headers: { "Content-Type": "application/json" }, // Informando ao servidor que usaremos o formato Json
        body: JSON.stringify(formData) // Converte o objeto para uma string JSON
    });

    let result = await response.json(); // Metodo json converte a resposta do servidor em objeto JS

    alert(result.mensagem); //  Exibe o valor da chave mensagem devolvida pelo servidor
});