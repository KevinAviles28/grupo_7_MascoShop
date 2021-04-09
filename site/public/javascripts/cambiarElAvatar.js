window.addEventListener('load',function(){
    let nuevaImagen=document.querySelector('#nuevaImagen');
    let imagenActual=document.querySelector('#imagenActual');
    nuevaImagen.addEventListener('change',function fileValidation(){
        if(nuevaImagen.files && nuevaImagen.files[0]){
            imagenActual.style.display = 'none';
            let reader = new FileReader();
            
            reader.onload = function(e){
                document.getElementById('previsualizacion').innerHTML = '<img src="' + e.target.result +'" style="width: 200px; height: 200px; object-fit: cover"/>';
            };
            
            reader.readAsDataURL(nuevaImagen.files[0]);
            
        }
    })
    
})