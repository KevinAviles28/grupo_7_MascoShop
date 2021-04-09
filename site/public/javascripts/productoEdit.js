window.addEventListener('load',function(){
    let imagenProductoNuevo=document.querySelector('#nuevaImagenProducto');
    let imagenProductoActual=document.querySelector('#imagenProductoActual');
    let $nuevaImgErrors=document.querySelector('#nuevaImgErrors')
    let $imagenPreview=document.querySelector('#imgPreviewEdit');
    /* imagenProductoNuevo.addEventListener('change',function fileValidation(){
        if(imagenProductoNuevo.files && imagenProductoNuevo.files[0]){
            imagenProductoActual.style.display = 'none';
            let reader = new FileReader();
            
            reader.onload = function(e){
                $imagenPreview.innerHTML = '<img src="' + e.target.result +'"/>';
            };
            reader.readAsDataURL(imagenProductoNuevo.files[0]);
    
        }
    }) */
    imagenProductoNuevo.addEventListener('change', 
    function fileValidation(){
        let filePath = imagenProductoNuevo.value, //Capturo el valor del input
        allowefExtensions = /(.jpg|.jpeg|.png|.gif)$/i //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            $nuevaImgErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            imagenProductoNuevo.value = '';
            $imagenPreview.innerHTML = '';
            return false;
        }else{
            // Image preview
            if(imagenProductoNuevo.files && imagenProductoNuevo.files[0]){
                imagenProductoActual.style.display = 'none';
                let reader = new FileReader();
                reader.onload = function(e){
                    $imagenPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL(imagenProductoNuevo.files[0]);
                $nuevaImgErrors.innerHTML = '';
                imagenProductoNuevo.classList.remove('is-invalid')
            }
        }
    })

    
})