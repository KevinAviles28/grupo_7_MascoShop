let qs = function(elemento){
    return document.querySelector(elemento)
}

window.addEventListener('load', function(){   

    let boton1=document.querySelector('#boton1');
    let passwordLogin=document.querySelector('#passwordLogin');
    
    let boton2=document.querySelector('#boton2');
    let passwordRegister=document.querySelector('#pass');

    let boton3=document.querySelector('#boton3');
    let passwordRegister2=document.querySelector('#pass2');
 
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
    boton1.addEventListener('click',function(){
        mostrarLaContraseña(passwordLogin,boton1)
    });  
     boton2.addEventListener('click',function(){
        mostrarLaContraseña(passwordRegister,boton2)
    });
    boton3.addEventListener('click',function(){
        mostrarLaContraseña(passwordRegister2,boton3)
    });  





    let $inputName=qs('#name'),
    $nameErrors=qs('#nameErrors'),
    $inputLastname=qs('#lastname'),
    $lastnameErrors=qs('#lastnameErrors'),
    $email=qs("#email"),
    $emailErrors=qs('#emailErrors'),
    $pass=qs("#pass")
    $passErrors=qs('#passErrors'),
    $pass2=qs('#pass2'),
    $pass2Errors=qs('#pass2Errors'),
    $avatar=qs('#avatar'),
    $avatarErrors=qs('#avatarErrors'),
    regExAlpha= /^[a-zA-Z\sñáéíóúü ]*$/,
    regExDNI= /^[0-9]{7,8}$/,
    regExEmail= /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    
    
    
    $inputName.addEventListener('blur', function(){
        console.log($inputName.value.trim())
        switch (true) {
            case !$inputName.value.trim():
            $nameErrors.innerHTML = 'El campo nombre es obligatorio'
            $inputName.classList.add('is-invalid')
            break;
            case !regExAlpha.test($inputName.value):
            $nameErrors.innerHTML = 'Debes ingresar un nombre válido'
            $inputName.classList.add('is-invalid')  
            break; 
            default:
            $inputName.classList.remove('is-invalid');
            $inputName.classList.add('is-valid');
            $nameErrors.innerHTML = ''
            break;
        }
    })
    
    $inputLastname.addEventListener('blur', function(){
        console.log($inputLastname.value.trim())
        switch (true) {
            case !$inputLastname.value.trim():
            $lastnameErrors.innerHTML = 'El campo apellido es obligatorio'
            $inputLastname.classList.add('is-invalid')
            break;
            case !regExAlpha.test($inputLastname.value):
            $lastnameErrors.innerHTML = 'Debes ingresar un apellido válido'
            $inputLastname.classList.add('is-invalid')  
            break; 
            default:
            $inputLastname.classList.remove('is-invalid');
            $inputLastname.classList.add('is-valid');
            $lastnameErrors.innerHTML = ''
            break;
        }
    })
    $email.addEventListener('blur', function() {
        switch (true) {
            case !$email.value.trim():
            $emailErrors.innerHTML = 'El campo email es obligatorio';
            $email.classList.add('is-invalid')
            break;
            case !regExEmail.test($email.value):
            $emailErrors.innerHTML = 'Debe ingresar un email válido';
            $email.classList.add('is-invalid')
            break
            default:
            $email.classList.remove('is-invalid');
            $email.classList.add('is-valid');
            $emailErrors.innerHTML = ''
            break;
        }
    })
    $pass.addEventListener('blur', function() {
        switch (true) {
            case !$pass.value.trim():
            $passErrors.innerHTML = 'El campo contraseña es obligatorio';
            $pass.classList.add('is-invalid')
            break;
            case !regExPass.test($pass.value):
            $passErrors.innerHTML = 'La contraseña debe tener: entre 8 o 12 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo';
            $pass.classList.add('is-invalid')
            break
            default:
            $pass.classList.remove('is-invalid');
            $pass.classList.add('is-valid');
            $passErrors.innerHTML = ''
            break;
        }
    })
    $pass2.addEventListener('blur', function(){
        switch (true) {
            case !$pass2.value.trim():
            $pass2Errors.innerHTML = 'Debes reingresar la contraseña';
            $pass2.classList.add('is-invalid')
            break;
            case $pass2.value != $pass.value:
            pass2Errors.innerHTML = 'Las contraseñas no coinciden';
            $pass2.classList.add('is-invalid')
            break;
            default:
            $pass2.classList.remove('is-invalid');
            $pass2.classList.add('is-valid');
            $pass2Errors.innerHTML = ''
            break;
        }
    })
    $avatar.addEventListener('change', 
    function fileValidation(){
        
        let filePath = $avatar.value, //Capturo el valor del input
        allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            $avatarErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $avatar.value = '';
            return false;
        }else{     
            $avatarErrors.innerHTML = '';
            $avatar.classList.remove('is-invalid')
        }       
    })
})