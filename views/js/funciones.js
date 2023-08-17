var codigoVerificacion;
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

//Validar campos vacios invitar candidato
function validarFormularioInvitarCandidato() {
    try {
        event.preventDefault();
        var nombreCandidato = document.getElementById("nombreCandidato");
        var emailCandidato = document.getElementById("emailCandidato");
        var rolCandidato = document.getElementsByName("rolCandidato")[0];
        var camposIncompletos = false;

        var errorNombreCandidato = document.getElementById("errorNombreCandidato");
        var errorEmailCandidato = document.getElementById("errorEmailCandidato");
        var errorRol = document.getElementById("errorRol");

        //expresión regular para validar formato de correo
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

        if (nombreCandidato.value === "") {
            nombreCandidato.style.border = "1px solid var(--redError)";
            errorNombreCandidato.innerText = "*Campo necesario";
            errorNombreCandidato.style.display = "block";
            camposIncompletos = true;
        } else {
            nombreCandidato.style.border = "0";
            errorNombreCandidato.innerText = "";
            errorNombreCandidato.style.display = "none";
        }

        if (emailCandidato.value === "") {
            emailCandidato.style.border = "1px solid var(--redError)";
            errorEmailCandidato.innerText = "*Campo necesario";
            errorEmailCandidato.style.display = "block";
            camposIncompletos = true;
        } else if(regexEmail.test(emailCandidato.value)==false){
            emailCandidato.style.border = "1px solid var(--redError)";
            errorEmailCandidato.innerText = "*Ingrese un correo válido";
            errorEmailCandidato.style.display = "block";
            camposIncompletos = true;
        }else{
            emailCandidato.style.border = "0";
            errorEmailCandidato.innerText = "";
            errorEmailCandidato.style.display = "none";
        }

        var valorRolSeleccionado = rolCandidato.value;
        if (valorRolSeleccionado!="default") {
            errorRol.innerText = "";
            errorRol.style.display = "none";
        }else{
            errorRol.innerText = "*Debe seleccionar una opción";
            errorRol.style.display = "block";
            camposIncompletos = true;
        }

        // Si se encontraron campos incompletos, detener el envío del formulario
        if (camposIncompletos) {
            return false;
        }else{
            var mensajeExito = document.querySelector("#mensajeExito");
            mensajeExito.style.display = "flex";
            setTimeout(function() {
                mensajeExito.classList.add("mostrar");
            }, 100); 
            limpiarCamposInvitarCandidato();
            setTimeout(function() {
                mensajeExito.classList.remove("mostrar");
            }, 3000); 
            setTimeout(function() {
                mensajeExito.style.display = "none";
            }, 3500); 
            eliminarDatosCandidatoSeleccionado();
        }
    } catch (error) {
        console.log(error);
    }
}

function validarCampoCorreo(){
    try {
        event.preventDefault();
        var emailCandidato = document.getElementById("emailCandidato");
        var errorEmailCandidato = document.getElementById("errorEmailCandidato");
        var camposIncompletos = false;
        //expresión regular para validar formato de correo
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if (emailCandidato.value === "") {
            emailCandidato.style.border = "1px solid var(--redError)";
            errorEmailCandidato.innerText = "*Campo necesario";
            errorEmailCandidato.style.display = "block";
            camposIncompletos = true;
        } else if(regexEmail.test(emailCandidato.value)==false){
            emailCandidato.style.border = "1px solid var(--redError)";
            errorEmailCandidato.innerText = "*Ingrese un correo válido";
            errorEmailCandidato.style.display = "block";
            camposIncompletos = true;
        }else{
            emailCandidato.style.border = "0";
            errorEmailCandidato.innerText = "";
            errorEmailCandidato.style.display = "none";
            camposIncompletos = false;
        }

        if (camposIncompletos) {
            return false;
        }else{
            enviarCodigoVerificacion();
        }
        
    } catch (error) {
        console.log(error);
    }
}

function validarCamposNuevoPassword(){
    try {
        event.preventDefault();
        var campoCodigoVerificacion = document.getElementById("codigoVerificacion");
        var errorCodigoVerificacion = document.getElementById("errorCodigoVerificacion");
        var nuevoPassword = document.getElementById("nuevoPassword");
        var errorNuevoPassword = document.getElementById("errorNuevoPassword");
        var camposIncompletos = false;

        if (campoCodigoVerificacion.value === "") {
            campoCodigoVerificacion.style.border = "1px solid var(--redError)";
            errorCodigoVerificacion.innerText = "*Campo necesario";
            errorCodigoVerificacion.style.display = "block";
            camposIncompletos = true;
        } else {
            campoCodigoVerificacion.style.border = "0";
            errorCodigoVerificacion.innerText = "";
            errorCodigoVerificacion.style.display = "none";
            camposIncompletos = false;
        }

        if (nuevoPassword.value === "") {
            nuevoPassword.style.border = "1px solid var(--redError)";
            errorNuevoPassword.innerText = "*Campo necesario";
            errorNuevoPassword.style.display = "block";
            camposIncompletos = true;
        } else {
            nuevoPassword.style.border = "0";
            errorNuevoPassword.innerText = "";
            errorNuevoPassword.style.display = "none";
            camposIncompletos = false;
        }

        if (camposIncompletos) {
            return false;
        }else{
            if (campoCodigoVerificacion.value !== codigoVerificacion.toString()) {
                campoCodigoVerificacion.style.border = "1px solid var(--redError)";
                errorCodigoVerificacion.innerText = "*Código de verificación incorrecto";
                errorCodigoVerificacion.style.display = "block";
                camposIncompletos = true;
            } else if(campoCodigoVerificacion.value === codigoVerificacion.toString()) {
                var mensajeExito = document.querySelector("#mensajeExito");
                mensajeExito.style.display = "flex";
                setTimeout(function() {
                    mensajeExito.classList.add("mostrar");
                }, 100); 
                limpiarCamposNuevoPassword();
                setTimeout(function() {
                    mensajeExito.classList.remove("mostrar");
                }, 3000); 
                setTimeout(function() {
                    mensajeExito.style.display = "none";
                }, 3500); 
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function limpiarCamposNuevoPassword(){
    var campoCodigoVerificacion = document.getElementById("codigoVerificacion");
    var nuevoPassword = document.getElementById("nuevoPassword");
    var emailCandidato = document.getElementById("emailCandidato");

    campoCodigoVerificacion.value = "";
    nuevoPassword.value = "";
    emailCandidato.value = "";
}

function limpiarCamposInvitarCandidato(){
    var nombreCandidato = document.getElementById("nombreCandidato");
    var emailCandidato = document.getElementById("emailCandidato");
    var rolCandidato = document.getElementsByName("rolCandidato")[0];

    nombreCandidato.value = "";
    emailCandidato.value = "";
    rolCandidato.value = "default";
}

//Validar barra de busqueda vacia en el HomePage
function validarBusquedaHomePage(){
 /*   try {
        var formulario = document.getElementById("barraBusquedaForm");
        var barraBusqueda = document.querySelector("input[name=barra-busqueda]");
        var errorBusqueda = document.querySelector("#errorBusqueda");

        if(barraBusqueda.value === ""){
            formulario.classList.add("borde-rojo");
            errorBusqueda.innerText = "*Campo necesario";
            errorBusqueda.style.display = "block";
            setTimeout(function() {
                formulario.classList.remove("borde-rojo");
                errorBusqueda.innerText = "";
                errorBusqueda.style.display = "none";
            }, 2000);  
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    } */
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
        var rutaFotoPeril;
    
        if (empresaLoggeada) {
            rutaFotoPeril = empresaLoggeada.foto;
            logoNav.href = "../empresa/HomePageLoggedEmpresa.html";
            logoFooter.href = "../empresa/HomePageLoggedEmpresa.html";
            opcionNav.href = "../empresa/modificarCuentaEmpresa.html";
            document.querySelector("#barraBusquedaForm").action = "../empresa/mostrarCandidatos.html";
            opcionNav.style.display = "none";
            addFotoPerfil(rutaFotoPeril);
            console.log("Loggeado!!!!");
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
        console.log("hay datos");
        return JSON.parse(datosEmpresaJSON);
    }else{
        console.log("no hay");
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

    if(rutaFoto){
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

    if(rutaFoto){
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

    if(rutaFoto){
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

    if(rutaFoto){
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
    sessionStorage.removeItem("datosUsuarioLoggeado");
    sessionStorage.removeItem("datosEmpresaLoggeada");
    location.href = "../unlogged/HomePageUnlogged.html";
}

function enviarCodigoVerificacion(){
    codigoVerificacion = obtenerCodigoVerificacion();
    alert(`Código de verificación: ${codigoVerificacion}`);
}

function obtenerCodigoVerificacion(){
    var codigo = Math.floor(Math.random()*90000);
    return codigo;
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