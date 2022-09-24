$("#botao-placar").click(mostraPlacar);

/** função que é acionada apos o termino do jogo chama a função nova linha para mostrando o resultado com nome e quantidade de palavras digitadas */
function inserirPlacar() {
    var corpoTabela = $(".placar").find("tbody"); /** capturo o html do corpo tbody da tabela placar e armazena em uma variavel  */
    var usuario = "Vlabson"; 
    var numPalavras = $("#contador-palavras").text(); /** captura o valor text do resultado da digitação para colocar na tabela resultado*/
   
    var linha = novaLinha(usuario,numPalavras);/**chama função nova linha para criar nova linha com os resultados e armazena em uma variavel  */
    
    linha.find(".botao-remover").click(removeLinha);/** escuta o click no botao remover e chama a funcao remove linha */
    
    corpoTabela.prepend(linha);/** insere a nova linha no corpo da tabela */
}

/** função que cria uma nova linha na tabela resultado */
function novaLinha(usuario,palavras){
    var linha = $("<tr>"); /** cria uma tag TR  linha*/
    var colunaUsuario = $("<td>").text(usuario); /** cria uma tag TD coluna e insere o nome do usuario  */
    var colunaPalavras = $("<td>").text(palavras); /** dria uma tag TD coluna e insere o valor quantidade de palavras */
    var colunaRemover = $("<td>"); /** cria uma tag TD coluna e insere o icone de lixeira para remover  */
    
    var link = $("<a>").addClass("botao-remover").attr("href","#"); /** cria uma tag A link e insere uma classe e um atributo Href  */
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete"); /** cria uma tag I e insere duas classes e um texto */

    link.append(icone); /** coloca a tag I dentro da tag A */
    colunaRemover.append(link); /** coloca a tag A dentro da tag TD */

    linha.append(colunaUsuario); /** coloca a tag TD dentro da tag TR */
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha; /** retorna a linha completa e construida  */
}

/** função que remove linha da tabela */
function removeLinha(){
    event.preventDefault(); /** evita eventos padrão  */
    $(this).parent().parent().remove();/** exclui a linha  */
}

function mostraPlacar(){
    $(".placar").toggle();
}
