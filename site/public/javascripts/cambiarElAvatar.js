window.addEventListener('load',function(){
let nuevaImagen=document.querySelector('#nuevaImagen');
let imagenActual=document.querySelector('#imagenActual');
let laPrevisualizacion=document.querySelector('#previsualizacion');
let erroresAvatar=document.querySelector('#nuevaImagenAvatar');

nuevaImagen.addEventListener('change', 
    function fileValidation(){
        let filePath = nuevaImagen.value, //Capturo el valor del input
        allowefExtensions = /(.jpg|.jpeg|.png|.gif)$/i //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            erroresAvatar.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            nuevaImagen.value = '';
            laPrevisualizacion.innerHTML = '';
            return false;
        }else{
            // Image preview
            if(nuevaImagen.files && nuevaImagen.files[0]){
                imagenActual.style.display = 'none';
                let reader = new FileReader();
                reader.onload = function(e){
                    laPrevisualizacion.innerHTML = '<img src="' + e.target.result +'" style="width: 200px; height: 200px; object-fit: cover"/>'
                    ;

                };
                reader.readAsDataURL(nuevaImagen.files[0]);
                erroresAvatar.innerHTML = '';
                nuevaImagen.classList.remove('is-invalid')
            }
        }
    })

    /* let reader = new FileReader();
        
        reader.onload = function(e){
            document.getElementById('previsualizacion').innerHTML = '<img src="' + e.target.result +'" id="lacosaxd"/>';
        }; */

})