//Variable global 
let candidatoSeleccionado;
let listaCandidatos = {};

// Validar formulario registrar empresa
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

        // Expresión regular para validar formato de correo
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
        } else if (regexEmail.test(emailEmpresa.value) == false) {
            emailEmpresa.style.border = "1px solid var(--redError)";
            errorEmailEmpresa.innerText = "*Ingrese un correo válido";
            errorEmailEmpresa.style.display = "block";
            camposIncompletos = true;
        } else {
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

        if (camposIncompletos) {
            return false;
        } else {
            registrarEmpresa();
        }
    } catch (error) {
        console.log(error);
    }
}

function limpiarCamposRegistrarEmpresa() {
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

async function registrarEmpresa() {
    const empresaData = new FormData(document.querySelector("#form-registrar-empresa"));
    const url = "/empresas/addEmpresa";

    if(empresaData.get("fotoPerfil").name === ""){
        const fotoPorDefecto = "/images/fotoPerfilDefault.jpeg";
        empresaData.set("fotoPerfil", fotoPorDefecto);
    }

    const empresaObject = {};
    empresaData.forEach((value, key) =>{
        empresaObject[key]= value;
    });
    console.log(empresaObject);

    try {
        const response = await fetch(url,{
            body: empresaData,
            method: "POST"
        });

        if (response.ok) {
            const datos = await response.json();
            console.log(datos);
            
            var navBuscoEmpleo = document.querySelector("#nav-buscoempleo");
            var mensajeExito = document.querySelector("#mensajeExito");
            mensajeExito.style.display = "flex";
            setTimeout(function() {
                mensajeExito.classList.add("mostrar");
                navBuscoEmpleo.scrollIntoView({ behavior: "smooth" });
            }, 100);
            limpiarCamposRegistrarEmpresa();
            setTimeout(function() {
                mensajeExito.classList.remove("mostrar");
            }, 3000);
            setTimeout(function() {
                mensajeExito.style.display = "none";
            }, 3500);

        } else {
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

function habilitarCampoDescripcion(){
    event.preventDefault();
    var agregarDescripcion = document.getElementById("agregarDescripcion");
    agregarDescripcion.style.display = "flex";
    setTimeout(function() {
        agregarDescripcion.classList.add("mostrar");
      }, 100);    
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
            modificarEmpresa();
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarFormularioModificarEmpresa(){
    var campoNombreEmpresa = document.querySelector("#nombreEmpresa");
    var campoCorreoEmpresa = document.querySelector("#emailEmpresa");
    var campoDescripcionEmpresa = document.querySelector("textarea[name='contenidoDescripcion']");
    var empresaLoggeado = obtenerDatosEmpresa();
    var rutaFotoPeril;

    if(empresaLoggeado){
        console.log(empresaLoggeado);
        rutaFotoPeril = empresaLoggeado.foto
        sessionStorage.setItem("rutaFotoPerfil", rutaFotoPeril);
        addFotoPerfilModificarCandidato(rutaFotoPeril);
        campoNombreEmpresa.value = empresaLoggeado.nombre;
        campoCorreoEmpresa.value = empresaLoggeado.correo;

        if(empresaLoggeado.descripcion != ""){
            var agregarDescripcion = document.getElementById("agregarDescripcion");
            var botonAgregarDescripcion = document.getElementById("boton-agregar-descripcion");
            botonAgregarDescripcion.style.display = "none";

            var agregarDescripcion = document.getElementById("agregarDescripcion");
            agregarDescripcion.style.display = "flex";
            agregarDescripcion.classList.add("mostrar");

            campoDescripcionEmpresa.innerText = empresaLoggeado.descripcion;
        }
    }
}

async function modificarEmpresa(){
    const empresaData = new FormData(document.querySelector("#form-modificar-empresa"));
    const empresaLoggeada = obtenerDatosEmpresa();
    const _id = empresaLoggeada._id.toString();
    empresaData.append("_id",_id);

    const rutaFoto = sessionStorage.getItem("rutaFotoPerfil")
    if(empresaData.get("fotoPerfil").name === ""){
        empresaData.set("fotoPerfil", rutaFoto);
    }

    const empresaObject = {};
    empresaData.forEach((value, key) =>{
        empresaObject[key]= value;
    });
    console.log(empresaObject);
    
    const url = "/empresas/updateEmpresas"

    try {
        const response = await fetch(url,{
            body: empresaData,
            method: "POST"
        });

        if(response.ok){
            //Actualizamos la empresa Modificada en el item del sessionStorage
            almacenarDatosEmpresaModificada(_id);

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
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

async function almacenarDatosEmpresaModificada(empresaId){
    const url = "/empresas/getEmpresaPorId"
    const data = new FormData();
    data.append("_id", empresaId);

    try {
        const response = await fetch(url,{
            body: data,
            method: "POST"
        });

        if(response.ok){
            const datos = await response.json();
            const empresaModificada = datos.candidatoEncontrado;
            if(empresaModificada){
                sessionStorage.setItem("datosEmpresaLoggeada", JSON.stringify(empresaModificada));
            }else{
                console.log("No se pudo actualizar el sessionStorage")
            }
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

async function cargarCandidatos(){
    const url = "/candidatos/getCandidatos"

    try {
        const response = await fetch(url);

        if(response.ok){
            listaCandidatos = await response.json();
            if(listaCandidatos){
                cargarMostrarCandidatos(listaCandidatos);
            }
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarMostrarCandidatos(candidatos){
    var contenidoOpciones = document.querySelector("#contenido .contenido-opciones");

    for(var candidato of candidatos){
        var opcion = document.createElement("div");
        var opcionInfo = document.createElement("div");
        var opcionImg = document.createElement("img");
        var opcionInfoTexto = document.createElement("div");
        var opcionNombre = document.createElement("h3");
        var opcionProfesion = document.createElement("p");
        var opcionBoton = document.createElement("div");
        var opcionBotonLink = document.createElement("a");
        var botonVer = document.createElement("button");
        
        opcion.classList.add("opcion");
        opcionInfo.classList.add("opcion-info");
        opcionImg.classList.add("imgFotoPerfilMostrarCandidato");
        opcionInfoTexto.classList.add("opcion-info-texto");
        opcionBoton.classList.add("opcion-boton");
        botonVer.classList.add("boton-contenido");

        const src = candidato.foto;
        if(src.startsWith("/images/")){
            opcionImg.src = candidato.foto;
        }else{
            const partes = src.split("\\");
            const indiceUploads = partes.indexOf("uploads");
            const rutaCorredida = partes.slice(indiceUploads).join("/");

            opcionImg.src = `/${rutaCorredida}`;
        } 


        opcionNombre.innerText = `${candidato.nombre} ${candidato.apellidos}`;
        opcionProfesion.innerText = candidato.profesion;
        opcionBotonLink.href = "../empresa/candidato.html";
        botonVer.innerText = "Ver";
        const candidatoId = candidato._id.toString();
        botonVer.onclick = function() {
            guardarCandidatoSeleccionado(candidatoId);
        };

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

async function guardarCandidatoSeleccionado(candidatoId){
    candidatoSeleccionado = await listaCandidatos.find(candidato => candidato._id === candidatoId);
    sessionStorage.setItem(`candidatoSeleccionado`,JSON.stringify(candidatoSeleccionado));  
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
            
           /* if(candidato.expActualmente){
                fechaFinalEst.textContent = "Actualmente";
            }
            if(candidato.estActualmente){
                fechaFinalExp.textContent = "Actualmente";
            } */

            console.log(candidato);
            
        }
    } catch (error) {
        console.log(error);
    }
}