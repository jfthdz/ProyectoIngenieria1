//Variable global 
let candidatoSeleccionado;
let listaCandidatos = {};
let listaPuestosPorEmpresa = {};

window.addEventListener("DOMContentLoaded", function(){
    if(this.window.location.pathname.endsWith("mostrarCandidatos.html")){
        const terminoBusqueda = new URLSearchParams(this.window.location.search).get("barra-busqueda");
        if(terminoBusqueda){
            console.log("encontro busqueda");
            obtenerCandidatosPorBusqueda(terminoBusqueda);
        }else{
            cargarCandidatos();
        }
    }
});

async function obtenerCandidatosPorBusqueda(terminoBusqueda){
    const url = `/candidatos/getCandidatosBySearch?search=${encodeURIComponent(terminoBusqueda)}`;

    try {
        const response = await fetch(url);

        if(response.status === 200){
            listaCandidatos = await response.json();
            setTimeout(function() {
                cargarMostrarCandidatos(listaCandidatos);
            }, 100);
        }else if(response.status === 204){
            resultNotFound();
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

function resultNotFound(){
    const tituloPag = document.querySelector("#titulo-mostrar-candidatos");
    const contenidoOpciones = document.querySelector("#contenido > div");
    const notFound = document.createElement("h3");
    const txt = document.createElement("p");

    tituloPag.innerText = "";
    notFound.innerText = "No hay ningún candidato que coincida con tu búsqueda...";
    txt.innerText = "Por favor inténtalo de nuevo cambiando tu búsqueda.";

    contenidoOpciones.appendChild(notFound);
    contenidoOpciones.appendChild(txt);
}

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
            if(this.window.location.pathname.endsWith("mostrarCandidatos.html")){
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
        const contenido = document.querySelector(".descripcion-contenido");
        var candidato = obtenerDatosCandidatoSeleccionado();
    
        if(candidato){
            const nombreCandidato = document.querySelector("#nombre-candidato");
            const profesionCandidato = document.querySelector("#profesion-candidato");
            const rutaFotoCandidato = candidato.foto;

            addFotoCandidato(rutaFotoCandidato);
            nombreCandidato.innerText = `${candidato.nombre} ${candidato.apellidos}`;
            profesionCandidato.innerText = candidato.profesion;

            if(candidato.experiencia.length > 0){
                if(candidato.experiencia[0].cargo != ""){

                    const experienciaLaboral = document.createElement("h2");
                    experienciaLaboral.innerText = "Experiencia laboral";
                    contenido.appendChild(experienciaLaboral);

                    for(let index=0; index < candidato.experiencia.length; index++){
                        const divExperiencia = document.createElement("div");
                        const tituloExperiencia = document.createElement("h3");
                        const empresaExperiencia = document.createElement("p");
                        const contenidoExperiencia = document.createElement("p");
                        const fechas = document.createElement("p");

                        tituloExperiencia.innerText = "Cargo: "+ candidato.experiencia[index].cargo;
                        empresaExperiencia.innerText = "Empresa: "+candidato.experiencia[index].empresa;
                        contenidoExperiencia.innerText = candidato.experiencia[index].contenido;
                        fechas.innerText = `${candidato.experiencia[index].fecha_inicio} - ${candidato.experiencia[0].fecha_final}`;

                        divExperiencia.appendChild(tituloExperiencia);
                        divExperiencia.appendChild(empresaExperiencia);
                        divExperiencia.appendChild(contenidoExperiencia);
                        divExperiencia.appendChild(fechas);

                        contenido.appendChild(divExperiencia);
                    }
                }
            }else{
                const notFound = document.createElement("p");
                notFound.innerText = 'Este candidato no posee datos en "Experiencia".';
                contenido.appendChild(notFound);
            }

            if(candidato.estudio.length > 0){
                if(candidato.estudio[0].titulo != ""){

                    const estudios = document.createElement("h2");
                    estudios.innerText = "Estudios"
                    contenido.appendChild(estudios)

                    for(let index=0; index < candidato.estudio.length; index++){
                        const divEstudio = document.createElement("div");
                        const tituloEstudios = document.createElement("h3");
                        const institucionEstudios = document.createElement("p");
                        const fechas = document.createElement("p");

                        tituloEstudios.innerText = "Título adquirido: "+candidato.estudio[index].titulo;
                        institucionEstudios.innerText = "Institución: "+candidato.estudio[index].institucion;
                        fechas.innerText = `${candidato.estudio[index].fecha_inicio} - ${candidato.estudio[0].fecha_final}`;

                        divEstudio.appendChild(tituloEstudios);
                        divEstudio.appendChild(institucionEstudios);
                        divEstudio.appendChild(fechas);

                        contenido.appendChild(divEstudio);
                    }
                }
            }else{
                const notFound = document.createElement("p");
                notFound.innerText = 'Este candidato no posee datos en "Estudios".';
                contenido.appendChild(notFound)
            }
        
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
    const empresaLoggeada = obtenerDatosEmpresa();
    const integranteJSON = sessionStorage.getItem("datosIntegranteLoggeado");
    const integranteObject = JSON.parse(integranteJSON);
    const candidatoSeleccionadoJSON = sessionStorage.getItem("candidatoSeleccionado");
    const candidatoSeleccionadoObject = JSON.parse(candidatoSeleccionadoJSON);
    const select = document.querySelector('select[name="puestos"');
    const puestoNombre = select.options[select.selectedIndex].innerText;

    data.append("empresaId", empresaLoggeada._id);
    data.append("empresaNombre", empresaLoggeada.nombre);
    data.append("reclutaEmail", integranteObject ? integranteObject.integrante[0].email : empresaLoggeada.correo);
    data.append("puestoNombre", puestoNombre);
    data.append("candidatoSeleccionadoId", candidatoSeleccionadoObject._id);
    data.append("recluta",integranteObject ? integranteObject.integrante[0].nombre : empresaLoggeada.nombre);

    const temp = {};
    data.forEach((value, key) =>{
        temp[key] =value;
    });

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

async function cargarInvitaciones(){
    const url = "/empresa/getInvitacionesPuesto"; 
    var empresaLoggeado = obtenerDatosEmpresa();
    const empresa = new FormData();

    empresa.append("empresaId", empresaLoggeado._id);

    try {
        const response = await fetch(url,{
            body: empresa,
            method: "POST"
        });

        if(response.ok){
            const listaInvitaciones = await response.json();
            if(listaInvitaciones){
                cargarInvitacionesTabla(listaInvitaciones); 
            }
        }else{
            console.log("Error al obtener las invitaciones");
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarInvitacionesTabla(invitaciones) {
    const tabla = document.querySelector("#tablaCandidatos tbody");
    tabla.innerHTML = '';

    for(let invitacion of invitaciones) {
        setTimeout(function() {
            const candidato = listaCandidatos.find(candidato => candidato._id === invitacion.candidato_id);
            const puesto = listaPuestosPorEmpresa.find(puesto => puesto._id === invitacion.puesto_id);
            const fila = document.createElement("tr");
    
            const celdaCandidato = document.createElement("td");
            celdaCandidato.innerText = `${candidato.nombre} ${candidato.apellidos}`;
            fila.appendChild(celdaCandidato);
    
            const celdaFecha = document.createElement("td");
            celdaFecha.innerText = invitacion.fecha_creacion; 
            fila.appendChild(celdaFecha);
    
            const celdaPuesto = document.createElement("td");
            celdaPuesto.innerText = puesto.nombre; 
            fila.appendChild(celdaPuesto);

            const celdaRecluta = document.createElement("td");
            celdaRecluta.innerText = invitacion.recluta ? invitacion.recluta : "N/D"; 
            fila.appendChild(celdaRecluta);
    
            const celdaEstado = document.createElement("td");
            celdaEstado.innerText = invitacion.estado; 
            fila.appendChild(celdaEstado);

            const celdaAcciones = document.createElement("td");
            const botonEliminar = document.createElement("button");
            botonEliminar.innerText = "Eliminar";
            botonEliminar.onclick = function() {
                eliminarInvitacion(candidato._id, puesto._id);
            };
            celdaAcciones.appendChild(botonEliminar);
            fila.appendChild(celdaAcciones);
    
            tabla.appendChild(fila);
        }, 100);
    }
}

function filtrarInvitaciones(){
    try {
        event.preventDefault();
        const nombreCandidato = document.querySelector("#nombreCandidato");
        const fecha = document.querySelector("#fecha");
        const puesto = document.querySelector("#puesto");
        const estado = document.querySelector("#estado");
        const recluta = document.querySelector("#recluta");
        var errorFiltro = document.querySelector("#errorFiltro");
        var camposIncompletos = false;

        if (nombreCandidato.value === "" && fecha.value === "" && puesto.value === "" && estado.value === "" && recluta.value === "") {
            nombreCandidato.style.border = "1px solid var(--redError)";
            fecha.style.border = "1px solid var(--redError)";
            puesto.style.border = "1px solid var(--redError)";
            estado.style.border = "1px solid var(--redError)";
            recluta.style.border = "1px solid var(--redError)";
            errorFiltro.innerText = "*Se necesita al menos un filtro.";
            errorFiltro.style.display = "block";
            camposIncompletos = true;
        } else {
            nombreCandidato.style.border = "0";
            fecha.style.border = "0";
            puesto.style.border = "0";
            estado.style.border = "0";
            recluta.style.border = "0";
            errorFiltro.innerText = "";
            errorFiltro.style.display = "none";
        }

        if (camposIncompletos) {
            return false;
        }else{
            const tabla = document.querySelector("#tablaCandidatos");
            const filas = document.querySelectorAll("#tablaCandidatos tbody tr");
            const mensajeSinResultados = document.querySelector("#sinResultados");
            const filtroNombre = nombreCandidato.value.toLowerCase();
            const filtroFecha = fecha.value.toLowerCase();
            const filtroPuesto = puesto.value.toLowerCase();
            const filtroEstado = estado.value.toLowerCase();
            const filtroRecluta = recluta.value.toLowerCase();
            let hayResultados = false;

            filas.forEach((fila) => {
                const candidato = fila.querySelector("td:first-child").textContent.toLowerCase();
                const fecha = fila.querySelector("td:nth-child(2)").textContent.toLowerCase();
                const puesto = fila.querySelector("td:nth-child(3)").textContent.toLowerCase();
                const recluta = fila.querySelector("td:nth-child(4)").textContent.toLowerCase();
                const estado = fila.querySelector("td:last-child").textContent.toLowerCase();
        
                const cumpleFiltros =
                    candidato.includes(filtroNombre) &&
                    fecha.includes(filtroFecha) &&
                    puesto.includes(filtroPuesto) &&
                    estado.includes(filtroEstado) &&
                    recluta.includes(filtroRecluta);

                    if (cumpleFiltros) {
                        fila.style.display = "";
                        hayResultados = true;
                    } else {
                        fila.style.display = "none";
                    }
            });
            mensajeSinResultados.style.display = hayResultados ? "none" : "block";
            tabla.style.display = hayResultados ? "" : "none";
        }
    } catch (error) {
        console.log(error);
    }
}

async function cargarAplicantes(){
    const url = "/empresa/getAplicantes"; 
    var empresaLoggeado = obtenerDatosEmpresa();
    const empresa = new FormData();

    empresa.append("empresaId", empresaLoggeado._id);

    try {
        const response = await fetch(url,{
            body: empresa,
            method: "POST"
        });

        if(response.ok){
            const listaAplicantes = await response.json();
            if(listaAplicantes){
                cargarAplicantesTabla(listaAplicantes); 
            }
        }else{
            console.log("Error al obtener los aplicantes");
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarAplicantesTabla(listaAplicantes) {
    const tabla = document.querySelector("#tablaAplicantes tbody");
    tabla.innerHTML = '';

    for(let aplicante of listaAplicantes) {
        setTimeout(function() {
            const candidato = listaCandidatos.find(candidato => candidato._id === aplicante.candidato_id);
            const puesto = listaPuestosPorEmpresa.find(puesto => puesto._id === aplicante.puesto_id);
            const fila = document.createElement("tr");
    
            const celdaPuesto = document.createElement("td");
            celdaPuesto.innerText = puesto.nombre; 
            fila.appendChild(celdaPuesto);

            const celdaCandidato = document.createElement("td");
            celdaCandidato.innerHTML = `<a id="${candidato._id}" href="../empresa/candidato.html">${candidato.nombre} ${candidato.apellidos}</a>`;
            fila.appendChild(celdaCandidato);


            const fechaInicio = new Date(candidato.experiencia[0].fecha_inicio);
            const fechaFinal = new Date(candidato.experiencia[0].fecha_final);
            const diferenciaEnMilisegundos = fechaFinal - fechaInicio;
            const añosDeExperiencia = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24 * 365);
            const añosCompletos = Math.floor(añosDeExperiencia);

            const celdaExperiencia = document.createElement("td");
            celdaExperiencia.innerText = añosCompletos+ " años"; 
            fila.appendChild(celdaExperiencia);
            
            const celdaFecha = document.createElement("td");
            celdaFecha.innerText = aplicante.fecha_aplicacion; 
            fila.appendChild(celdaFecha);
    
            const celdaEstado = document.createElement("td");
            celdaEstado.innerText = aplicante.estado; 
            fila.appendChild(celdaEstado);

            const celdaAcciones = document.createElement("td");
            if(aplicante.estado === "Pendiente" || aplicante.estado === "En revisión"){
                const botonAceptar = document.createElement("button");
                const botonRevision = document.createElement("button");
                const botonRechazar = document.createElement("button");
                botonAceptar.innerText = "Aceptar";
                botonRevision.innerText = "En revisión";
                botonRechazar.innerText = "Rechazar";
    
                botonAceptar.onclick = function() {
                    aceptarAplicacion(candidato._id, puesto._id);
                };
                botonRevision.onclick = function() {
                    revisandoAplicacion(candidato._id, puesto._id);
                };
                botonRechazar.onclick = function() {
                    rechazarAplicacion(candidato._id, puesto._id);
                };
    
                celdaAcciones.appendChild(botonAceptar);
                celdaAcciones.appendChild(botonRevision);
                celdaAcciones.appendChild(botonRechazar);
            }else{
                const botonEliminar = document.createElement("button");
                botonEliminar.innerText = "Eliminar";

                botonEliminar.onclick = function() {
                    eliminarAplicacion(candidato._id, puesto._id);
                };
                celdaAcciones.appendChild(botonEliminar);
            }

            fila.appendChild(celdaAcciones);
    
            tabla.appendChild(fila);
        }, 100);
    }
}

function filtrarAplicantes(){
    try {
        event.preventDefault();
        const nombreCandidato = document.querySelector("#nombreCandidato");
        const fecha = document.querySelector("#fecha");
        const puesto = document.querySelector("#puesto");
        const estado = document.querySelector("#estado");
        const experiencia = document.querySelector("#experiencia");
        var errorFiltro = document.querySelector("#errorFiltro");
        var camposIncompletos = false;

        if (nombreCandidato.value === "" && fecha.value === "" && puesto.value === "" && estado.value === "" && experiencia.value === "") {
            nombreCandidato.style.border = "1px solid var(--redError)";
            fecha.style.border = "1px solid var(--redError)";
            puesto.style.border = "1px solid var(--redError)";
            estado.style.border = "1px solid var(--redError)";
            experiencia.style.border = "1px solid var(--redError)";
            errorFiltro.innerText = "*Se necesita al menos un filtro.";
            errorFiltro.style.display = "block";
            camposIncompletos = true;
        } else {
            nombreCandidato.style.border = "0";
            fecha.style.border = "0";
            puesto.style.border = "0";
            estado.style.border = "0";
            experiencia.style.border = "0";
            errorFiltro.innerText = "";
            errorFiltro.style.display = "none";
        }

        if (camposIncompletos) {
            return false;
        }else{
            const tabla = document.querySelector("#tablaAplicantes");
            const filas = document.querySelectorAll("#tablaAplicantes tbody tr");
            const mensajeSinResultados = document.querySelector("#sinResultados");
            const filtroNombre = nombreCandidato.value.toLowerCase();
            const filtroFecha = fecha.value.toLowerCase();
            const filtroPuesto = puesto.value.toLowerCase();
            const filtroEstado = estado.value.toLowerCase();
            const filtroExperiencia = experiencia.value.toLowerCase();
            let hayResultados = false;

            filas.forEach((fila) => {
                const puesto = fila.querySelector("td:first-child").textContent.toLowerCase();
                const candidato = fila.querySelector("td:nth-child(2)").textContent.toLowerCase();
                const experiencia = fila.querySelector("td:nth-child(3)").textContent.toLowerCase();
                const fecha = fila.querySelector("td:nth-child(4)").textContent.toLowerCase();
                const estado = fila.querySelector("td:nth-child(5)").textContent.toLowerCase();
        
                const cumpleFiltros =
                    candidato.includes(filtroNombre) &&
                    fecha.includes(filtroFecha) &&
                    puesto.includes(filtroPuesto) &&
                    estado.includes(filtroEstado) &&
                    experiencia.includes(filtroExperiencia);

                    if (cumpleFiltros) {
                        fila.style.display = "";
                        hayResultados = true;
                    } else {
                        fila.style.display = "none";
                    }
            });
            mensajeSinResultados.style.display = hayResultados ? "none" : "block";
            tabla.style.display = hayResultados ? "" : "none";
        }
    } catch (error) {
        console.log(error);
    }
}

async function aceptarAplicacion(candidatoId, puestoId){
    try {
        const empresaLoggeado = obtenerDatosEmpresa();
        const url = "/empresas/aceptarAplicacion";
        const data = new FormData();
        data.append("candidatoId", candidatoId);
        data.append("empresaId", empresaLoggeado._id);
        data.append("puestoId", puestoId);
        
        const response = await fetch(url, {
            body: data,
            method: "POST",
        });

        if (response.ok) {
            location.reload();
        }else {
            console.log("Error al eliminar la aplicación.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function revisandoAplicacion(candidatoId, puestoId){
    try {
        const empresaLoggeado = obtenerDatosEmpresa();
        const url = "/empresas/revisionAplication";
        const data = new FormData();
        data.append("candidatoId", candidatoId);
        data.append("empresaId", empresaLoggeado._id);
        data.append("puestoId", puestoId);
        
        const response = await fetch(url, {
            body: data,
            method: "POST",
        });

        if (response.ok) {
            location.reload();
        }else {
            console.log("Error al eliminar la aplicación.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function rechazarAplicacion(candidatoId, puestoId){
    try {
        const empresaLoggeado = obtenerDatosEmpresa();
        const url = "/empresas/rechazarAplication";
        const data = new FormData();
        data.append("candidatoId", candidatoId);
        data.append("empresaId", empresaLoggeado._id);
        data.append("puestoId", puestoId);
        
        const response = await fetch(url, {
            body: data,
            method: "POST",
        });

        if (response.ok) {
            location.reload();
        }else {
            console.log("Error al eliminar la aplicación.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function eliminarAplicacion(candidatoId, puestoId){
    try {
        const empresaLoggeado = obtenerDatosEmpresa();
        const url = "/empresas/borrarAplicacion";
        const data = new FormData();
        data.append("candidatoId", candidatoId);
        data.append("empresaId", empresaLoggeado._id);
        data.append("puestoId", puestoId);
        
        const response = await fetch(url, {
            body: data,
            method: "POST",
        });

        if (response.ok) {
            location.reload();
        }else {
            console.log("Error al eliminar la aplicación.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function eliminarInvitacion(candidatoId, puestoId){
    try {
        const empresaLoggeado = obtenerDatosEmpresa();
        const url = "/empresas/eliminarInvitacion";
        const data = new FormData();
        data.append("candidatoId", candidatoId);
        data.append("empresaId", empresaLoggeado._id);
        data.append("puestoId", puestoId);
        
        const response = await fetch(url, {
            body: data,
            method: "POST",
        });

        if (response.ok) {
            location.reload();
        }else {
            console.log("Error al eliminar la invitación.");
        }
    } catch (error) {
        console.error(error);
    }
}


function limpiarCamposInvitarEmpresa(){
    var nombreCandidato = document.getElementById("nombreCandidato");
    var emailCandidato = document.getElementById("emailCandidato");
    var rolCandidato = document.getElementsByName("rolCandidato")[0];
  
    nombreCandidato.value = "";
    emailCandidato.value = "";
    rolCandidato.value = "default";
}

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

async function cargarUsuarios(){
    const url = "/usuarios/getUsuarios"
    var empresaLoggeado = obtenerDatosEmpresa();
    const empresa = new FormData();

    empresa.append("empresaId", empresaLoggeado._id);

    try {
        const response = await fetch(url,{
            method: "POST",
            body: empresa
        });

        if(response.ok){
            const usuarios = await response.json();
            cargarLista(usuarios);
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para agregar un usuario a la lista
function cargarLista(listaUsuarios) {
    var tabla =  document.querySelector("#tabla-usuarios tbody");
    tabla.innerHTML = "";
    let index = 1;

    const integrantes = listaUsuarios.integrante;
    for(let usuario of integrantes){
        const nuevaFila = `<tr>
        <td>${usuario.nombre}</td>
        <td>${usuario.rol}</td>
        <td>${usuario.email}</td>
        <td>${usuario.estado}</td>
        <td class="boton-accion"></td>
        </tr>`;
        tabla.innerHTML += nuevaFila;

        const td = document.querySelector(`#tabla-usuarios > tbody > tr:nth-child(${index}) > td.boton-accion`);
        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("boton-contenido");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.onclick = function() {
            deleteUser(usuario.email);
        };
        td.appendChild(botonEliminar);
        index++;
    }
}

async function deleteUser(userEmail) {
  try {
    const empresaLoggeado = obtenerDatosEmpresa();
    const url = "usuarios/deleteUser";
    const user = new FormData();
    user.append("userEmail", userEmail);
    user.append("empresaId", empresaLoggeado._id);
    
    const response = await fetch(url, {
        body: user,
        method: "POST",
    });

    if (response.ok) {
        location.reload();
    }else {
        console.log("Error al eliminar el usuario.");
    }
  } catch (error) {
    console.error(error);
  }
}
