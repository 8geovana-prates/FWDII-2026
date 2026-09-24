let cadastros=[];

$(document).ready(function(){
  carregarDados();
$("#btnSalvar").ready(function(){
  salvarCadastro();
});

$("#btnOrderCod").ready(function(){
  ordenarPor();
});

$("#btnOrderName").ready(function(){
  ordenarPor();
});
});

function carregarDados(){
  $.getJSON("infos.json")
  .done(function(dadosArquivo){
    let salvos=localStorage.getItem("cadastros");
    );
  if(salvos){
    cadastros=JSON.parse(salvos);
  }
  else{
    cadastros=dadosArquivo;
    localStorage.setItem("cadastros", JSON.stringify(cadastros));
  }
  renderTabela(cadastros);
})
.fail(fuction(){
  let salvos=localStorage.getItem("cadastros");
  cadastros=salvos ? JSON.parse(salvos) : [];
  renderTabela(cadastros);
  
  if(!salvos){
    console.warn("Não foi possível ler infos.json. Rode a página por um serviro local.");
  }
});
}

function salvarCadastro(){
  let codigo=$("#cod").val().trim();
  let nome=$("#nome").val().trim();
  let telefone=$("#tel").val().trim();
  let email=$("#email").val().trim();

  if(!codigo || !nome){
  alert("O código e o nome são campos obrigatórios!");
    return;
  }

  let indiceExistente=cadastros.findIndex(function(c){
    return c.codigo===codigo;
  }
  )};
let registro={codigo: codigo, nome: nome, telefone: telefone, email: email};

if(indiceExistente>=0){
cadastros[indiceExistente]=(registro);
}
localStorage.setItem("cadastros", JSON.stringfy(cadastros));
renderTabela(cadastros);
limparForm();
}

function editarCadastro(codigo){
  let registro=cadastros.find(
    function(c){
      if(!registro) return;
      $("#cod").val(registro.codigo);
      $("#nome").val(registro.nome);
      $("#tel").val(registro.telefone);
      $("#email").val(registro.email);
    });
}
    function excluirCadastro(codigo){
      if(!confirm("Excluir o cadastro " + codigo + "?")) return;
    cadastros =cadastros.filter(
      function(c){
        return c.codigo!==codigo;
      });
    localStorage.setItem("cadastros", JSON.stringfy(cadastros));
    renderTabela(cadastros);
  }
  
function ordernarPor(cadastros){
  cadastros.sort(function (a, b){
    if(a[campo]<b[campo]) return -1;
    if(a[campo]>b[campo]) return -1;
    return 0;
  });
  renderTabela(cadastros);
}

function renderTabela(array){
  let corpo = $("#corpo-tabela");
  corpo.empty();

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
  $("#cod", "#nome", "#tel", "#email").val("");
}
