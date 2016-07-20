function preco(valor){
  //A função exibe um número positivo no formato R$ ##.###.###,##
  var formatado = "";
  //Separa a parte inteira da decimal:
  var valor_decimal = parseFloat(valor).toFixed(2);
  var partes = valor_decimal.toString().split('.');
  var tamanho = partes[0].length //tamanho da string da parte inteira
  var separador = ','; //separador decimal
  var i = 3; //contador para ler a string do fim para o começo
  while (i <= tamanho){
    formatado = partes[0].substr(-i,3) + separador + formatado;
    separador = "." //separador de milhar
    i += 3;
  }
  i = tamanho % 3;
  if (i != 0){
    formatado = partes[0].substr(0,i) + separador + formatado;
  }
  formatado = 'R$\xa0' + formatado + partes[1]
  return formatado;
}

function valor_total(fatura){
  var total = 0;
  for(var i = 0; i < fatura.length; i++){
    total = total + fatura[i][2] * fatura[i][3];
  }
  return total;  
}

var fatura = [];
var produtos = [];

function produto_nome(codigo) {
  for(indice in produtos){
    if((produtos[indice].cod).toString().search(codigo.toString()) == 0){
      return produtos[indice];
    }
  }  
}


$(document).ready(function(){

$.getJSON('produtos.json',function(data){
  produtos = data;
  $.each( data, function( chave, produto ){
    $('#input_nome').append('<option value="'+ produto.cod +'">' + produto.nome + '</option>');
  });
});


$('#input_nome').change(function(elemento){
  $('[name="codigo"]').val($(this).val());
});


$('#input_codigo').keyup(function(evento){
  if((evento.keyCode >= 48 && evento.keyCode <= 57) || evento.keyCode == 08 || evento.keyCode == 46
  || (evento.keyCode >= 37 && evento.keyCode <= 40) || (evento.keyCode >= 96 && evento.keyCode <= 105
 || evento.keyCode == 09)
  ){
    $('#input_nome').val(produto_nome($(this).val()).cod);
    return true;
  } else {
    return false;
  } 
  
});


$('#input_quant').keydown(function(evento){
  if((evento.keyCode >= 48 && evento.keyCode <= 57) || evento.keyCode == 08 || evento.keyCode == 46
  || (evento.keyCode >= 37 && evento.keyCode <= 40) || (evento.keyCode >= 96 && evento.keyCode <= 105
 || evento.keyCode == 09)
  ){
    return true;
  } else {
    return false;
  } 
});


$('#input_valor').keydown(function(evento){
  evento.preventDefault();
  //|| (evento.keyCode >= 96 && evento.keyCode <= 105)
  if((evento.keyCode >= 48 && evento.keyCode <= 57)){
    var val = $('#input_valor').data('valor') || '';
    var digitado = String.fromCharCode(evento.keyCode);
    $('#input_valor').data('valor', val + digitado);
    $('#input_valor').val(preco(val + digitado));
    return true;
  } else {
    return false;
  } 
});



$('#adicionar').click(function(){
  var codigo = $('[name="codigo"]').val();
  var nome = $('[name="nome"]').val();
  var quant = $('[name="quant"]').val();
  var valor = $('[name="valor"]').data('valor'); 
  
  var validado = true; //formulario inicialmente está validado
  $('#formulario div.erro').removeClass();
  $('#aviso').html("");
  
  $('#formulario input, #formulario select').each(function(indice,elemento){
    if($(elemento).val() == ''){
      $(elemento).parent().addClass("erro");
      $('#aviso').html("Preenchimento obrigatório");
      $(elemento).focus();
      validado = false;
    }    
  });
  
  if(!validado) return;
  
  registro = [codigo, nome, parseInt(quant), parseFloat(valor)];
  fatura.push(registro);
  
  var indice = 1 + $('tbody tr').length;
  var registro_html= '<tr><td>' + indice + 
  '</td><td>' + registro[0] + 
  '</td><td>' + registro[1] + 
  '</td><td>' + registro[2] + 
  '</td><td>' + preco(registro[3]) + 
  '</td><td>' + preco(registro[2] * registro[3]) + 
  '</td></tr>';
  
  $('#lista tbody').append(registro_html);
  $('#totalpedido').html(preco(valor_total(fatura)));
});


});
