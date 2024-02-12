let listaNumerosSorteados = []; /*cria uma lista para salvar os números sorteados */
let limite = 100; /*onde será definido o intervalo do jogo*/
let numeroSecreto = gerarNumeroAleatorio(); /*onde será guardado o número aleatório gerado*/
let tentativas = 0;

exibirMensagemInicial();

/*Existe uma forma de simplificar os códigos e evitar repetições:
O escopo dos dois códigos é igual, o que muda é o "campo" e a "tag" */
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

//executando a função, com base na tag, informando o outro parâmetro (o texto) que ela deve receber
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${limite}`);
}

/*cria uma função (trecho de código que tem alguma responsabilidade; executa alguma ação. Normalmente, apenas uma) para o 
botão no HTML que referenciamos como "verificarChute"*/

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute > numeroSecreto) {
        exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        tentativas ++;
        limparCampo();
    } else if (chute < numeroSecreto) {
        exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        tentativas ++;
        limparCampo();
    } else{
        tentativas ++;
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('h1', 'Parabéns!');
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
}

//cria uma função para gerar um número aleatório. O retorno serve para atribuir esse valor à variável criada (numeroSecreto)
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    //sempre que a quantidade de números sorteados atingir o máximo, a lista é limpa.
    if (quantidadeDeElementosNaLista == limite) {
        listaNumerosSorteados = [];
    }

    //se o número já tiver sido sorteado, gera um novo número aleatório
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//limpa o campo onde é colocado o chute
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//reinicia o jogo, sorteando um novo número; limpando o chute; zerando as tentativas e reexibindo a mensagem inicial
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}