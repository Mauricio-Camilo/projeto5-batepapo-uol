let mensagensServidor = [];
let usuarioEnviado = [];
let nomeUsuario = "";
let usuarioConectado = "";
let enviarMensagem = "";

function receberNomeUsuario() {
   
    const entradaUsuario = prompt("Digite seu nome para entrar na sala:");
    const usuario = {name: entradaUsuario};
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",usuario);
    promise.then(enviarNomeCorreto);
    promise.catch(enviarNomeNovamente);
    usuarioConectado = usuario;
    nomeUsuario = usuario.name;
}

function enviarNomeCorreto(nomeEnviado) {
    setTimeout(mostrarNomeUsuario, 1000);
}

function enviarNomeNovamente() {
    alert ("Nome inválido, digite outro nome");
    receberNomeUsuario();
}

function mostrarNomeUsuario() {
    const mensagem = document.querySelector("main");
    mensagem.innerHTML += `<div class="entrada-saida exibição">
    <p> <b> ${nomeUsuario} </b> <span> entra na sala...</span></p>
</div>`
}

function carregarMensagensDoServidor() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promise.then(cumprirPromessa);
    promise.catch(tratarErro);
}

function cumprirPromessa(resposta) {
    mensagensServidor = resposta.data;
    mostrarMensagensDoServidor();
}

function tratarErro(erro) {
    console.log(erro.response.status); 
    console.log(erro.response.data);
}

function mostrarMensagensDoServidor() {
    const mensagem = document.querySelector("main");
    mensagem.innerHTML = "";
    for (let i = 0; i < mensagensServidor.length; i++) {
        let conteudoMensagem = mensagensServidor[i];
        if (conteudoMensagem.type === "status") {
            mensagem.innerHTML += `<div class="entrada-saida exibição">
        <p><span class="tempo">(${conteudoMensagem.time})   </span> <b> ${conteudoMensagem.from} </b> <span>  ${conteudoMensagem.text} </span></p>
    </div>`
        }
        else if (conteudoMensagem.type === "message") {
            mensagem.innerHTML += `<div class="mensagem exibição data-identifier="message"">
        <p><span class="tempo">(${conteudoMensagem.time})</span> <b> ${conteudoMensagem.from} </b> <span> para  </span><b>${conteudoMensagem.to}</b>: ${conteudoMensagem.text}</p>
    </div>`}
        else if (conteudoMensagem.type === "private-message" && nomeUsuario !== conteudoMensagem.to) {
            mensagem.innerHTML += `<div class="reservada exibição">
            <p><span class="tempo">(${conteudoMensagem.time})</span> <b> ${conteudoMensagem.from} </b> <span>reservadamente para  </span><b>${conteudoMensagem.to}</b>: ${conteudoMensagem.text}</p>
         </div>`}
    }
}

function manterConexao() {
    console.log (usuarioConectado); 
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",usuarioConectado);
    promise.then(verificar5segundos);
    promise.catch(removerUsuario);
}

function verificar5segundos() {
    console.log("conexao mantida");
}

function removerUsuario() {
    const mensagem = document.querySelector("main");
    mensagem.innerHTML += `<div class="entrada-saida exibição">
    <p> <b> ${nomeUsuario} </b> <span> sai da sala...</span></p>
</div>`
}

function digitarMensagem () {
    const mensagemDigitada = document.querySelector(".enviar-mensagem")
    const mensagemEnviada = mensagemDigitada.value;
    enviarMensagem = {from: nomeUsuario, to: "Todos", text: mensagemEnviada, type: "message"};
    console.log (enviarMensagem); 
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", enviarMensagem);
    promise.then (mensagemEnviadaOk);
    promise.catch (mensagemNaoEnviada);
}

function mensagemEnviadaOk () {
    const mensagem = document.querySelector("main");
    mensagem.innerHTML += `<div class="mensagem exibição">
        <p><b> ${enviarMensagem.from} </b> <span> para  </span><b>${enviarMensagem.to}</b>: ${enviarMensagem.text}</p>
    </div>`
    const resetarMensagem = document.querySelector(".enviar-mensagem")
    resetarMensagem.value = "";
    console.log ("envio com sucesso");
}

function mensagemNaoEnviada() {
    receberNomeUsuario();
}

 receberNomeUsuario();

 carregarMensagensDoServidor();

 setInterval(carregarMensagensDoServidor, 3000);

 setInterval(manterConexao, 5000);

