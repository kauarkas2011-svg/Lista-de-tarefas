//1. SELECIONAR os elementos do DOM
const campo = document.getElementById("tarefa");
const botao= document.getElementById("adicionar");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contandor");

//2. FUNÇÃO que cria uma nova tarefa
function adicionarTarefa(){
    const texto = campo.value.trim();

//Validação: não deixa adicionar tarefa vazia
if (texto === "") {
    mensagem.textContent = "Escreva algo antes de adicionar."
    campo.focus();
    return;
}
mensagem.textContent = ""

//CRIAR elementos novos
const li = document.createElement("li");

const span = document.createElement("span");
span.textContent = texto; //textContent é seguro contra HTML malicioso

const botaoRemover = document.createElement("button");
botaoRemover.textContent = "Remover";
botaoRemover.className = "remover";
botaoRemover.type = "button";

//Montar a estrutura
li.appendChild(span);
li.appendChild(botaoRemover);
lista.appendChild(li);

//Limpar o campo e voltar o foco para ele
campo.value = "";
campo.focus();

atualizarContador();
}

//3. FUNÇÃO que atualiza o texto do contador
function atualizarContador(){
    const total = lista.querySelectorAll("li").length;
    const feitas = lista.querySelectorAll("li.concluida").length;

    if (total === 0) {
        contador.textContent =  "Nenhum tarefa ainda.";
    } else {
        contador.textContent = `${feitas} de ${total} concluída(s).`;
    }
}

//4. Eventos

// Clique no botão "Adicionar"
botao.addEventListener("click", adicionarTarefa);

//Apertar Enter no campo também adiciona
campo.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

// Delegação de eventos: um único "ouvinte" na lista
// Cuida dos cliques em todas as tarefas, inclusive as criadas depois
lista.addEventListener("click", (evento) => {
    const alvo = evento.target;
    const li = alvo.closest("li");
    if (!li) return;

    if (alvo.classList.contains("remover")) {
        li.remove(); //REMOVER do DOM
    }   else if (alvo.tagName === "SPAN") {
        li.classList.toggle("concluida");
    }

     atualizarContador();
});


// TEMA CLARO / ESCURO
const botaotema = document.getElementById("tema");
const raiz = document.documentElement; // a tag <html>

function aplicarTema(tema) {
    raiz.setAttribute("data-tema", tema);
    botaotema.textContent = tema === "escuro" ? "Tema claro" : "Tema escuro";
}

//Ao abrir a página: usa o tema salvo ou, se não houver, o do sistema
const temaSalvo = localStorage.getItem("tema");
const sistemaEscuro = window.matchMedia("prefers-color-scheme: dark)").matches
aplicarTema(temaSalvo || (sistemaEscuro ? "escuro" : "claro"));

//Ao clicar: Inverte o tema e salva a escolha
botaotema.addEventListener("click", () => {
    const atual = raiz.getAttribute("data-tema");
    const novo = atual === "escuro" ? "claro" : "escuro";
    aplicarTema(novo);
    localStorage.setItem("tema", novo);
});