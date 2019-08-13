$(document).ready(function(){
	 /* mostrar tabs divInicio inicio sesion y registrar*/            
    $("#aRegistrar").click(function(){
        $("#aRegistrar").tab('show');
        $('#formRegistro')[0].reset();
    });    
    $("#aIngresar").click(function(){
        $("#aIngresar").tab('show');
    });
    $("#linkRegistrar").click(function(){
        $("#aRegistrar").tab('show');
    });
})
	function registrarUsuario(){ //evento activado por onsubmit en validarformulario.js
		event.preventDefault();
		$('mID').html("");
        $('mIS').html("");
    	$.ajax({
        	type : 'POST',
            url: 'http://127.0.0.1/wasiWeb/php/registrar.php',
        	data:new FormData($('#formRegistro')[0]),
        	dataType: 'json',
        	cache: false,
        	contentType: false,
        	processData: false,
        	success: function(datosR)
        	{  $("#aIngresar").tab('show');
            	if(datosR.uReg==1){
                	$('#mIS').html(datosR.msg + " " + datosR.umEmail);}
                	if(datosR.uReg==0){
                    	$('#mID').html(datosR.msg);}
                //alert(datosR.uReg);
        	},
        	error : function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.status +" "+ textStatus+" "+ errorThrown);
        	}
    	});    
	}
function iniciarSession(){
    $('#mIS').html(" ");
    $('#mID').html(" ");
    //alert("entra btn inicio");
    event.preventDefault();
    $.ajax({
        //
        type :'POST',
        url:'http://127.0.0.1/wasiWeb/php/ingresar.php', //'http://192.168.1.145/wasiWeb/php/ingresar.php',
        dataType : 'json',        
        data: new FormData($("#formIngreso")[0]),        
        //async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(datosI){   
            //alert("entra ajax");
            if(datosI.usr==1){
                $datosRemoto=JSON.stringify(datosI);
                localStorage.setItem('datosInicioSesion', $datosRemoto);
                //alert($datosRemoto);
                $("#divInicio").css("display", "none");
                $("#divPrincipal").css("display", "block");
                $('#paginaListaMapas').css("display", "none");
                inicioSesion();
            }
            if (datosI.usr <= 0) {
                    
                   $("#mID").html(datosI.mensaje);
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            alert("error de ajax: " + jqXHR.status + " " + textStatus + " " + errorThrown);
        }
    });    
}
