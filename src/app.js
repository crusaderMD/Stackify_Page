document.addEventListener("DOMContentLoaded", function () {
    // DOMContentLoade - o código só roda depois que toda a estrutura HTML for carregada
    const sections = document.querySelectorAll(".section");
    // querySelectorAll(".section") pega todas as seções do site que possuem a classe .section
    // criando uma lista de elementos que podemos manipular depois.

    function loadSection(section) {
        // função será chamada quando uma seção entrar na tela para carregar seu conteúdo
        const url = section.getAttribute("data-section");
        // cada seção tem um atributo data-section que indica o arquivo HTML correspondente
        if (!section.dataset.loaded) {
            // usa dataset.loaded para verificar se a seção já foi carregada antes
            fetch(url) // fetch(url) busca o conteúdo do arquivo HTML correspondente
                .then(response => response.text()) // response.text() transforma a resposta em texto HTML
                .then(data => { // data recebido é o HTML que será usado na seção
                    section.innerHTML = data; // coloca esse HTML dentro da seção
                    section.dataset.loaded = "true"; // marca a seção como já carregada
                    // Verificar se a seção carregada contém um carrossel
                if (section.querySelector('.mySwiper')) {
                    initCarousel(); // Inicializa o carrossel após a seção ser carregada
                }
                })
                .catch(error => console.error("Erro ao carregar a seção:", error));
                // Se houver erro (exemplo: arquivo não encontrado), ele exibe no console
        }
    }

    // Intersection Observer para carregar a seção quando estiver visível
    const observer = new IntersectionObserver(entries => {
        // O Intersection Observer observa se a seção está visível na tela
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadSection(entry.target);
            }
            // Quando uma seção entra na tela (entry.isIntersecting), o código chama loadSection(entry.target)
            // isso faz com que o conteúdo seja carregado apenas nesse momento
        });
    }, { threshold: 0.5 }); 
    // threshold: 0.5 significa que 50% da seção precisa estar na tela antes de carregá-la

    sections.forEach(section => {
        observer.observe(section);
        // Esse loop adiciona o observador para cada seção, garantindo que todas sejam carregadas dinamicamente
    });

    // Rolagem suave ao clicar no menu
    document.querySelectorAll("nav a").forEach(link => { // pega todos os links do menu de navegação
        link.addEventListener("click", function (e) {
            e.preventDefault(); // preventDefault(), evita  que recarregue a página ao clicar no link
            const targetId = this.getAttribute("href").substring(1);
            // this representa o próprio link <a> que foi clicado
            // .substring(1) remove o # do inicio do href ex. href="#about" → targetId = "about"
            const targetSection = document.getElementById(targetId);
            // document.getElementById(targetId) pega a secão correspondente
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
            // Se a seção existir, o código faz a rolagem suave (scrollIntoView({ behavior: "smooth" }))
        });
    });
});

// Hamburguer

// Seleciona o botão hamburger e o menu de navegação
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

// Adiciona um evento de clique no botão hamburger
hamburger.addEventListener('click', () => {
    // Alterna a classe 'active' para exibir ou esconder o menu
    nav.classList.toggle('active');
});


// Carrossel
function initCarousel() {
    new Swiper(".mySwiper", {
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
}

