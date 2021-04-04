 window.addEventListener('load',function(){
    let elBody=document.querySelector('body');
    let temaPreterminado=document.querySelector('#temaPreterminado');
    let temaOscuro=document.querySelector('#temaOscuro');
    let temaClaro=document.querySelector('#temaClaro');
   function quitarClases(){//elimina todas las clases
    while(elBody.classList.length>0){
        elBody.classList.remove(elBody.classList.item(0))
    }
   }

    temaClaro.addEventListener('click',function(){
       quitarClases();
        elBody.classList.add("modoClaro")
            localStorage.clear();//elimina todos los localStorage
            localStorage.setItem('cambioDeModo',elBody.className)//agrega un localStorage con el valor de la clase que acabo de agregar
        
    });
    temaOscuro.addEventListener('click',function(){
        quitarClases();
        elBody.classList.add('modoOscuro');
            localStorage.clear();//elimina todos los localStorage
            localStorage.setItem('cambioDeModo',elBody.className)//agrega un localStorage con el valor de la clase que acabo de agregar
        
        
    });
    temaPreterminado.addEventListener('click',function(){
        quitarClases();
        localStorage.clear()//elimina todos los localStorage
        
    });
    switch(localStorage.getItem('cambioDeModo')){//verifico que valor tiene localStorage para cambiar el modo a esas pagina con ese valor
        case 'modoClaro':
            quitarClases();
            elBody.classList.add("modoClaro");
        break;
        case 'modoOscuro':
            quitarClases();
            elBody.classList.add("modoOscuro");
        break;
        default:
            quitarClases()
        break;
    }

}) 