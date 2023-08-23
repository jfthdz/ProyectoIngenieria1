//Variable global 
let candidatoSeleccionado;
let listaCandidatos = {};
let listaPuestosPorEmpresa = {};

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

async function cargarOfertasPorEmpresa(){
    const url = "/puestos/findPuestosPorEmpresa"
    const integranteLoggeado = obtenerDatosIntegrante();
    const empresaLoggeada = obtenerDatosEmpresa();
    const data = new FormData();
    if(integranteLoggeado){
        data.append("empresa_id",integranteLoggeado._id);
    }else if(empresaLoggeada){
        data.append("empresa_id",empresaLoggeada._id);
    }
    try {
        const response = await fetch(url,{
            body : data,
            method : "POST"
        });

        if(response.ok){
            listaPuestosPorEmpresa = await response.json();
            if(this.window.location.pathname.endsWith("showOffers.html")){
                cargarOfertasCreadas(listaPuestosPorEmpresa);
            }else if(this.window.location.pathname.endsWith("invitarCandidatosPuesto.html")){
                cargarSelectPuestos(listaPuestosPorEmpresa);
            }
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarOfertasCreadas(puestosPorEmpresa){
    var contenidoOfertasCreadas = document.querySelector("#ofertas-creadas");

    for(var puesto of puestosPorEmpresa){
        const oferta = document.createElement("div");
        const ofertaTitulo = document.createElement("h2");
        const infoTitulo = document.createElement("div");
        const ofertaRangoSalarial = document.createElement("p");
        const ofertaFechaCreacion = document.createElement("p");
        const ReqMinimoTitulo = document.createElement("h3");
        const ofertaReqMinimo = document.createElement("p");
        const ReqDeseableTitulo = document.createElement("h3");
        const ofertaReqDeseable = document.createElement("p");
        const PlusTitulo = document.createElement("h3");
        const ofertaPlus = document.createElement("p");
        const ofertaUbicacion = document.createElement("p");
        const botonEliminar = document.createElement("button");
        const botonEditar = document.createElement("button");
        
        const aEliminar = document.createElement("a");
        const aEditar = document.createElement("a");
        
        const divBotones = document.createElement ("div");

        divBotones.classList.add("div-botones");
        botonEliminar.classList.add("boton-eliminar");
        botonEditar.classList.add("boton-contenido"); 
        oferta.classList.add("descripcion-contenido");
        infoTitulo.classList.add("info-titulo");

        ofertaTitulo.innerText = puesto.nombre;
        ofertaRangoSalarial.innerText = puesto.rango_salarial;
        ofertaFechaCreacion.innerText = "Publicado el "+puesto.fecha_creacion;
        ReqMinimoTitulo.innerText = "Requisitos mínimos";
        ofertaReqMinimo.innerText = puesto.requisito_minimo;
        ReqDeseableTitulo.innerText = "Requisitos deseables";
        ofertaReqDeseable.innerText = puesto.requisito_deseable;
        PlusTitulo.innerText = "Aptitudes plus";
        ofertaPlus.innerText = puesto.aptitudes_plus;
        ofertaUbicacion.innerText = "Ubicación: "+puesto.ubicacion_oferta;
        
        botonEliminar.innerText = "Eliminar";
        botonEditar.innerText = "Editar";
        aEliminar.href = "";
        aEditar.href= "../empresa/ModificarOfertas.html";
        
        const puestoId = puesto._id.toString();
        botonEditar.onclick = function() {
            guardarOfertaSeleccionada(puestoId);
        };
        botonEliminar.onclick = function() {
            eliminarOfertaSeleccionada(puestoId);
        };

        oferta.appendChild(ofertaTitulo);
        infoTitulo.appendChild(ofertaRangoSalarial);
        infoTitulo.appendChild(ofertaFechaCreacion);
        oferta.appendChild(infoTitulo);
        oferta.appendChild(ReqMinimoTitulo);
        oferta.appendChild(ofertaReqMinimo);
        oferta.appendChild(ReqDeseableTitulo);
        oferta.appendChild(ofertaReqDeseable);
        oferta.appendChild(PlusTitulo);
        oferta.appendChild(ofertaPlus);
        oferta.appendChild(ofertaUbicacion);

        aEliminar.appendChild(botonEliminar);
        aEditar.appendChild(botonEditar);
        divBotones.appendChild(aEliminar);
        divBotones.appendChild(aEditar);

        oferta.appendChild(divBotones);

        contenidoOfertasCreadas.appendChild(oferta);
    }
}

async function guardarOfertaSeleccionada(ofertaId){
    ofertaSeleccionada = await listaPuestosPorEmpresa.find(puesto => puesto._id === ofertaId);
    sessionStorage.setItem(`ofertaSeleccionada`,JSON.stringify(ofertaSeleccionada));
}

function popupConfirmacion(){
    event.preventDefault();
    const popup = document.querySelector("#popup");

    popup.style.display = "flex";
    setTimeout(function() {
        popup.classList.add("mostrar");
      }, 100);  

    const opcionesEliminar = document.querySelector(".opciones-eliminar");
    opcionesEliminar.addEventListener("click", (event) => {
        event.preventDefault();
        const botonClickeado = event.target;

        if (botonClickeado.id === "opcion-si") {
            console.log("Se hizo clic en el botón Sí");
        } else if (botonClickeado.id === "opcion-no") {
            console.log("Se hizo clic en el botón No");
            setTimeout(function() {
                popup.classList.remove("mostrar");
            }, 100); 
            popup.style.display = "none";
        }
    });
}

function cargarSelectPuestos(puestosPorEmpresa){
    var selectPuestos = document.querySelector("select[name='puestos']");

    for(var puesto of puestosPorEmpresa){
        var opcionPuesto = document.createElement("option");

        opcionPuesto.value = puesto._id;
        opcionPuesto.innerText = puesto.nombre;

        selectPuestos.appendChild(opcionPuesto);
    }
}

//Validar campos vacios invitar candidato
function validarFormularioInvitarCandidato() {
    try {
        event.preventDefault();
        var nombreCandidato = document.getElementById("nombreCandidato");
        var emailCandidato = document.getElementById("emailCandidato");
        var puestos = document.getElementsByName("puestos")[0];
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

        var valorPuestos = puestos.value;
        if (valorPuestos!="default") {
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
            enviarInvitacionPuesto();
        }
    } catch (error) {
        console.log(error);
    }
}

async function enviarInvitacionPuesto(){
    const data = new FormData(document.querySelector("#form-invitar-puesto"));
    const url = "/empresas/enviarInvitacionPuesto";
    const integranteJSON = sessionStorage.getItem("datosIntegranteLoggeado");
    const integranteObject = JSON.parse(integranteJSON);
    const candidatoSeleccionadoJSON = sessionStorage.getItem("candidatoSeleccionado");
    const candidatoSeleccionadoObject = JSON.parse(candidatoSeleccionadoJSON);
    const select = document.querySelector('select[name="puestos"');
    const puestoNombre = select.options[select.selectedIndex].innerText;

    data.append("empresaId", integranteObject._id);
    data.append("empresaNombre", integranteObject.nombre);
    data.append("reclutaEmail", integranteObject.integrante[0].email);
    data.append("puestoNombre", puestoNombre);
    data.append("candidatoSeleccionadoId", candidatoSeleccionadoObject._id);

    const temp = {};
    data.forEach((value, key) =>{
        temp[key] =value;
    });
    console.log(temp);

    try {
        const response = await fetch(url,{
            body: data,
            method: "POST"
        });

        if(response.ok){
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
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

//Validar campos vacios invitar candidato
function validarFormularioInvitarEmpresa() {
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
            enviarInvitacionEmpresa();
        }
    } catch (error) {
        console.log(error);
    }
}

async function enviarInvitacionEmpresa(){
    const data = new FormData(document.querySelector("#form-invitar-empresa"));
    const url = "/empresas/enviarInvitacionEmpresa";
    const empresaJSON = sessionStorage.getItem("datosEmpresaLoggeada");
    const empresaObject = JSON.parse(empresaJSON);
    
    data.append("empresaId", empresaObject._id);
    data.append("empresaNombre", empresaObject.nombre);

    const temp = {};
    data.forEach((value, key) =>{
        temp[key] =value;
    });
    console.log(temp);

    try {
        const response = await fetch(url,{
            body: data,
            method: "POST"
        });

        if(response.ok){
            var mensajeExito = document.querySelector("#mensajeExito");
            mensajeExito.style.display = "flex";
            setTimeout(function() {
                mensajeExito.classList.add("mostrar");
            }, 100); 
            limpiarCamposInvitarEmpresa();
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

function limpiarCamposInvitarCandidato(){
    var nombreCandidato = document.getElementById("nombreCandidato");
    var emailCandidato = document.getElementById("emailCandidato");
    var puestos = document.getElementsByName("puestos")[0];

    nombreCandidato.value = "";
    emailCandidato.value = "";
    puestos.value = "default";
}

function limpiarCamposInvitarEmpresa(){
    var nombreCandidato = document.getElementById("nombreCandidato");
    var emailCandidato = document.getElementById("emailCandidato");
    var rolCandidato = document.getElementsByName("rolCandidato")[0];

    nombreCandidato.value = "";
    emailCandidato.value = "";
    rolCandidato.value = "default";
}

/*Código Alonso editar oferta*/
function cargarFormularioModificarPuesto(){
    var campoNombrePuesto = document.querySelector("#tituloOferta");
    var campoRangoSalarialInicial = document.querySelector("#rangoInicialOferta");
    var campoRangoSalarialMaximo = document.querySelector("#rangoMaximoOferta"); 
    var campoRequisitoMinimo = document.querySelector("#reqMinimos"); 
    var campoRequisitoDeseable = document.querySelector("textarea[name='reqDeseables']");
    var campoAptitudesPlus = document.querySelector("textarea[name='plus']");
    var campoUbicacionOferta = document.querySelector("#ubicacionOferta"); 
   
    const ofertaSeleccionada = obtenerDatosOfertaSeleccionada();
    if(ofertaSeleccionada){
        const inputString = ofertaSeleccionada.rango_salarial;
        const regex = /(\d[\d,\.]*)/g;
        const [rangoInicial, rangoMaximo] = (inputString.match(regex) || []).map(value => parseFloat(value.replace(/[^\d\.]/g, "").replace(/\./g, "")));

        campoNombrePuesto.value=ofertaSeleccionada.nombre;
        campoRequisitoMinimo.innerHTML=ofertaSeleccionada.requisito_minimo;
        campoRequisitoDeseable.innerText=ofertaSeleccionada.requisito_deseable;
        campoAptitudesPlus.innerText=ofertaSeleccionada.aptitudes_plus;
        campoRangoSalarialInicial.value= "¢ "+rangoInicial;
        campoRangoSalarialMaximo.value= "¢ "+rangoMaximo;
        campoUbicacionOferta.value=ofertaSeleccionada.ubicacion_oferta;
    }
}