window.addEventListener('load',()=>{
    let $eliminarProducto = document.querySelectorAll('.eliminar-producto');/* llamamos a todas las class .eliminar-producto */
    
    $eliminarProducto.forEach(producto=>{/* iteramos el conjunto de clases */
        producto.addEventListener('submit',(e)=>{/* a cada uno le aplicamos el evento */
            e.preventDefault();
            let form = e.target;
            
            Swal.fire({/* metodo de Sweet alert 2 */
                title: '¿Deseas eliminar este producto?',/* titulo de la alerta */
                text: "Se borraran todos los datos",/* texto de la alerta */
                imageUrl: '/images/inst-pedido.png',/* url, ubicacion de la img */
                imageHeight: 200,/* tamaño de la img */
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar'
            }).then((result) => {
                if(result.value){
                    form.submit()
                }
            })
        })
    })
    
    let $eliminarUsuario = document.querySelectorAll('.eliminar-usuario');/* llamamos a todas las class .eliminar-producto */
    
    $eliminarUsuario.forEach(usuario=>{/* iteramos el conjunto de clases */
        usuario.addEventListener('submit',(e)=>{/* a cada uno le aplicamos el evento */
            e.preventDefault();
            let form = e.target;
            
            Swal.fire({/* metodo de Sweet alert 2 */
                title: '¿Deseas eliminar este producto?',/* titulo de la alerta */
                text: "Se borraran todos los datos",/* texto de la alerta */
                imageUrl: '/images/inst-pedido.png',/* url, ubicacion de la img */
                imageHeight: 200,/* tamaño de la img */
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar'
            }).then((result) => {
                if(result.value){
                    form.submit()
                }
            })
        })
    })
    
    let $miCuenta = document.querySelector('.eliminar-mi-cuenta');/* llamamos a la class*/
    
    $miCuenta.addEventListener('submit',(e)=>{/* aplicamos el evento */
        e.preventDefault();
        let form = e.target;
        
        Swal.fire({/* metodo de Sweet alert 2 */
            title: '¿Deseas eliminar este producto?',/* titulo de la alerta */
            text: "Se borraran todos los datos",/* texto de la alerta */
            imageUrl: '/images/inst-pedido.png',/* url, ubicacion de la img */
            imageHeight: 200,/* tamaño de la img */
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if(result.value){
                form.submit()
            }
        })
    })
    
    
})

