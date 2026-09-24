// | Anotações entre linhas para revisão e melhor entendimento pessoal e do professor  
let cadastros=[]; //global, todas as funções enxergam e alteram o array

$(document).ready(function(){ // Quando o documento (a página inteira) termina de carregar, executa o que está dentro da função
  carregarDados();
$("#btnSalvar").click(function(){
  salvarCadastro(); //toda vez que o botão de salvar for clicado, chama a função de salvar o cadastro
});

$("#btnOrderCod").click(function(){ //busca os dados (do arquivo e/ou do local Storage) e já mostra a tabela
  ordenarPor("codigo");
});

$("#btnOrderName").click(function(){
  ordenarPor("nome");
});
});

function carregarDados(){ //$.getJSON(url): atalho JQuery para fazer uma requeisição AJAX, esperando uma responsta em JSON. Faz o JSON.parse automaticamente
  $.getJSON("infos.json")
  .done(function(dadosArquivo){ //.done() é executado SE a requisição der certo. dadosArquivo é o conteúdo do infos.json conveertido em array JavaScript
    let salvos=localStorage.getItem("cadastros");
    );
  if(salvos){ //se for null, null ---> falso, só entra na condição se existir algo salvo
    cadastros=JSON.parse(salvos); //transforma o texto salvo de volta em array/objeto e guarda na variável global cadastros.
  }
  else{
    cadastros=dadosArquivo;
    localStorage.setItem("cadastros", JSON.stringify(cadastros)); // se não existir, grava no localStorage com JSON.stringfy ---> transforma o array em texto para ser guardado
  }
  renderTabela(cadastros);
})
.fail(fuction(){
  let salvos=localStorage.getItem("cadastros");
  cadastros=salvos ? JSON.parse(salvos) : []; //se salvos exisir, usa ele, se não usa um array vazio
  renderTabela(cadastros);
  
  if(!salvos){
    console.warn("Não foi possível ler infos.json. Rode a página por um serviro local.");
  }
});
}

function salvarCadastro(){
  let codigo=$("#cod").val().trim(); //pega o campo de input, lê o texto digitado nele e remove os espaços em branco extras do início/fim 
  let nome=$("#nome").val().trim();
  let telefone=$("#tel").val().trim();
  let email=$("#email").val().trim();

  if(!codigo || !nome){ //string vazia ---> false
  alert("O código e o nome são campos obrigatórios!");
    return;
  }

  let indiceExistente=cadastros.findIndex(function(c){ // findIndex() percorre o array cadastros e devolve a posição do primeiro item cuja condição seja verdadeira (se não achar nenhum, devovle -1) 
    return c.codigo===codigo;
  )};
let registro={codigo: codigo, nome: nome, telefone: telefone, email: email}; //monta um novo objeto no mesmo formato infos.json

if(indiceExistente>=0){ // Se achou um índice válido: substitui aquela posição do array pelo registro atualizado. 
cadastros[indiceExistente]=(registro);
}
else{
  cadastros.push(registro); //Se não encontrou (representado por convenção como -1), o .push() adiciona o registro como um item novo no final do array
}
localStorage.setItem("cadastros", JSON.stringfy(cadastros)); // Salva o array atualizado (convertido para texto), registra a tabela e limpa os campos do formulário para o próximo input
renderTabela(cadastros);
limparForm();
}

function editarCadastro(codigo){ // .find() ---> devolve o objeto em si e não a posição. O codigo é parâmetro que veio de fora, do onclick do botão de editar daquela linha específica da tabela.
  let registro=cadastros.find( 
    function(c){ return c.codigo=== codigo;});
      if(!registro) return; //se caso não encontrar, sai da função sem fazer nada.
      $("#cod").val(registro.codigo); // sobrescreve um valor no campo
      $("#nome").val(registro.nome);
      $("#tel").val(registro.telefone);
      $("#email").val(registro.email);
}
    function excluirCadastro(codigo){
      if(!confirm("Excluir o cadastro " + codigo + "?")) return;
    cadastros =cadastros.filter(
      function(c){
        return c.codigo!==codigo; //.filter() ---> cria um array novo contendo apenas os itens que passaram no teste, todos os cadastros cujo código é diferente do que se quer excluir. 
      });
    localStorage.setItem("cadastros", JSON.stringfy(cadastros));
    renderTabela(cadastros);
  }
  
function ordernarPor(cadastros){ 
  cadastros.sort(function (a, b){
    //acesso dinâmico "a[campo]" = a.nome ou a.codigo
    if(a[campo]<b[campo]) return -1; //retornar -1 significa que a vem antes de b, retornar 1 significa que b vem antes de a
    if(a[campo]>b[campo]) return -1; 
    return 0; // retornar 0 significa que são iguais e não muda a ordem
  });
  renderTabela(cadastros);
}

function renderTabela(array){
  let corpo = $("#corpo-tabela");
  corpo.empty(); //apaga tudo que estava dentro dele

  for(let i=0; i< array.length; i++){
    let c= array[i];
    let linha=
      "<tr>"+
      "<td>" + c.codigo + "</td>" +
      "<td>" + c.nome + "</td>" +
      "<td>" + c.telefone + "</td>" +
      "<td>" + c.email + "</td>" +
      "<td>" +
      "<span class='editar' onclick=\"editarCadastro('"+c.codigo+"')\>✏</span> "+
      "<span class='editar' onclick=\"excluirCadastro('"+c.codigo+"')\>❌</span> "+
      "</td>"+
      "</tr>";
    corpo.append(linha);
  }
}

function limparForm(){
  $("#cod, #nome, #tel, #email").val("");
}
