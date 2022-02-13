let mensagensServidor = [];
let usuarioEnviado = [];
let teste = ""

function receberNomeUsuario() {
   
    // while (statusServidor !== 200) {
    const nomeUsuario = prompt("Digite seu nome para entrar na sala:");
    const usuario = {name: nomeUsuario};
  //  console.log(usuario);
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",usuario);
    // Fazer um loop até aceitar o nome do usuário
    promise.then(enviarNomeCorreto);
    promise.catch(tratarErro);

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
    mostrarMensagensNaTela();
    //console.log (mensagensServidor);
}

function tratarErro(erro) {
    console.log(erro.response.status); //400
    console.log(erro.response.data);
}

function mostrarMensagensNaTela() {
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

function digitarMensagem () {
    const mensagemDigitada = document.querySelector(".enviar-mensagem")
    const mensagemEnviada = mensagemDigitada.value;
    console.log (mensagemEnviada);
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", mensagemEnviada);
    promise.then (mensagemEnviadaOK);
    promise.catch (tratarErro)
}

function mensagemEnviadaOK () {
    console.log ("sucesso");
}


 receberNomeUsuario();

setInterval(carregarMensagensDoServidor, 1000)

