var tempoInicial = $("#tempo-digitacao").text();
/* captura html da tag pelo Id e armazena na variavel */
var areaTxt = $(".campo-digitacao");

$(function(){ /** função que executa seu corpo apos o DOM ter carregado por completo */
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();/* usando JQuery capturo a Frase por meio da Class e armazeno na variavel */
    var numPalavras = frase.split(" ").length; /* utilizo a variavel e aplico a funcao split para quebrar e 
    separa todas as palavras e por fim utilizo length para contar quantidade de palavras no total*/
    var tamanhoFrase = $("#tamanho-frase");/*captura html da tag pelo Id e armazena na variavel */
    tamanhoFrase.text(numPalavras);/* aplica a funcao text para modificar o texto deixando dinamico */
}



function inicializaContadores(){
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
                areaTxt.attr("disabled", true); /** desabilita areatxt bloqueando para digitação */
                clearInterval(idSetinterval); /** para o temporizador deixando no zero  */
                areaTxt.toggleClass("campo-desativado");
            }

        }, 1000);
    })
}

function reiniciaJogo(){
    areaTxt.attr("disabled", false);
    areaTxt.val("");
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    areaTxt.toggleClass("campo-desativado");
}

