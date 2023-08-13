var codigoVerificacion;
var candidatoSeleccionado;
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

function habilitarCampoDescripcion(){
    event.preventDefault();
    var agregarDescripcion = document.getElementById("agregarDescripcion");
    agregarDescripcion.style.display = "flex";
    setTimeout(function() {
        agregarDescripcion.classList.add("mostrar");
      }, 100);    
}

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

//Validar formulario registrar empresa
function validarFormularioEmpresa() {
    try {
        event.preventDefault();
        var nombreEmpresa = document.getElementById("nombreEmpresa");
        var emailEmpresa = document.getElementById("emailEmpresa");
        var passwordEmpresa = document.getElementById("passwordEmpresa");
        var camposIncompletos = false;

        var errorNombreEmpresa = document.getElementById("errorNombreEmpresa");
        var errorEmailEmpresa = document.getElementById("errorEmailEmpresa");
        var errorPasswordEmpresa = document.getElementById("errorPasswordEmpresa");

        //expresión regular para validar formato de correo
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if (nombreEmpresa.value === "") {
            nombreEmpresa.style.border = "1px solid var(--redError)";
            errorNombreEmpresa.innerText = "*Campo necesario";
            errorNombreEmpresa.style.display = "block";
            camposIncompletos = true;
        } else {
            nombreEmpresa.style.border = "0";
            errorNombreEmpresa.innerText = "";
            errorNombreEmpresa.style.display = "none";
        }

        if (emailEmpresa.value === "") {
            emailEmpresa.style.border = "1px solid var(--redError)";
            errorEmailEmpresa.innerText = "*Campo necesario";
            errorEmailEmpresa.style.display = "block";
            camposIncompletos = true;
        } else if(regexEmail.test(emailEmpresa.value)==false){
            emailEmpresa.style.border = "1px solid var(--redError)";
            errorEmailEmpresa.innerText = "*Ingrese un correo válido";
            errorEmailEmpresa.style.display = "block";
            camposIncompletos = true;
        }else{
            emailEmpresa.style.border = "0";
            errorEmailEmpresa.innerText = "";
            errorEmailEmpresa.style.display = "none";
        }

        if (passwordEmpresa.value === "") {
            passwordEmpresa.style.border = "1px solid var(--redError)";
            errorPasswordEmpresa.innerText = "*Campo necesario";
            errorPasswordEmpresa.style.display = "block";
            camposIncompletos = true;
        } else {
            passwordEmpresa.style.border = "0";
            errorPasswordEmpresa.innerText = "";
            errorPasswordEmpresa.style.display = "none";
        }

        // Si se encontraron campos incompletos, detener el envío del formulario
        if (camposIncompletos) {
            return false;
        }else{
            var navBuscoEmpleo = document.querySelector("#nav-buscoempleo");
            var mensajeExito = document.querySelector("#mensajeExito");
            mensajeExito.style.display = "flex";
            setTimeout(function() {
                mensajeExito.classList.add("mostrar");
                navBuscoEmpleo.scrollIntoView({behavior: "smooth"});
            }, 100); 
            limpiarCamposRegistrarEmpresa();
            setTimeout(function() {
                mensajeExito.classList.remove("mostrar");
            }, 3000); 
            setTimeout(function() {
                mensajeExito.style.display = "none";
            }, 3500); 
        }
    } catch (error) {
        console.log(error);
    }
}

function validarFormularioCrearOferta() {
    try {
        event.preventDefault();
        var tituloOferta = document.getElementById("tituloOferta");
        var descripcionOferta = document.getElementById("descripcionOferta");
        var rangoInicialOferta = document.getElementById("rangoInicialOferta");
        var rangoMaximoOferta = document.getElementById("rangoMaximoOferta");
        var ubicacionOferta = document.getElementById("ubicacionOferta");
        var camposIncompletos = false;
        
        console.log(tituloOferta);

        var errorTituloOferta = document.getElementById("errorTituloOferta");
        var errorDescripcionOferta = document.getElementById("errorDescripcionOferta");
        var errorRangoInicialOferta = document.getElementById("errorRangoInicialOferta");
        var errorRangoMaximoOferta = document.getElementById("errorRangoMaximoOferta");
        var errorUbicacionOferta = document.getElementById("errorUbicacionOferta");

        if (tituloOferta.value === "") {
            tituloOferta.style.border = "1px solid var(--redError)";
            errorTituloOferta.innerText = "*Campo necesario";
            errorTituloOferta.style.display = "block";
            camposIncompletos = true;
        } else {
            tituloOferta.style.border = "0";
            errorTituloOferta.style.display = "none";
        }

        if (descripcionOferta.value === "") {
            descripcionOferta.style.border = "1px solid var(--redError)";
            errorDescripcionOferta.innerText = "*Campo necesario";
            errorDescripcionOferta.style.display = "block";
            camposIncompletos = true;
        } else {
            descripcionOferta.style.border = "0";
            errorDescripcionOferta.style.display = "none";
        }
        
        if (rangoInicialOferta.value === "") {
            rangoInicialOferta.style.border = "1px solid var(--redError)";
            errorRangoInicialOferta.innerText = "*Campo necesario";
            errorRangoInicialOferta.style.display = "block";
            camposIncompletos = true;
        } else {
            rangoInicialOferta.style.border = "0";
            errorRangoInicialOferta.style.display = "none";
        }
        if (rangoMaximoOferta.value === "") {
            rangoMaximoOferta.style.border = "1px solid var(--redError)";
            errorRangoMaximoOferta.innerText = "*Campo necesario";
            errorRangoMaximoOferta.style.display = "block";
            camposIncompletos = true;
        } else {
            rangoMaximoOferta.style.border = "0";
            errorRangoMaximoOferta.style.display = "none";
        }

        if (ubicacionOferta.value === "") {
            ubicacionOferta.style.border = "1px solid var(--redError)";
            errorUbicacionOferta.innerText = "*Campo necesario";
            errorUbicacionOferta.style.display = "block";
            camposIncompletos = true;
        } else {
            ubicacionOferta.style.border = "0";
            errorUbicacionOferta.style.display = "none";
        }

        // Si se encontraron campos incompletos, detener el envío del formulario
        if (camposIncompletos) {
            return false;
        }else{
            var navBuscoEmpleo = document.querySelector("#sub-menu");
            var mensajeExito = document.querySelector("#mensajeExito");
            mensajeExito.style.display = "flex";
            setTimeout(function() {
                mensajeExito.classList.add("mostrar");
                navBuscoEmpleo.scrollIntoView({behavior: "smooth"});
            }, 100); 
            limpiarCamposCrearOferta();
            setTimeout(function() {
                mensajeExito.classList.remove("mostrar");
            }, 3000); 
            setTimeout(function() {
                mensajeExito.style.display = "none";
            }, 3500); 
        }
    } catch (error) {
        console.log(error);
    }
}

function limpiarCamposCrearOferta(){
    var tituloOferta = document.getElementById("tituloOferta");
    var descripcionOferta = document.getElementById("descripcionOferta");
    var rangoInicialOferta = document.getElementById("rangoInicialOferta");
    var rangoMaximoOferta = document.getElementById("rangoMaximoOferta");
    var ubicacionOferta = document.getElementById("ubicacionOferta");

    tituloOferta.value = "";
    descripcionOferta.value = "";
    rangoInicialOferta.value = "";
    rangoMaximoOferta.value = "";
    ubicacionOferta.value = "";
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

function limpiarCamposRegistrarEmpresa(){
    var fotoPerfil = document.querySelector("#img-perfil");
    var nombreEmpresa = document.querySelector("#nombreEmpresa");
    var emailEmpresa = document.querySelector("#emailEmpresa");
    var passwordEmpresa = document.querySelector("#passwordEmpresa");
    var agregarDescripcion = document.querySelector("#agregarDescripcion");
    var textAreaAgregarDescripcion = document.querySelector("#agregarDescripcion textarea");
    
    fotoPerfil.src = "../../images/fotoPerfilDefault.jpeg"
    nombreEmpresa.value = "";
    emailEmpresa.value = "";
    passwordEmpresa.value = "";
    
    agregarDescripcion.style.display = "none"; 
    textAreaAgregarDescripcion.value = "";
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

function cargarFormularioModificarEmpresa(){
    var campoNombreEmpresa = document.querySelector("#nombreEmpresa");
    var campoCorreoEmpresa = document.querySelector("#emailEmpresa");
    var empresaLoggeado = obtenerDatosEmpresa();
    var rutaFotoPeril;

    if(empresaLoggeado){
        rutaFotoPeril = empresaLoggeado.foto
        addFotoPerfilModificarCandidato(rutaFotoPeril);
        campoNombreEmpresa.value = empresaLoggeado.nombre;
        campoCorreoEmpresa.value = empresaLoggeado.email;
    }
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

//Validar formulario modificar empresa
function validarFormularioModificarEmpresa() {
    try {
        event.preventDefault();
        var nombreEmpresa = document.getElementById("nombreEmpresa");
        var emailEmpresa = document.getElementById("emailEmpresa");
        var camposIncompletos = false;

        var errorNombreEmpresa = document.getElementById("errorNombreEmpresa");
        var errorEmailEmpresa = document.getElementById("errorEmailEmpresa");

        //expresión regular para validar formato de correo
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if (nombreEmpresa.value === "") {
            nombreEmpresa.style.border = "1px solid var(--redError)";
            errorNombreEmpresa.innerText = "*Campo necesario";
            errorNombreEmpresa.style.display = "block";
            camposIncompletos = true;
        } else {
            nombreEmpresa.style.border = "0";
            errorNombreEmpresa.innerText = "";
            errorNombreEmpresa.style.display = "none";
        }

        if (emailEmpresa.value === "") {
            emailEmpresa.style.border = "1px solid var(--redError)";
            errorEmailEmpresa.innerText = "*Campo necesario";
            errorEmailEmpresa.style.display = "block";
            camposIncompletos = true;
        } else if(regexEmail.test(emailEmpresa.value)==false){
            emailEmpresa.style.border = "1px solid var(--redError)";
            errorEmailEmpresa.innerText = "*Ingrese un correo válido";
            errorEmailEmpresa.style.display = "block";
            camposIncompletos = true;
        }else{
            emailEmpresa.style.border = "0";
            errorEmailEmpresa.innerText = "";
            errorEmailEmpresa.style.display = "none";
        }

        // Si se encontraron campos incompletos, detener el envío del formulario
        if (camposIncompletos) {
            return false;
        }else{
            var navBuscoEmpleo = document.querySelector("#nav-buscoempleo");
            var mensajeExito = document.querySelector("#mensajeExito");
            mensajeExito.style.display = "flex";
            setTimeout(function() {
                mensajeExito.classList.add("mostrar");
                navBuscoEmpleo.scrollIntoView({behavior: "smooth"});
            }, 100); 
            setTimeout(function() {
                mensajeExito.classList.remove("mostrar");
            }, 3000); 
            setTimeout(function() {
                mensajeExito.style.display = "none";
            }, 3500);
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarDatosPuestosHomePage(){
    let num = 2;
    var grid = document.querySelector("#equipo");

    for(var puesto of puestoTrabajo){
        var empresaEncontrada = empresas.find(empresa => empresa.nombre == puesto.empresa);
        var divFotoEmpresa = document.createElement("div");
        var fotoEmpresa = document.createElement("img");
        var card = document.createElement("div");
        var tituloPuesto = document.createElement("h3");
        var empresa = document.createElement("p");
        var rangoSalarial = document.createElement("p");

        if(empresaEncontrada){
            fotoEmpresa.src = empresaEncontrada.foto;
        }else{
            fotoEmpresa.src = "../../images/fotoPerfilDefault.jpeg";
        }
    
        divFotoEmpresa.classList.add("card_img");
        card.classList.add("card");
        tituloPuesto.innerText = puesto.titulo;
        empresa.innerText = puesto.empresa;
        rangoSalarial.innerText = puesto.rangoSalarial;
        card.appendChild(divFotoEmpresa);
        card.appendChild(tituloPuesto);
        card.appendChild(empresa);
        card.appendChild(rangoSalarial);
        grid.appendChild(card);
        divFotoEmpresa.appendChild(fotoEmpresa);
    
        num += 1;
        if(num > 4){
            break;
        }
    }
}

function cargarDatosCandidatosHomePage(){
    let num = 2;
    var grid = document.querySelector("#equipo");

    for(var candidato of usuarios){
        var divFotoCandidato = document.createElement("div");
        var fotoCandidato = document.createElement("img");
        var card = document.createElement("div");
        var nombreCandidato = document.createElement("h3");
        var profesionCandidato = document.createElement("p");
    
        divFotoCandidato.classList.add("card_img");
        card.classList.add("card");
        fotoCandidato.src = candidato.foto;
        nombreCandidato.innerText = `${candidato.nombre} ${candidato.apellidos}`;
        profesionCandidato.innerText = candidato.profesion;
        card.appendChild(divFotoCandidato);
        card.appendChild(fotoCandidato);
        card.appendChild(nombreCandidato);
        card.appendChild(profesionCandidato);
        divFotoCandidato.appendChild(fotoCandidato);
        grid.appendChild(card);
    
        num += 1;
        if(num > 4){
            break;
        }
    }
}

function cargarMostrarCandidatos(){
    var contenidoOpciones = document.querySelector("#contenido .contenido-opciones");

    for(var candidato of usuarios){
        var opcion = document.createElement("div");
        var opcionInfo = document.createElement("div");
        var opcionImg = document.createElement("img");
        var opcionInfoTexto = document.createElement("div");
        var opcionNombre = document.createElement("h3");
        var opcionProfesion = document.createElement("p");
        var opcionBoton = document.createElement("div");
        var opcionBotonLink = document.createElement("a");
        var botonVer = document.createElement("button");
        var rutaFoto;
        
        opcion.classList.add("opcion");
        opcionInfo.classList.add("opcion-info");
        opcionImg.classList.add("imgFotoPerfilMostrarCandidato");
        opcionInfoTexto.classList.add("opcion-info-texto");
        opcionBoton.classList.add("opcion-boton");
        botonVer.classList.add("boton-contenido");

        opcionImg.src = candidato.foto;
        opcionNombre.innerText = `${candidato.nombre} ${candidato.apellidos}`;
        opcionProfesion.innerText = candidato.profesion;
        opcionBotonLink.href = "../empresa/candidato.html";
        botonVer.innerText = "Ver";
        botonVer.setAttribute("onclick", `guardarCandidatoSeleccionado(${candidato.id})`);

        opcion.appendChild(opcionInfo);
        opcionInfo.appendChild(opcionImg);
        opcionImg.appendChild(opcionInfoTexto);
        opcionInfoTexto.appendChild(opcionNombre);
        opcionInfoTexto.appendChild(opcionProfesion);
        opcionInfo.appendChild(opcionInfoTexto);
        opcion.appendChild(opcionBoton);
        opcionBoton.appendChild(opcionBotonLink);
        opcionBotonLink.appendChild(botonVer);

        contenidoOpciones.appendChild(opcion);

        almacenarDatosCandidatos(candidato);
    }
}

function cargarMostrarOfertas(){
    var contenidoOpciones = document.querySelector("#contenido .contenido-opciones");

    for(var oferta of puestoTrabajo){
        var empresaEncontrada = empresas.find(empresa => empresa.nombre == oferta.empresa);
        var opcion = document.createElement("div");
        var opcionInfo = document.createElement("div");
        var opcionImgEmpresa = document.createElement("img");
        var opcionInfoTexto = document.createElement("div");
        var opcionTituloPuesto = document.createElement("h3");
        var opcionEmpresa = document.createElement("p");
        var opcionRangoSalarial = document.createElement("p");
        var opcionBoton = document.createElement("div");
        var opcionBotonLink = document.createElement("a");
        var botonVer = document.createElement("button");
        
        opcion.classList.add("opcion");
        opcionInfo.classList.add("opcion-info");
        opcionImgEmpresa.classList.add("imgFotoPerfilMostrarCandidato");
        opcionInfoTexto.classList.add("opcion-info-texto");
        opcionBoton.classList.add("opcion-boton");
        botonVer.classList.add("boton-contenido");

        if(empresaEncontrada){
            opcionImgEmpresa.src = empresaEncontrada.foto;
        }else{
            opcionImgEmpresa.src = "../../images/fotoPerfilDefault.jpeg";
        }

        opcionTituloPuesto.innerText = oferta.titulo;
        opcionEmpresa.innerText = oferta.empresa;
        opcionRangoSalarial.innerText = oferta.rangoSalarial;
        opcionBotonLink.href = "../candidato/ofertasTrabajo.html";
        botonVer.innerText = "Ver";
        botonVer.setAttribute("onclick", `guardarOfertaSeleccionado(${oferta.id})`);

        opcion.appendChild(opcionInfo);
        opcionInfo.appendChild(opcionImgEmpresa);
        opcionInfo.appendChild(opcionInfoTexto);
        opcionInfoTexto.appendChild(opcionTituloPuesto);
        opcionInfoTexto.appendChild(opcionEmpresa);
        opcionInfoTexto.appendChild(opcionRangoSalarial);
        opcion.appendChild(opcionBoton);
        opcionBoton.appendChild(opcionBotonLink);
        opcionBotonLink.appendChild(botonVer);

        contenidoOpciones.appendChild(opcion);

        almacenarDatosCandidatos(oferta);
    }
}

function almacenarDatosCandidatos(candidato){
    sessionStorage.setItem(`candidato${candidato.id}`,JSON.stringify(candidato));
}

function guardarCandidatoSeleccionado(candidatoId){
    candidatoSeleccionado = usuarios.find(usuario => usuario.id === candidatoId);
    sessionStorage.setItem(`candidatoSeleccionado`,JSON.stringify(candidatoSeleccionado));
}

function guardarOfertaSeleccionado(ofertaId){
    ofertaSeleccionada = puestoTrabajo.find(puesto => puesto.id === ofertaId);
    sessionStorage.setItem(`ofertaSeleccionada`,JSON.stringify(ofertaSeleccionada));
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

function cargarDatosCandidato(){
    try {
        var nombreCandidato = document.querySelector("#nombre-candidato");
        var profesionCandidato = document.querySelector("#profesion-candidato");
        
        var tituloExperiencia = document.querySelector("#titulo-experiencia");
        var empresaExperiencia = document.querySelector("#empresa-experiencia");
        var contenidoExperiencia = document.querySelector("#contenido-experiencia");
        var fechaInicioExp = document.querySelector("#fecha-inicio-exp");
        var fechaFinalExp = document.querySelector("#fecha-final-exp");
    
        var tituloEstudios = document.querySelector("#titulo-estudios");
        var institucionEstudios = document.querySelector("#institucion-estudios");
        var fechaInicioEst = document.querySelector("#fecha-inicio-est");
        var fechaFinalEst = document.querySelector("#fecha-final-est");
    
        var candidato = obtenerDatosCandidatoSeleccionado();
        var rutaFotoCandidato = candidato.foto;
    
        if(candidato){
            addFotoCandidato(rutaFotoCandidato);
            nombreCandidato.innerText = `${candidato.nombre} ${candidato.apellidos}`;
            profesionCandidato.innerText = candidato.profesion;
            tituloExperiencia.innerText = candidato.expTitulo;
            empresaExperiencia.innerText += " "+candidato.expEmpresa;
            contenidoExperiencia.innerText = candidato.expContenido;
            fechaInicioExp.innerText = candidato.expFechaInicio;
            fechaFinalExp.innerText = candidato.expFechaFinal;
            tituloEstudios.innerText = candidato.estTitulo;
            institucionEstudios.innerText += " "+candidato.estInstitucion;
            fechaInicioEst.innerText = candidato.estFechaInicio;
            fechaFinalEst.innerText = candidato.estFechaFinal;
            
            if(candidato.expActualmente){
                fechaFinalEst.textContent = "Actualmente";
            }
            if(candidato.estActualmente){
                fechaFinalExp.textContent = "Actualmente";
            }

            console.log(candidato);
            
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarDatosOferta(){
    try {
        var tituloPuesto = document.querySelector("#titulo-puesto");
        var empresaPuesto = document.querySelector("#empresa-puesto");
        var fechaPuesto = document.querySelector("#fecha-puesto");
        var empresaRangoSalarial = document.querySelector("#empresa-rangoSalarial");
        var imgPerfilEmpresa = document.querySelector("#img-perfil-contenido");
        
        var contenidoReqMinimo = document.querySelector("#contenido-reqminimos");
        var contenidoReqDeseables = document.querySelector("#contenido-reqdeseables");
        var contenidoPlus = document.querySelector("#contenido-plus");
    
        var puesto = obtenerDatosOfertaSeleccionada();
    
        if(puesto){
            var empresaEncontrada = empresas.find(empresa => empresa.nombre == puesto.empresa);
            addFotoEmpresaOfertaTrabajo(empresaEncontrada.foto);
            tituloPuesto.innerText = puesto.titulo;
            empresaPuesto.innerText = puesto.empresa;
            fechaPuesto.innerText += " "+puesto.fecha;
            empresaRangoSalarial.innerText = puesto.rangoSalarial;

            contenidoReqMinimo.innerText = puesto.reqMinimo;
            contenidoReqDeseables.innerText = puesto.reqDeseable;
            contenidoPlus.innerText = puesto.plus;
        }
    } catch (error) {
        console.log(error);
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
    fotoPerfilNav.src = rutaFoto;
}

function addFotoPerfilModificarCandidato(rutaFoto){
    var fotoPerfilModificar = document.querySelector("#img-perfil-modificar");

    fotoPerfilModificar.src = rutaFoto;
}

function addFotoCandidato(rutaFoto){
    var fotoPerfilCandidato = document.querySelector("#img-perfil-candidato");

    fotoPerfilCandidato.src = rutaFoto;
}

function addFotoEmpresaOfertaTrabajo(rutaFoto){
    var fotoPerfilEmpresa = document.querySelector("#img-perfil-contenido");

    fotoPerfilEmpresa.src = rutaFoto;
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