var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numPalavras);



var areaTxt = $(".campo-digitacao");
areaTxt.on("input", function(){
   
    var txt = areaTxt.val();
   
    var qtdPalavras = txt.split(/\S+/).length -1;
    $("#contador-palavras").text(qtdPalavras);
   
    var qtdCaracteres = txt.length;
    $("#contador-caracteres").text(qtdCaracteres);
    console.log();
})
