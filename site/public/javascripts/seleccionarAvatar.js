window.addEventListener('load',function(){
let $imagenPredefinida=document.querySelectorAll('#aImagen');
let image1=document.querySelectorAll('#imagenPredefinada');
let $textoImagen=document.querySelector('#textoImagen');
/* let $inputAvatar=document.querySelector('#inputAvatar'); */
let $eleccion=document.querySelector('#eleccion');
let imagenElegida=document.querySelector('#ImagenElegidaxD');
let $elBonto=document.querySelector('#elBontm');

$imagenPredefinida.forEach(element=>{/* 0 */
    image1.forEach(laImagen=>{/* 0 */
        element.addEventListener('click',function(e){ 
            e.preventDefault();
            
                $textoImagen.innerHTML=" ";
                $textoImagen.innerHTML='<p style="color: black;">Imagen elegida: '+ laImagen.alt+' </p> ';
            });    
    })
    
})
/* $elBonto.addEventListener('click',function(){
    image1.forEach(element=>{
       let captura=element.alt
        console.log(captura)
    })
}) */

/* image1.forEach(element=>{
    element.addEventListener('click',function(e){
        e.preventDefault();
        $textoImagen.innerHTML=" "
        $textoImagen.innerHTML='<p style="color: black;">Imagen elegida: '+ element+' </p> '
    })
})
 */
/* $inputAvatar.innerHTML='<input class="form-control" type="text" placeholder="Img Elegida" aria-label="Disabled input example" disabled>' */


$eleccion.addEventListener('click',function(){
    /* $inputAvatar.innerHTML='<input name="img" class="form-control" type="text" value='+image1+'>' */
    imagenElegida.value="";
    imagenElegida.value=image1
    
});
});