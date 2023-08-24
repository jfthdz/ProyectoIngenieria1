let listaOfertas = {};
let listaEmpresas = {};

window.addEventListener("DOMContentLoaded", function(){
    if(this.window.location.pathname.endsWith("mostrarOfertasTrabajo.html")){
        const terminoBusqueda = new URLSearchParams(this.window.location.search).get("barra-busqueda");
        if(terminoBusqueda){
            console.log("encontro busqueda");
            obtenerPuestosPorBusqueda(terminoBusqueda);
        }else{
            obtenerPuestos();
        }
    }
});

async function obtenerPuestosPorBusqueda(terminoBusqueda){
    const url = `/puestos/getPuestosBySearch?search=${encodeURIComponent(terminoBusqueda)}`;

    try {
        const response = await fetch(url);

        if(response.status === 200){
            listaOfertas = await response.json();
            setTimeout(function() {
                cargarMostrarOfertas(listaOfertas);
            }, 100);
            console.log(busqueda);
        }else if(response.status === 204){
            resultNotFound();
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

async function obtenerPuestos(){
    const url = "/puestos/getPuestos"

    try {
        const response = await fetch(url);

        if(response.ok){
            listaOfertas = await response.json();
            setTimeout(function() {
                cargarMostrarOfertas(listaOfertas);
            }, 100);
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

function resultNotFound(){
    const tituloPag = document.querySelector("#titulo-mostrar-ofertas");
    const contenidoOpciones = document.querySelector("#contenido > div");
    const notFound = document.createElement("h3");
    const txt = document.createElement("p");

    tituloPag.innerText = "";
    notFound.innerText = "No hay ninguna oferta laboral que coincida con tu búsqueda...";
    txt.innerText = "Por favor inténtalo de nuevo cambiando tu búsqueda.";

    contenidoOpciones.appendChild(notFound);
    contenidoOpciones.appendChild(txt);
}

async function obtenerEmpresas(){
    const url = "/empresas/getEmpresas"

    try {
        const response = await fetch(url);

        if(response.ok){
            listaEmpresas = await response.json();
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarMostrarOfertas(ofertas){
    var contenidoOpciones = document.querySelector("#contenido .contenido-opciones");

    for(var oferta of ofertas){
        var empresaEncontrada = listaEmpresas.find(empresa => empresa._id === oferta.empresa_id);
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
        let nombreEmpresa; 
        
        opcion.classList.add("opcion");
        opcionInfo.classList.add("opcion-info");
        opcionImgEmpresa.classList.add("imgFotoPerfilMostrarCandidato");
        opcionInfoTexto.classList.add("opcion-info-texto");
        opcionBoton.classList.add("opcion-boton");
        botonVer.classList.add("boton-contenido");

        if(empresaEncontrada){
            nombreEmpresa = empresaEncontrada.nombre;
            const src = empresaEncontrada.foto;
            if(src.startsWith("/images/")){
                opcionImgEmpresa.src = empresaEncontrada.foto;
            }else{
                const partes = src.split("\\");
                const indiceUploads = partes.indexOf("uploads");
                const rutaCorredida = partes.slice(indiceUploads).join("/");

                opcionImgEmpresa.src = `/${rutaCorredida}`;
            } 
        }

        opcionTituloPuesto.innerText = oferta.nombre;
        opcionEmpresa.innerText = nombreEmpresa;
        opcionRangoSalarial.innerText = `₡ ${oferta.rango_inicial} a ${oferta.rango_final}`;
        opcionBotonLink.href = "../candidato/ofertasTrabajo.html";
        botonVer.innerText = "Ver";
        const ofertaId = oferta._id.toString();
        botonVer.onclick = function() {
            guardarOfertaSeleccionada(ofertaId);
        };

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

        almacenarDatosOfertas(oferta);
    }
}

async function guardarOfertaSeleccionada(ofertaId){
    ofertaSeleccionada = await listaOfertas.find(puesto => puesto._id === ofertaId);
    sessionStorage.setItem(`ofertaSeleccionada`,JSON.stringify(ofertaSeleccionada));
}

async function cargarDatosOferta(){
    try {
        var tituloPuesto = document.querySelector("#titulo-puesto");
        var empresaPuesto = document.querySelector("#empresa-puesto");
        var fechaPuesto = document.querySelector("#fecha-puesto");
        var empresaRangoSalarial = document.querySelector("#empresa-rangoSalarial");
        var ubicacionPuesto = document.querySelector("#ubicacion-puesto");
        var imgPerfilEmpresa = document.querySelector("#img-perfil-contenido");
        let nombreEmpresa;
        
        var contenidoReqMinimo = document.querySelector("#contenido-reqminimos");
        var contenidoReqDeseables = document.querySelector("#contenido-reqdeseables");
        var contenidoPlus = document.querySelector("#contenido-plus");
    
        var puesto = obtenerDatosOfertaSeleccionada();

        setTimeout(function() {
            if(puesto){
                const empresaEncontrada = listaEmpresas.find(empresa => empresa._id == puesto.empresa_id);
    
                if(empresaEncontrada){
                    nombreEmpresa = empresaEncontrada.nombre;
                    const src = empresaEncontrada.foto;
                    if(src.startsWith("/images/")){
                        imgPerfilEmpresa ? imgPerfilEmpresa.src = empresaEncontrada.foto : false;
                    }else{
                        const partes = src.split("\\");
                        const indiceUploads = partes.indexOf("uploads");
                        const rutaCorredida = partes.slice(indiceUploads).join("/");
    
                        imgPerfilEmpresa ? imgPerfilEmpresa.src = `/${rutaCorredida}` : false;
                    } 
                }
    
                tituloPuesto.innerText = puesto.nombre;
                empresaPuesto.innerText = "Empresa: "+nombreEmpresa;
                fechaPuesto.innerText += "Publicado el "+puesto.fecha_creacion;
                empresaRangoSalarial.innerText = `₡ ${puesto.rango_inicial} a ${puesto.rango_final}`;
                ubicacionPuesto.innerText = puesto.ubicacion_oferta;
    
                contenidoReqMinimo.innerText = puesto.requisito_minimo;
                contenidoReqDeseables.innerText = puesto.requisito_deseable;
                contenidoPlus.innerText = puesto.aptitudes_plus;
            }
          }, 100); 
    } catch (error) {
        console.log(error);
    }
}

async function aplicarPuesto(){
    const url = "/puestos/aplicarPuesto";
    const data = new FormData();
    const candidatoData = sessionStorage.getItem("datosUsuarioLoggeado");

    if(candidatoData){
        const puestoData = sessionStorage.getItem("ofertaSeleccionada");
        const candidatoObjeto = JSON.parse(candidatoData);
        const puestoObjeto = JSON.parse(puestoData);

        data.append("candidatoId", candidatoObjeto._id);
        data.append("puestoId", puestoObjeto._id);
        data.append("empresaId", puestoObjeto.empresa_id);
    
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