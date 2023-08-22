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
        var oferta = document.createElement("div");
        var ofertaTitulo = document.createElement("h2");
        var infoTitulo = document.createElement("div");
        var ofertaRangoSalarial = document.createElement("p");
        var ofertaFechaCreacion = document.createElement("p");
        var ReqMinimoTitulo = document.createElement("h3");
        var ofertaReqMinimo = document.createElement("p");
        var ReqDeseableTitulo = document.createElement("h3");
        var ofertaReqDeseable = document.createElement("p");
        var PlusTitulo = document.createElement("h3");
        var ofertaPlus = document.createElement("p");
        var ofertaUbicacion = document.createElement("p");

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

        contenidoOfertasCreadas.appendChild(oferta);
    }
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

//Usuarios Empresa
// Función para eliminar un usuario a través del API
async function deleteUser() {
  try {
    const url = "usuarios/borrarUsuario"
    const response = await fetch(url, {
        body: usuarioData,
        method: "POST",
    });

    if (response.ok) {

    } else {
      alert("Error al eliminar el usuario.");
    }
  } catch (error) {
    console.error(error);
    alert("Error de conexión con el servidor.");
  }
}

// Función para agregar un usuario a la lista
function addUser(listaUsuarios, listaEmpleados) {
  const userItem = document.createElement("li");
  userItem.className = "user-item";
  userItem.innerHTML = `
    <div class="user-details">
      <span class="user-title">Nombres:</span>
      <span class="name">${name}</span>
    </div>
    <div class="user-details">
      <span class="user-title">Apellidos:</span>
      <span class="last-name">${lastName}</span>
    </div>
    <div class="user-details">
      <span class="user-title">Puesto:</span>
      <span class="position">${position}</span>
    </div>
    <div class="user-actions">
      <span class="delete-btn" data-userid="${userId}">Eliminar</span>
    </div>
  `;
  const deleteBtn = userItem.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteUser(deleteBtn.dataset.userid);
  });
  userList.appendChild(userItem);
}