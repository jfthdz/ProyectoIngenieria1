var ofertaSeleccionada;

//Smooth scroll del nav_menu en LandingPage Bitbyte
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//subir foto de perfil en registrar candidato
function subirImagen(){
    let fotoPerfil = document.getElementById("img-perfil");
    let inputFotoPerfil = document.getElementById("inputFotoPerfil");
    
    inputFotoPerfil.onchange = function(){
        fotoPerfil.src = URL.createObjectURL(inputFotoPerfil.files[0]);
    }
    console.log(fotoPerfil);
}

function modificarImagen(){
    let fotoPerfil = document.getElementById("img-perfil-modificar");
    let inputFotoPerfil = document.getElementById("inputFotoPerfil");
    
    inputFotoPerfil.onchange = function(){
        fotoPerfil.src = URL.createObjectURL(inputFotoPerfil.files[0]);
    }
    console.log(fotoPerfil);
}

function cargarDatosUsuario() {
    try {
        var logoNav = document.querySelector("#nav_logo-buscoempleo");
        var logoFooter = document.querySelector("#footer_logo-buscoempleo");
        var opcionNav = document.querySelector("#opcionNav");
        var subMenu = document.querySelector("#sub-menu");
        var logoutBoton = document.querySelector("#divOpcionesNav > button");
        var imgPerfil = document.querySelector("#img-perfil");
        var usuarioLoggeado = obtenerDatosUsuario();
        var rutaFotoPeril;
    
        if (usuarioLoggeado) {
            var nombreUsuario = ""+usuarioLoggeado.nombre;
            var apellidoUsuario = ""+usuarioLoggeado.apellidos;
            var iniciales = `${nombreUsuario.slice(0,1)}${apellidoUsuario.slice(0,1)}`;
            rutaFotoPeril = usuarioLoggeado.foto;
            logoNav.href = "/candidato/HomePageLoggedCandidato.html";
            logoFooter.href = "/candidato/HomePageLoggedCandidato.html";
            opcionNav.href = "/candidato/modificarCuentaCandidato.html";
            document.querySelector("#barraBusquedaForm").action = "/candidato/mostrarOfertasTrabajo.html";
            opcionNav.innerText = iniciales;
            addFotoPerfil(rutaFotoPeril);
            console.log("Loggeado!!!!");
        }else{
            logoNav.href = "/unlogged/HomePageUnlogged.html";
            logoFooter.href = "/unlogged/HomePageUnlogged.html";
            opcionNav.href = "/unlogged/inicioSesion.html";
            subMenu.style.display = "none";
            logoutBoton.style.display = "none";
            imgPerfil.style.display = "none";
            console.log("No loggeado :(((");
        }
    } catch (error) {
        console.log(error);
    }
}

function obtenerDatosUsuario(){
    var datosUsuarioJSON = sessionStorage.getItem("datosUsuarioLoggeado");
    if(datosUsuarioJSON){
        return JSON.parse(datosUsuarioJSON);
    }else{
        return null;
    }
}

function cargarDatosEmpresa() {
    try {
        var logoNav = document.querySelector("#nav_logo-buscoempleo");
        var logoFooter = document.querySelector("#footer_logo-buscoempleo");
        var opcionNav = document.querySelector("#opcionNav");
        var subMenu = document.querySelector("#sub-menu");
        var logoutBoton = document.querySelector("#divOpcionesNav > button");
        var imgPerfil = document.querySelector("#img-perfil");
        var empresaLoggeada = obtenerDatosEmpresa();
        var integranteLoggeado = obtenerDatosIntegrante();
        var rutaFotoPeril;
    
        if (empresaLoggeada) {
            rutaFotoPeril = empresaLoggeada.foto;
            logoNav.href = "../empresa/HomePageLoggedEmpresa.html";
            logoFooter.href = "../empresa/HomePageLoggedEmpresa.html";
            opcionNav.href = "../empresa/modificarCuentaEmpresa.html";
            document.querySelector("#barraBusquedaForm").action = "../empresa/mostrarCandidatos.html";
            opcionNav.style.display = "none";
            addFotoPerfil(rutaFotoPeril);

            const opcionInvitar = document.querySelector("#options > ul > li:nth-child(3) > a");
            opcionInvitar.innerText = "Invitar usuario";
            opcionInvitar.href = "../empresa/invitarCandidatosEmpresa.html"

            const opciones = document.querySelector("#options-ul");
            const opcionUsuarios = document.createElement("li");
            const aUsuarios = document.createElement("a");

            aUsuarios.href = "/empresa/usuariosEmpresa.html";
            aUsuarios.innerText = "Usuarios";

            opcionUsuarios.appendChild(aUsuarios);
            opciones.appendChild(opcionUsuarios);

            console.log("Empresa loggeada!!!!");
        }else if(integranteLoggeado){
            rutaFotoPeril = integranteLoggeado.foto;
            logoNav.href = "../empresa/HomePageLoggedEmpresa.html";
            logoFooter.href = "../empresa/HomePageLoggedEmpresa.html";
            opcionNav.disabled = true;
            document.querySelector("#barraBusquedaForm").action = "../empresa/mostrarCandidatos.html";
            opcionNav.style.display = "none";
            addFotoPerfil(rutaFotoPeril);

            const opcionInvitar = document.querySelector("#options > ul > li:nth-child(3) > a");
            opcionInvitar.innerText = "Invitar candidato";
            opcionInvitar.href = "../empresa/invitarCandidatosPuesto.html"

            console.log("Integrante empresa loggeado!!!!");

            if(integranteLoggeado.integrante[0].rol === "Recluta"){
                const opciones = document.querySelector("#options-ul");
                if (opciones) {
                    const lisToRemove = opciones.querySelectorAll("li:nth-child(-n+2)");
                  
                    lisToRemove.forEach(li => {
                        opciones.removeChild(li);
                    });
                }
            }
        }else{
            logoNav.href = "../unlogged/HomePageUnlogged.html";
            logoFooter.href = "../unlogged/HomePageUnlogged.html";
            opcionNav.href = "../unlogged/inicioSesion.html";
            subMenu.style.display = "none";
            logoutBoton.style.display = "none";
            imgPerfil.style.display = "none";
            console.log("No loggeado :(((");
        }
    } catch (error) {
        console.log(error);
    }
}

function obtenerDatosEmpresa(){
    var datosEmpresaJSON = sessionStorage.getItem("datosEmpresaLoggeada");
    if(datosEmpresaJSON){
        return JSON.parse(datosEmpresaJSON);
    }else{
        return null;
    }
}

function obtenerDatosIntegrante(){
    var datosIntegranteJSON = sessionStorage.getItem("datosIntegranteLoggeado");
    if(datosIntegranteJSON){
        return JSON.parse(datosIntegranteJSON);
    }else{
        return null;
    }
}

function almacenarDatosCandidatos(candidato){
    sessionStorage.setItem(`candidato${candidato._id}`,JSON.stringify(candidato));
}

function almacenarDatosOfertas(oferta){
    sessionStorage.setItem(`oferta${oferta._id}`,JSON.stringify(oferta));
}

function obtenerDatosCandidatoSeleccionado(){
    var candidatoSeleccionadoJSON = sessionStorage.getItem("candidatoSeleccionado");
    if(candidatoSeleccionadoJSON){
        return JSON.parse(candidatoSeleccionadoJSON);
    }else{
        return null;
    } 
}

function obtenerDatosOfertaSeleccionada(){
    var ofertaSeleccionadaJSON = sessionStorage.getItem("ofertaSeleccionada");
    if(ofertaSeleccionadaJSON){
        return JSON.parse(ofertaSeleccionadaJSON);
    }else{
        return null;
    } 
}

function cargarDatosInvitarCandidato(){
    try {
        var nombreCandidato = document.querySelector("#nombreCandidato");
        var emailCandidato = document.querySelector("#emailCandidato");
    
        var candidato = obtenerDatosCandidatoSeleccionado();
    
        if(candidato){
            nombreCandidato.value = `${candidato.nombre} ${candidato.apellidos}`;
            emailCandidato.value = candidato.email;
        }
    } catch (error) {
        console.log(error);
    }
}

function eliminarDatosCandidatoSeleccionado(){
    sessionStorage.removeItem("candidatoSeleccionado");
}

function addFotoPerfil(rutaFoto){
    var fotoPerfilNav = document.querySelector("#divOpcionesNav img");
    fotoPerfilNav.style.display = "block";

    if(rutaFoto === "/images/fotoPerfilDefault.jpeg"){
        fotoPerfilNav.src = "/images/fotoPerfilDefault.jpeg";
    }else if(rutaFoto){
        const partes = rutaFoto.split("\\");
        const indiceUploads = partes.indexOf("uploads");
        const rutaCorredida = partes.slice(indiceUploads).join("/");
    
        fotoPerfilNav.src = `/${rutaCorredida}`;
    }else{
        fotoPerfilNav.src = "/images/fotoPerfilDefault.jpeg";
    }
}

function addFotoPerfilModificarCandidato(rutaFoto){
    var fotoPerfilModificar = document.querySelector("#img-perfil-modificar");

    if(rutaFoto === "/images/fotoPerfilDefault.jpeg"){
        fotoPerfilModificar.src = "/images/fotoPerfilDefault.jpeg";
    }else if(rutaFoto){
        const partes = rutaFoto.split("\\");
        const indiceUploads = partes.indexOf("uploads");
        const rutaCorredida = partes.slice(indiceUploads).join("/");
    
        fotoPerfilModificar.src = `/${rutaCorredida}`;
    }else{
        fotoPerfilModificar.src = "/images/fotoPerfilDefault.jpeg";
    }
}

function addFotoCandidato(rutaFoto){
    var fotoPerfilCandidato = document.querySelector("#img-perfil-candidato");

    if(rutaFoto === "/images/fotoPerfilDefault.jpeg"){
        fotoPerfilCandidato.src = "/images/fotoPerfilDefault.jpeg";
    }else if(rutaFoto){
        const partes = rutaFoto.split("\\");
        const indiceUploads = partes.indexOf("uploads");
        const rutaCorredida = partes.slice(indiceUploads).join("/");
    
        fotoPerfilCandidato.src = `/${rutaCorredida}`;
    }else{
        fotoPerfilCandidato.src = "/images/fotoPerfilDefault.jpeg";
    }
}

function addFotoEmpresaOfertaTrabajo(rutaFoto){
    var fotoPerfilEmpresa = document.querySelector("#img-perfil-contenido");

    if(rutaFoto === "/images/fotoPerfilDefault.jpeg"){
        fotoPerfilEmpresa.src = "/images/fotoPerfilDefault.jpeg";
    }else if(rutaFoto){
        const partes = rutaFoto.split("\\");
        const indiceUploads = partes.indexOf("uploads");
        const rutaCorredida = partes.slice(indiceUploads).join("/");
    
        fotoPerfilEmpresa.src = `/${rutaCorredida}`;
    }else{
        fotoPerfilEmpresa.src = "/images/fotoPerfilDefault.jpeg";
    }
}

function irModificarCuenta(){
    var usuarioLoggeado = obtenerDatosUsuario();
    var empresaLoggeada = obtenerDatosEmpresa();
    if(usuarioLoggeado){
        location.href = "../candidato/modificarCuentaCandidato.html";
    }else if(empresaLoggeada){
        location.href = "../empresa/modificarCuentaEmpresa.html";
    }
}

function cerrarSesion(){
    sessionStorage.clear();
    location.href = "../unlogged/HomePageUnlogged.html";
}

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