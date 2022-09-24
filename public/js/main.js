var tempoInicial = $("#tempo-digitacao").text();
/* captura html da tag pelo Id e armazena na variavel */
var areaTxt = $(".campo-digitacao");

$(function () { /** função ready( ) ou $( ) que executa seu corpo apos o DOM ter carregado por completo */
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

/** função que verifica a frase e identifica quantas palavras tem a frase */
function atualizaTamanhoFrase() { 
    var frase = $(".frase").text();/* usando JQuery capturo a Frase por meio da Class e armazeno na variavel */
    var numPalavras = frase.split(" ").length; /* utilizo a variavel e aplico a funcao split para quebrar e 
    separa todas as palavras e por fim utilizo length para contar quantidade de palavras no total*/
    var tamanhoFrase = $("#tamanho-frase");/*captura html da tag pelo Id e armazena na variavel */
    tamanhoFrase.text(numPalavras);/* aplica a funcao text para modificar o texto deixando dinamico */
}


/** função com evento de escuta para o que esta sendo digitado na areatxt e conta quantas palavras foram digitados e quantos caracteres. */
function inicializaContadores() {
    /* usando a variavel realizamos a escuta de um evento onde a cada digitação no teclado e executado as rotinas 
    dentro da funcao anonima */
    areaTxt.on("input", function () {

        /* usando JQuery capturo a Frase por meio da Class no Input e armazeno na variavel*/
        var txt = areaTxt.val();

        var qtdPalavras = txt.split(/\S+/).length - 1;/* utilizo a variavel e aplico a funcao split passando um parametro ( /\S+/ )para quebrar e separa todas 
        as palavras e por fim utilizo length para contar quantidade de palavras no total*/
        $("#contador-palavras").text(qtdPalavras);/* captura o html e muda o texto passando o novo texto por parametro*/

        var qtdCaracteres = txt.length;/* conta quantidade de caracteres e armazena na variavel */
        $("#contador-caracteres").text(qtdCaracteres);/* captura o html e muda o texto passando o novo texto por parametro*/

    })
}

/** funcão cronometro que ativa com click e quando termina o tempo chama a função finaliza jogo */
function inicializaCronometro() {
    /*capturo o texto da teg pelo id + a funcao text e armazeno na variavel */
    var tempoRestante = $("#tempo-digitacao").text();
    /* usando a variavel realizamos a escuta de um evento onde quando o cursor estiver ativo ele executado as rotinas 
    dentro da funcao anonima */
    areaTxt.one("focus", function () { /* OBS: aqui utilizamos o ONE para que seja acionado apenas uma vez  */
        var idSetinterval = setInterval(function () {/* utilizamos a funcao set interval que é um temporizador */

            tempoRestante--;

            $("#tempo-digitacao").text(tempoRestante);/* captura o html e muda o texto passando o novo texto por parametro*/

            if (tempoRestante < 1) {/** teste se o tempo é igual a zero e sendo verdade executa as rotinas dentro */
                clearInterval(idSetinterval); /** para o temporizador deixando no zero  */
                finalizaJogo();
            }

        }, 1000);
    })
}

/** função bloqueia a areatxt para a digitação, mostra efeito visual e chama função de inserir placar */
function finalizaJogo() {
    areaTxt.attr("disabled", true); /** desabilita areatxt bloqueando para digitação */
    areaTxt.toggleClass("campo-desativado");
    inserirPlacar();
}



/**função para fazer comparação instantanea do que esta sendo digitado com a Frase exibida e mostra um resultado visual de certo ou errado  */
function inicializaMarcadores() {
    var frase = $(".frase").text();/** para a frase */
    areaTxt.on("input", function () { /** escuta o que esta sendo digitado  e compara com a frase*/
        var digitado = areaTxt.val(); /** para o que esta sendo digitado */
        var comparavel = frase.substr(0, digitado.length); /** pega trecho da frase do mesmo tamanho do que esta sendo digitado para comparar */

        if (digitado == comparavel) {/** compara os dois textos e devolve resultado visual */
            areaTxt.addClass("borda-verde");
            areaTxt.removeClass("borda-vermelha");
        } else {
            areaTxt.addClass("borda-vermelha");
            areaTxt.removeClass("borda-verde");
        }
    })
}




function reiniciaJogo() {
    areaTxt.attr("disabled", false);
    areaTxt.val("");
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    areaTxt.toggleClass("campo-desativado");
    areaTxt.removeClass("borda-verde");
    areaTxt.removeClass("borda-vermelha");
}

