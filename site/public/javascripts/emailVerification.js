window.addEventListener('load',function(){
    let $emailDeRecuperacion=document.getElementById('emailDeRecuperacion');
    let $emailRecuperacionError=document.getElementById('emailRecuperacionError')
    let regExEmail= /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
     $emailDeRecuperacion.addEventListener('blur', function() {
        switch (true) {
            case !$emailDeRecuperacion.value.trim():
            $emailRecuperacionError.innerHTML = 'El campo email es obligatorio';
            $emailDeRecuperacion.classList.add('is-invalid')
            break;
            case !regExEmail.test($emailDeRecuperacion.value):
            $emailRecuperacionError.innerHTML = 'Debe ingresar un email válido';
            $emailDeRecuperacion.classList.add('is-invalid')
            break
            default:
            $emailDeRecuperacion.classList.remove('is-invalid');
            $emailDeRecuperacion.classList.add('is-valid');
            $emailRecuperacionError.innerHTML = ''
            break;
        }
    }) 

})