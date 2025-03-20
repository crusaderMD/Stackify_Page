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