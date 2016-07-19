function preco(valor){
  //A função exibe um número positivo no formato R$ ##.###.###,##
  var formatado = "";
  //Separa a parte inteira da decimal:
  var partes = valor.toFixed(2).toString().split('.');
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
  return 'R$\xa0' + formatado + partes[1];
}

function valor_total(fatura){
  var total = 0;
  for(var i = 0; i < fatura.length; i++){
    total = total + fatura[i][2] * fatura[i][3];
  }
  return total;  
}

var fatura = [];


$(document).ready(function(){

$('#input_quant').keydown(function(evento){
  // console.log(evento.keyCode);
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
  // console.log(evento.keyCode);
  if((evento.keyCode >= 48 && evento.keyCode <= 57) || evento.keyCode == 08 || evento.keyCode == 46
  || (evento.keyCode >= 37 && evento.keyCode <= 40) || (evento.keyCode >= 96 && evento.keyCode <= 105
 || evento.keyCode == 09)
  ){
    var val = $('#input_valor').val();
    var digitado = String.fromCharCode(evento.keyCode);
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
  var valor = $('[name="valor"]').val(); 
  
  var validado = true; //formulario inicialmente está validado
  $('#formulario div.erro').removeClass();
  $('#aviso').html("");
  
  $('#formulario input').each(function(indice,elemento){
    if($(elemento).val() == ''){
      $(elemento).parent().addClass("erro");
      $('#aviso').html("Preenchimento obrigatório");
      $(elemento).focus();
      validado = false;
    }    
  });
  
  if(!validado) return;
  
  
  
  
  
/*  if(codigo =='') {
    $('[name="codigo"]').parent().addClass("erro");
    //$('#lb_codigo').addClass("erro");
    $('#aviso').html("Preenchimento obrigatório");
    $('[name="codigo"]').focus();
    return;
  };
  if(nome =='') {
    $('[name="nome"]').parent().addClass("erro");
    $('#aviso').html("Preenchimento obrigatório");
    $('[name="nome"]').focus();
    return;
  };
  if(quant =='') {
    $('[name=quant]').parent().addClass("erro");
    //$('#lb_codigo').addClass("erro");
    $('#aviso').html("Preenchimento obrigatório");
    $('[name="quant"]').focus();
    return;
  };
  if(valor =='') {
    $('[name="valor"]').parent().addClass("erro");
    //$('#lb_codigo').addClass("erro");
    $('#aviso').html("Preenchimento obrigatório");
    $('[name="valor"]').focus();
    return;
  }; */
  
  
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
