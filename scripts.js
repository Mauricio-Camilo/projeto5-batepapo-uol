let mensagens = [{ from: "diego", to: "todos", texto: "e ae galera!", time: "(12:00:00)", type: "status", text: "entra na sala..." },
{ from: "ana", to: "diego", texto: "e ae professor!", time: "(13:00:00)", type: "message", text: "E ai galera blz?" },
{ from: "nathan", to: "diego", texto: "fala professor!", time: "(14:00:00)", type: "private_message", text: "mensagem privada" }];
let mensagensServidor = [];

function mostrarMensagensNaTela() {
    const mensagem = document.querySelector("main");
    mensagem.innerHTML = "";
    for (let i = 0; i < mensagensServidor.length; i++) {
        let texto = mensagensServidor[i];
        if (texto.type === "status") {
            mensagem.innerHTML += `<div class="entrada-saida exibição">
        <p><span class="tempo">${texto.time}</span> <b> ${texto.from} </b> <span>  ${texto.text} </span></p>
    </div>`
        }
        else if (texto.type === "message") {
            mensagem.innerHTML += `<div class="mensagem exibição">
        <p><span class="tempo">${texto.time}</span> <b> ${texto.from} </b> <span> para  </span><b>${texto.to}</b>: ${texto.text}</p>
    </div>`}
        else {
            mensagem.innerHTML += `<div class="reservada exibição">
            <p><span class="tempo">${texto.time}</span> <b> ${texto.from} </b> <span>reservadamente para  </span><b>${texto.to}</b>: ${texto.text}</p>
         </div>`}
    }
}


function carregarMensagensDoServidor() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promise.then(cumprirPromessa);
    promise.catch(tratarErro);
}

function cumprirPromessa(resposta) {
    mensagensServidor = resposta.data;
    mostrarMensagensNaTela();
    //console.log (mensagensServidor);
}

function tratarErro (erro) {
    console.log (erro.response.status);
    console.log (erro.response.data);
}

carregarMensagensDoServidor();

 mostrarMensagensNaTela();