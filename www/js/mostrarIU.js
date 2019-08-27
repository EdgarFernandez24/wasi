$(document).ready(function(){
    inicioSesion();
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
    $("#linkBuscarListaMapa").click(function(){
        event.preventDefault(); 
        $("#paginaPrincipal").css("display", "none");
        $("#paginaListaMapas").css("display", "block");
        $("#divFooter").css("display", "none");
    });     
    $("#btnAtras").click(function() {
        $("#paginaPrincipal").css("display", "block");
        $("#paginaListaMapas").css("display", "none");
        $("#divFooter").css("display", "block");            
        })
    $("#aBuscarLista").click(function(){
            $("#aBuscarLista").tab('show');
    });
    $("#aBuscarMapa").click(function(){
            $("#aBuscarMapa").tab('show');
    });

    /*pagina buscar */
    $("#icoBuscar").click(function(){
        //event.preventDefault();
        $(".icoFooter .glyphicon-search").css({"color":"#008080"});
        $(".icoFooter .glyphicon-upload").css({"color":"rgb(128, 128, 128,.8)"});
        $(".icoFooter .glyphicon-comment").css({"color":"rgb(128, 128, 128,.8)"});
        $(".icoFooter .glyphicon-user").css({"color":"rgb(128, 128, 128,.8)"});
        /*$("#icoBuscar").css({"transform":"scale(1.5,1)","width":"25%","color":"#00cccc"});        
        $("#icoSolicitud").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoChat").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoUsuario").css({"transform":"scale(1,1)","width":"15%"});
        $("#icoPublicar").css({"transform":"scale(1,1)","width":"15%"});
        */
        $("#paginaPrincipal").css("display", "block");
        $("#paginaListaMapas").css("display", "none");            
        $("#paginaPublicar").css("display", "none");                        
        $("#paginaMensaje").css("display", "none");            
        $("#paginaUsuarioPerfil").css("display", "none");
        
        $("#icoFMBuscar").css({"color":"#008080"});
        $("#icoFMPublicar").css({"color":"rgb(128, 128, 128,.8)"});                       
        $("#icoFMMensaje").css({"color":"rgb(128, 128, 128,.8)"});            
        $("#icoFMPerfil").css({"color":"rgb(128, 128, 128,.8)"});
    });

})
function inicioSesion(){
    $datosLocal=JSON.parse(localStorage.getItem('datosInicioSesion'));
    if($datosLocal!= undefined || $datosLocal!= null ){
       /* $.each($datosLocal, function(key, value){alert(key + ' = ' + value);});*/
        $("#nombreCompleto").html($datosLocal['usrName']);//http://192.168.1.145/wasiWeb/
        $("#imgPerfil").attr({"src":"http://192.168.0.161/wasiWeb/"+ $datosLocal['usrImg']});// fotos/eddyfer_77@hotmail.com/paisaje1.jpg}); //mostramos foto por defecto 
          
        //$("#imgP").html($datosLocal['usrImg']);
        $("body").css("background","#f2f2f2");
        $("#divInicio").css("display", "none");
        $("#divPrincipal").css("display", "block");
        $("#icoFMBuscar").css({"color":"#008080"});
        $(".icoFooter .glyphicon-search").css({"color":"#008080"});
        $idCliente = $datosLocal['usrId'];
        $emailCliente = $datosLocal['usrEmail'];    
        //alert($datosLocal['usrEmail'] + " " + $datosLocal['usrId']);
    }
}
function registrarUsuario(){ //evento activado por onsubmit en validarformulario.js
	event.preventDefault();
	$('mID').html("");
    $('mIS').html("");
    $.ajax({
       	type : 'POST',
        url: 'http://192.168.0.161/wasiWeb/php/registrar.php',
       	data:new FormData($('#formRegistro')[0]),
       	dataType: 'jsonp',
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
        url:'http://192.168.0.161/wasiWeb/php/ingresar.php', //'http://192.168.1.145/wasiWeb/php/ingresar.php',
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
