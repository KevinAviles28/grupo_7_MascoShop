window.addEventListener('load',()=>{
    let $file = document.querySelector('#file');
    let $imgPreview = document.querySelector('#img-preview');

    $file.addEventListener('change',()=>{
        console.log($file.files);
        if($file.files && $file.files[0]){
            let reader = new FileReader();
            reader.onload = function(e){
                $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
            };
            reader.readAsDataURL($file.files[0]);
        }
    })
})