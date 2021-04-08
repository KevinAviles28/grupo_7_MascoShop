window.addEventListener('load',function(){
let nuevaImagen=document.querySelector('#nuevaImagen');
let imagenActual=document.querySelector('#imagenActual');
nuevaImagen.addEventListener('change',function fileValidation(){
    if(nuevaImagen.files && nuevaImagen.files[0]){
        imagenActual.style.display = 'none';
        let reader = new FileReader();
        
        reader.onload = function(e){
            document.getElementById('previsualizacion').innerHTML = '<img src="' + e.target.result +'"/>';
        };/* `<img src="'  ${e.target.result} ${id="cambio"}'"/>` */
        /* '<img src="' + e.target.result +'"/>' */
        console.log('vientos')
        reader.readAsDataURL(nuevaImagen.files[0]);

    }
})

    /* let reader = new FileReader();
        
        reader.onload = function(e){
            document.getElementById('previsualizacion').innerHTML = '<img src="' + e.target.result +'" id="lacosaxd"/>';
        }; */

})