

window.addEventListener('load', function(){   
    let $nombre=qs('#nombre'),
    $nombreErrors=qs('#nombreErrors'),
    $ps=qs("#ps"),
    $psErrors=qs("#precioErrors"),
    $stock=qs("#stock"),
    $stockErrors=qs("#stockErrors"),
    $desc=qs("#desc"),
    $descErrors=qs("#descErrors"),
    $descr=qs("#descr"),
    $descrErrors=qs("#descrErrors"),
    $img=qs("#img"),
    $imgErrors=qs("#imgErrors"),
    regExAlpha= /^[a-zA-Z\sñáéíóúü ]*$/,
    regnumber= /^[0-9]{0,100000}$/;
    
    
    
    $nombre.addEventListener('blur', function(){
        console.log($nombre.value.trim())
        switch (true) {
            case !$nombre.value.trim():
            $nombreErrors.innerHTML = 'El campo nombre es obligatorio'
            $nombre.classList.add('is-invalid')
            break;
            case !regExAlpha.test($nombre.value):
            $nombreErrors.innerHTML = 'Debes ingresar un nombre válido'
            $nombre.classList.add('is-invalid')  
            break; 
            default:
            $nombre.classList.remove('is-invalid');
            $nombre.classList.add('is-valid');
            $nombreErrors.innerHTML = ''
            break;
        }
    })
    $ps.addEventListener('blur', function(){
        console.log($ps.value.trim())
        switch (true) {
            case !$ps.value.trim():
            $psErrors.innerHTML = 'El campo precio es obligatorio'
            $ps.classList.add('is-invalid')
            break;
            case !regnumber.test($ps.value):
            $psErrors.innerHTML = 'Debes ingresar un precio válido'
            $ps.classList.add('is-invalid')  
            break; 
            default:
            $ps.classList.remove('is-invalid');
            $ps.classList.add('is-valid');
            $psErrors.innerHTML = ''
            break;
        }
    })
    $stock.addEventListener('blur', function(){
        console.log($stock.value.trim())
        switch (true) {
            case !$stock.value.trim():
            $stockErrors.innerHTML = 'El campo stock es obligatorio'
            $stock.classList.add('is-invalid')
            break;
            case !regnumber.test($stock.value):
            $stockErrors.innerHTML = 'Debes ingresar un stock válido'
            $stock.classList.add('is-invalid')  
            break; 
            default:
            $stock.classList.remove('is-invalid');
            $stock.classList.add('is-valid');
            $stockErrors.innerHTML = ''
            break;
        }
    })
    $desc.addEventListener('blur', function(){
        console.log($desc.value.trim())
        switch (true) {
            case !$desc.value.trim():
            $descErrors.innerHTML = 'El campo descuento es obligatorio'
            $desc.classList.add('is-invalid')
            break;
            case !regnumber.test($desc.value):
            $descErrors.innerHTML = 'Debes ingresar un descuento válido'
            $desc.classList.add('is-invalid')  
            break; 
            default:
            $desc.classList.remove('is-invalid');
            $desc.classList.add('is-valid');
            $descErrors.innerHTML = ''
            break;
        }
    })
    $descr.addEventListener('blur', function(){
        console.log($descr.value.trim())
        switch (true) {
            case !$descr.value.trim():
            $descrErrors.innerHTML = 'El campo descripcion es obligatorio'
            $descr.classList.add('is-invalid')
            break;
            case !regExAlpha.test($descr.value):
            $descrErrors.innerHTML = 'Debes ingresar un descripcion válido'
            $descr.classList.add('is-invalid')  
            break; 
            default:
            $descr.classList.remove('is-invalid');
            $descr.classList.add('is-valid');
            $descrErrors.innerHTML = ''
            break;
        }
    })
    $img.addEventListener('change', 
    function fileValidation(){
        
        let filePath = $img.value, //Capturo el valor del input
        allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            $imgErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $img.value = '';
            return false;
        }else{     
            $imgErrors.innerHTML = '';
            $img.classList.remove('is-invalid')
        }       
    })
    
})