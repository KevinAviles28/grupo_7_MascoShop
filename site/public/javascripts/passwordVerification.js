window.addEventListener('load',function(){
    let $contraseniaNueva=document.getElementById('contraseniaNueva');
    let $contraNuevaError=document.getElementById('contraNuevaError');
    let regExPass= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;

    let $bontonDeCambio=document.querySelector('#botonDeCambio');
    
    
    function mostrarLaContraseña(password,boton){
        if(password.type=="password"){
            password.type="text";
            boton.classList.remove("fa-eye")
            boton.classList.add("fa-eye-slash");
        }else{
            password.type = "password";
            boton.classList.remove("fa-eye-slash");
            boton.classList.add("fa-eye");
        }
    }
    $bontonDeCambio.addEventListener('click',function(){
        mostrarLaContraseña(contraseniaNueva,$bontonDeCambio)
    });  




    $contraseniaNueva.addEventListener('blur', function() {
        switch (true) {
            case !$contraseniaNueva.value.trim():
            $contraNuevaError.innerHTML = 'El campo contraseña es obligatorio';
            $contraseniaNueva.classList.add('is-invalid')
            break;
            case !regExPass.test($contraseniaNueva.value):
            $contraNuevaError.innerHTML = 'La contraseña debe tener: entre 8 o 12 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo';
            $contraseniaNueva.classList.add('is-invalid')
            break
            default:
            $contraseniaNueva.classList.remove('is-invalid');
            $contraseniaNueva.classList.add('is-valid');
            $contraNuevaError.innerHTML = ''
            break;
        }
    })

})