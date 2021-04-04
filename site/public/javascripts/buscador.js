window.addEventListener('load',function(){
    let botonBusqueda=document.querySelector('#botonBusqueda');
    let inputBusqueda=document.querySelector('#inputBusqueda');
    let searchForm=document.querySelector('#searchForm');
    function cancelarBusqueda(boton,elInput){
        if(elInput.value==""){
            boton.type="button"
            searchForm.action="";
        }else{
            boton.type="submit";
            searchForm.action="/search"
        }
      
    }
    
    botonBusqueda.addEventListener('click',function(){
        cancelarBusqueda(botonBusqueda,inputBusqueda)
    })

})