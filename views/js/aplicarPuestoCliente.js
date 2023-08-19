function aplicarPuesto(){
    var usuarioLoggeado = obtenerDatosUsuario();
    var empresaLoggeada = obtenerDatosEmpresa();

    if(usuarioLoggeado || empresaLoggeada){
        var mensajeExito = document.querySelector("#mensajeExito");
        mensajeExito.style.display = "flex";
        setTimeout(function() {
            mensajeExito.classList.add("mostrar");
        }, 100); 
        setTimeout(function() {
            mensajeExito.classList.remove("mostrar");
        }, 3000); 
        setTimeout(function() {
            mensajeExito.style.display = "none";
        }, 3500);  
    }else{
        var mensajeWarning = document.querySelector("#mensajeWarning");
        mensajeWarning.style.display = "flex";
        setTimeout(function() {
            mensajeWarning.classList.add("mostrar");
        }, 100); 
        setTimeout(function() {
            mensajeWarning.classList.remove("mostrar");
        }, 3000); 
        setTimeout(function() {
            mensajeWarning.style.display = "none";
        }, 3500);  
    }
}