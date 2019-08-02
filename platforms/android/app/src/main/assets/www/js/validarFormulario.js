
$(document).ready(function(){
    $("#nombre").change(function(){ //validar nombre
        $nombre = $("#nombre").val();       
        if(!(/^[a-zA-Z ]+$/.test($nombre))) {
            $nombreError = "El nombre debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorNombre").html($nombreError);
            return false;
            //$error = false;            
        } else{
            //
            $("#mensajeErrorNombre").html("");
        }
    });
    $("#apellidos").change(function(){ //validar apellidos
        $apellidos = $("#apellidos").val();
        if(!(/^[a-zA-Z ]+$/.test($apellidos))) {
            $apellidosError = "Los apellidos debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorApellidos").html($apellidosError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorApellidos").html("");
        }
    });
    $("#inEmail").change(function(){
        $inEmail = $("#inEmail").val();         
        if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($inEmail))) {
            $inEmailError = "Ingresa un correo electrónico válido.";
            $("#mensajeErrorEmailI").html($inEmailError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorEmailI").html("");
        }
        /*if ($("#inEmail").val()==" ") {
            $("#mensajeErrorEmailI").html("");
        }*/
    })

    $("#EmailR").change(function(){ //validar email
        $email = $("#EmailR").val();         
        if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($email))) {
            $emailError = "Ingresa un correo electrónico válido.";
            $("#mensajeErrorEmailR").html($emailError);
            return false;
            //$error = false;
        } else{
            $("#EmailR").blur(function(){
                $vEmail = $("#EmailR").val();                   
                $.ajax({
                    type: "POST",
                    dataType: 'html',
                    url: 'http://192.168.1.145/wasiWeb/php/consultaEmail.php',
                    //data: {email : $('#email').val()},
                    data: "email="+$vEmail,
                    success: function(resp){                                                  
                        if(resp){
                            $('#mensajeErrorEmailR').html(resp);                                    
                        }
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                        alert(jqXHR.status +" "+ textStatus+" "+ errorThrown);
                    }
                });
            });
            $("#mensajeErrorEmailR").html("");
        }
    });    
    $("#contrasenya").change(function(){ //validar contraseña
        $password = $("#contrasenya").val();       
        if($password == null || $password.length < 6 ) {
            $passwordError = "La contraseña debe tener un mínimo de 6 caracteres.";
            $("#mensajeErrorContrasenya").html($passwordError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorContrasenya").html("");
        }
    });
    $("#cContrasenya").change(function(){ //validar contraseña
        $cPassword = $("#cContrasenya").val();
        $password = $("#contrasenya").val();        
        if($cPassword != $password ) {
            $cPasswordError = "Las contraseñas no coinciden.";
            $("#mensajeErrorCContrasenya").html($cPasswordError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorCContrasenya").html("");
        }
    });
    $("#formIngreso").submit(function(){
        //$error=true;    
        
        $inEmail = $("#inEmail").val();         
        if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($inEmail))) {
            $inEmailError = "Ingresa un correo electrónico válido.";
            $("#mensajeErrorEmailI").html($inEmailError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorEmailI").html("");
        }
        /*if ($("#inEmail").val()==" ") {
            $("#mensajeErrorEmailI").html("");
        }*/
        $inPassword = $("#inPassword").val();       
        if($inPassword == null || $inPassword.length < 6 ) {
            $inPasswordError = "La contraseña debe tener un mínimo de 6 caracteres.";
            $("#mensajeErrorPasswordI").html($inPasswordError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorPasswordI").html("");
        }
       iniciarSession();     
    });
    $("#formRegistro").submit(function(){
        //$error=true;
    
        $nombre = $("#nombre").val();       
        if(!(/^[a-zA-Z ]+$/.test($nombre))) {
            $nombreError = "El nombre debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorNombre").html($nombreError);
            return false;            
            //$error = false;
        } else{
            //
            $("#mensajeErrorNombre").html("");
        }
        $apellidos = $("#apellidos").val();
        if(!(/^[a-zA-Z ]+$/.test($apellidos))) {
            $apellidosError = "Los apellidos debe contener solo caracteres del alfabeto y espacio.";        
            $("#mensajeErrorApellidos").html($apellidosError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorApellidos").html("");
        }

        $emailR = $("#EmailR").val(); 
        
        if (!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test($emailR))) {
            $emailError = "Ingresa un correo electrónico válido.";
            $("#mensajeErrorEmailR").html($emailError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorEmail").html("");
        }      

        $password = $("#contrasenya").val();       
        if($password == null || $password.length < 6 ) {
            $passwordError = "La contraseña debe tener un mínimo de 6 caracteres.";
            $("#mensajeErrorContrasenya").html($passwordError);
            return false;
            //$error = false;
        } else{
            //
            $("#mensajeErrorContrasenya").html("");
        }
        $cPassword = $("#cContrasenya").val();
        $password = $("#contrasenya").val();        
        if($cPassword != $password ) {
            $cPasswordError = "Las contraseñas no coinciden.";
            $("#mensajeErrorCContrasenya").html($cPasswordError);
            return false;
           // $error = false;
        } else{
            //
            $("#mensajeErrorCContrasenya").html("");
        }
       registrarUsuario();     
    });
});