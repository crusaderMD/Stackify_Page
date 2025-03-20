# Documentação do Projeto - JavaScript

## 📌 Introdução
Este documento descreve a estrutura, funcionalidades e principais conceitos utilizados na parte JavaScript deste projeto.

## 📂 Estrutura do Projeto
```
📂 meu-projeto
 ├── 📂 src/               # Código-fonte principal
 │   ├── 📜 app.js       # Arquivo principal
 │   ├── 📂 modules/       # Módulos JS organizados
 │   │   ├── 📜 utils.js   # Funções auxiliares
 │   │   ├── 📜 api.js     # Comunicação com APIs
 │   │   ├── 📜 ui.js      # Manipulação da interface
 ├── 📂 docs/              # Documentação do projeto
 │   ├── 📜 doc-js.md      # Documentação do JavaScript
 ├── 📜 README.md          # Resumo do projeto
```

## 🔹 Configuração e Instalação
1. **Clonar o repositório:**  
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. **Instalar dependências (se aplicável):**  
   ```sh
   npm install
   ```
3. **Executar o projeto:**  
   ```sh
   node src/app.js
   ```

## 🔹 Guia de Código
### 📌 Estrutura Modular
Cada funcionalidade do JavaScript está separada em módulos dentro de `src/modules/`, permitindo melhor organização e reutilização do código.

### 📌 Principais Arquivos
- **app.js**: Ponto de entrada principal do projeto.
- **utils.js**: Contém funções auxiliares reutilizáveis.
- **api.js**: Responsável por chamadas a APIs externas.
- **ui.js**: Manipulação da interface do usuário.

### 📌 Exemplo de Código
```javascript
// Exemplo de função no utils.js
export function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Importando e utilizando no app.js
import { formatarData } from './modules/utils.js';
console.log(formatarData('2025-03-18'));
```

## 🔹 Convenções de Código
- **Padrão de nomenclatura:** CamelCase para variáveis e funções (`minhaFuncao()`), PascalCase para classes (`MinhaClasse`).
- **Uso de `const` e `let` ao invés de `var`**.
- **ESModules (`import/export`) ao invés de `require`**.
- **Linting com ESLint para manter o código limpo.**

# Funcões do projeto:

## Funcão para carregar dinâmicamente o conteúdo na página
Esta função realiza o carregamento dinâmico de cada seção da página (ex: home, hero, about, contact)
Mantendo apenas os conteúdos do escopo (porção da página em exibição) ativos

### Código
```javascript
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
```

```
document.addEventListener("DOMContentLoaded", function () { ... });
```
document.addEventListener: Este é um método que adiciona um ouvinte de evento ao documento. O que ele faz é "escutar" um tipo específico de evento em um elemento. No caso, ele escuta o evento DOMContentLoaded.

"DOMContentLoaded": Esse evento é disparado quando o documento HTML inicial foi completamente carregado e analisado, sem esperar que as folhas de estilo, imagens e subframes terminem de carregar. É muito útil para garantir que o código JavaScript só seja executado quando toda a estrutura HTML da página estiver disponível.

Função anônima - function (): O código dentro da função será executado assim que o evento for disparado, ou seja, quando o HTML for totalmente carregado.

```
const sections = document.querySelectorAll(".section");
```
document.querySelectorAll: Este método retorna todos os elementos do documento que correspondem ao seletor CSS passado como argumento. No caso, ele retorna todos os elementos com a classe .section.

```html
<main>
    <section id="hero" class="section" data-section="hero.html"></section>
    <section id="about" class="section" data-section="about.html"></section>
    <section id="contact" class="section" data-section="contact.html"></section>
</main>
```

sections: Constante que armazena todos esses elementos selecionados. Permite manipular esses elementos depois.

```
function loadSection(section) { ... }
```
Função chamada loadSection que vai carregar o conteúdo de uma seção quando ela for visível na tela.
Parâmetro (section): recebe como argumento a seção que será carregada (ex: home, about, contact, hero, etc)

```
const url = section.getAttribute("data-section");
```
section.getAttribute("data-section"): A função getAttribute pega o valor de um atributo específico de um elemento. No caso, estamos buscando o valor do atributo data-section de cada seção.

data-section: Esse atributo personalizado é usado para armazenar o URL de um arquivo HTML. Esse arquivo será carregado dinamicamente na seção correspondente.

```html
<section id="hero" class="section" data-section="hero.html"></section>
<section id="about" class="section" data-section="about.html"></section>
<section id="contact" class="section" data-section="contact.html"></section>
```

```
if (!section.dataset.loaded) { ... }
```
section.dataset: O dataset é uma forma de acessar os atributos data-* de um elemento. Aqui estamos verificando se a seção já foi carregada anteriormente, verificando se section.dataset.loaded está marcado como true ou não.

!section.dataset.loaded: O operador ! inverte o valor, ou seja, a condição é verdadeira se a seção ainda não tiver sido carregada.

```
fetch(url)
```
fetch(url): Este é um método JavaScript para realizar requisições HTTP assíncronas. Ele solicita um recurso de uma URL (que neste caso é o arquivo HTML armazenado no data-section da seção) e retorna uma Promise.

### Promise
Uma Promise em JavaScript é um objeto que representa uma operação assíncrona que pode estar em um dos três estados:

1. Pending (Pendente) – Quando a operação ainda está em andamento.
2. Fulfilled (Resolvida) – Quando a operação foi concluída com sucesso.
3. Rejected (Rejeitada) – Quando a operação falhou.

Internamente, o fetch envia uma solicitação HTTP ao servidor, e quando a resposta chega, ele resolve a Promise com um objeto Response. Esse objeto Response pode ser manipulado para acessar os dados da resposta (por exemplo, texto, JSON, etc.).

```
.then(response => response.text())
```
then(): Este é um método usado para trabalhar com Promises em JavaScript. Quando o fetch retorna uma Promise, then() é chamado quando a promessa é resolvida. Dentro do then(), a função que você define é executada com o resultado da Promise.

```
response => response.text()
```
A sintaxe response => response.text() que é lida como: "para um dado response, retorne response.text()" é uma arrow function em JavaScript, que equivale a esta função tradicional:
```
function(response) {
    return response.text();
}
```
response.text(): Quando o fetch retorna uma resposta (o conteúdo do arquivo HTML, por exemplo), é usado o método .text() do objeto Response para obter o corpo da resposta como uma string de texto.

```
.then(data => { ... })
```
Dentro deste then(), a variável data contém o HTML da seção que foi carregado.

section.innerHTML = data;: Aqui esta injetando o HTML carregado dentro da seção. Isso faz com que o conteúdo da seção seja substituído pelo conteúdo do arquivo HTML carregado.

section.dataset.loaded = "true";: Aqui marca a seção como carregada, alterando o valor de data-loaded para "true", para evitar que ela seja carregada novamente.

```
.catch(error => console.error("Erro ao carregar a seção:", error));
```
catch(): Se algo der errado durante a requisição ou processamento do fetch, o bloco catch será executado.

console.error(): Exibe uma mensagem de erro no console do navegador, útil para depuração.

```
const observer = new IntersectionObserver(entries => { ... }, { threshold: 0.5 });
```
IntersectionObserver: Essa classe permite observar quando um elemento entra ou sai da área visível do navegador (ou seja, a área visível da tela). É usada aqui para carregar o conteúdo de uma seção assim que ela estiver visível na tela.

entries: Este parâmetro é um array de objetos IntersectionObserverEntry, que contêm informações sobre cada elemento observado.

entry.isIntersecting: Esse valor será true quando o elemento estiver visível na tela.

```
entries.forEach(entry => {...});
```
.forEach(entry => {...}): Percorre o array de objetos IntersectionObserverEntry.

```
if (entry.isIntersecting) {
                loadSection(entry.target);
            }
``` 
entry.isIntersecting: Esse valor será true quando o elemento estiver visível na tela.

```
loadSection(entry.target);
```
Chama a função loadSection passando como argumento o elemento observado que está visível no momento (section)

```
{ threshold: 0.5 }
```
threshold: 0.5: Isso significa que a função loadSection será chamada quando 50% ou mais da seção estiver visível na tela.

```
sections.forEach(section => { observer.observe(section); });
```
forEach(): Método de array que itera sobre cada elemento no array (no caso, cada seção) e executa a função fornecida.

observer.observe(section): Estamos dizendo ao IntersectionObserver para começar a "observar" cada uma das seções. Isso significa que o observador começará a monitorar se cada seção entra ou sai da área visível.

```
document.querySelectorAll("nav a").forEach(link => { ... });
```
document.querySelectorAll("nav a"): Seleciona todos os links dentro de um elemento <nav>

forEach(link => { ... }): Itera sobre todos os links do menu e executa a função fornecida para cada um deles.

```
link.addEventListener("click", function (e) { ... });
```
addEventListener("click"): Adiciona um ouvinte de evento para o evento de clique. Quando um link é clicado, o código dentro da função será executado.

```
e.preventDefault();
```

e.preventDefault(): Isso impede o comportamento padrão do link (que seria recarregar a página ao clicar), permitindo que o JavaScript trate a ação de forma personalizada.

```
const targetId = this.getAttribute("href").substring(1);
```
this.getAttribute("href").substring(1): O this refere-se ao link clicado. getAttribute("href") pega o valor do atributo href, que contém o ID da seção para onde o link aponta (ex: #about, #contact, etc.). substring(1) remove o # do início do ID.

```
const targetSection = document.getElementById(targetId);
```
document.getElementById(targetId): Encontra o elemento da página com o ID correspondente ao valor do href (ex: "about").

```
if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
```
if (targetSection): Se a seção existir, targetSection.scrollIntoView({ behavior: "smooth" }); : Faz com que o navegador role suavemente até a seção selecionada.


## 🔹 Próximos Passos
- [ ] Melhorar a documentação com exemplos práticos.
- [ ] Adicionar testes automatizados.
- [ ] Expandir a documentação sobre integração com APIs.

---
📌 *Última atualização: 18 de março de 2025*
