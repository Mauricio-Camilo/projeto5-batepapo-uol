let mensagensServidor = [];
let usuarioEnviado = [];
let teste = "";
let mostrarUsuario = "";
let usuarioConectado = "";
let enviarMensagem = "";

function receberNomeUsuario() {
   
    // while (statusServidor !== 200) {
    const nomeUsuario = prompt("Digite seu nome para entrar na sala:");
    const usuario = {name: nomeUsuario};
  //  console.log(usuario);
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",usuario);
    // Fazer um loop até aceitar o nome do usuário
    promise.then(enviarNomeCorreto);
    promise.catch(tratarErro);
    usuarioConectado = usuario;
    mostrarUsuario = usuario.name;
    console.log (usuario);
// }
}

function enviarNomeCorreto(nomeEnviado) {
    teste = nomeEnviado.status;
    console.log(teste);
    while (teste !== 200) {
        prompt ("Nome inválido, digite outro nome:");
        receberNomeUsuario();
    }
}

function EsconderTelaLogin() {
    const ocultarLogin = document.querySelector(".login");
    ocultarLogin.classList.add("escondido")
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
    console.log(erro.response.status); //400ja
    console.log(erro.response.data);
}

function mostrarMensagensDoServidor() {
    const mensagem = document.querySelector("main");
    mensagem.innerHTML = "";
    for (let i = 0; i < mensagensServidor.length; i++) {
        let texto = mensagensServidor[i];
        if (texto.type === "status") {
            mensagem.innerHTML += `<div class="entrada-saida exibição">
        <p><span class="tempo">(${texto.time})   </span> <b> ${texto.from} </b> <span>  ${texto.text} </span></p>
    </div>`
        }
        else if (texto.type === "message") {
            mensagem.innerHTML += `<div class="mensagem exibição">
        <p><span class="tempo">(${texto.time})</span> <b> ${texto.from} </b> <span> para  </span><b>${texto.to}</b>: ${texto.text}</p>
    </div>`}
        else {
            mensagem.innerHTML += `<div class="reservada exibição">
            <p><span class="tempo">(${texto.time})</span> <b> ${texto.from} </b> <span>reservadamente para  </span><b>${texto.to}</b>: ${texto.text}</p>
         </div>`}
    }
}

function mostrarNomeUsuario() {
    const mensagem = document.querySelector("main");
    mensagem.innerHTML += `<div class="entrada-saida exibição">
    <p> <b> ${mostrarUsuario} </b> <span> entra na sala...</span></p>
</div>`
}

function manterConexao() {
    console.log (usuarioConectado);
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",usuarioConectado);
    // Fazer um loop até aceitar o nome do usuário
    promise.then(verificar5segundos);
    promise.catch(removerUsuario);
}

function verificar5segundos() {
    console.log("conexao mantida");
}

function removerUsuario() {
    const mensagem = document.querySelector("main");
    mensagem.innerHTML += `<div class="entrada-saida exibição">
    <p> <b> ${mostrarUsuario} </b> <span> sai da sala...</span></p>
</div>`

}

function digitarMensagem () {
    const mensagemDigitada = document.querySelector(".enviar-mensagem")
    const mensagemEnviada = mensagemDigitada.value;
    enviarMensagem = {from: mostrarUsuario, to: "Todos", text: mensagemEnviada, type: "message"};
    console.log (enviarMensagem);
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", enviarMensagem);
    promise.then (mensagemEnviadaOK);
    promise.catch (tratarErro)
}

function mensagemEnviadaOK () {
    console.log ("sucesso");
}

 receberNomeUsuario();

 carregarMensagensDoServidor();

 setTimeout(mostrarNomeUsuario, 1000);

 setInterval(carregarMensagensDoServidor, 3000);

 setInterval(manterConexao, 5000);

 
 //setInterval(carregarMensagensDoServidor, 2000);