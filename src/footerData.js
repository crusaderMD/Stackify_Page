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