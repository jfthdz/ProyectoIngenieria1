let listaOfertas = {};
let listaEmpresas = {};

async function obtenerPuestos(){
    const url = "/puestos/getPuestos"

    try {
        const response = await fetch(url);

        if(response.ok){
            listaOfertas = await response.json();
            console.log(listaOfertas);
            cargarMostrarOfertas(listaOfertas);

        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

async function obtenerEmpresas(){
    const url = "/empresas/getEmpresas"

    try {
        const response = await fetch(url);

        if(response.ok){
            listaEmpresas = await response.json();
            console.log(listaEmpresas);
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
        opcionRangoSalarial.innerText = oferta.rango_salarial;
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
        var imgPerfilEmpresa = document.querySelector("#img-perfil-contenido");
        let nombreEmpresa;
        
        var contenidoReqMinimo = document.querySelector("#contenido-reqminimos");
        var contenidoReqDeseables = document.querySelector("#contenido-reqdeseables");
        var contenidoPlus = document.querySelector("#contenido-plus");
    
        var puesto = obtenerDatosOfertaSeleccionada();
        console.log(puesto);

        if(puesto){
            const empresaEncontrada = await listaEmpresas.find(empresa => empresa._id == puesto.empresa_id);

            if(empresaEncontrada){
                console.log(empresaEncontrada);
                nombreEmpresa = empresaEncontrada.nombre;
                const src = empresaEncontrada.foto;
                if(src.startsWith("/images/")){
                    imgPerfilEmpresa.src = empresaEncontrada.foto;
                }else{
                    const partes = src.split("\\");
                    const indiceUploads = partes.indexOf("uploads");
                    const rutaCorredida = partes.slice(indiceUploads).join("/");

                    imgPerfilEmpresa.src = `/${rutaCorredida}`;
                } 
            }

            tituloPuesto.innerText = puesto.nombre;
            empresaPuesto.innerText = nombreEmpresa;
            fechaPuesto.innerText += " "+puesto.fecha_creacion;
            empresaRangoSalarial.innerText = puesto.rango_salarial;

            contenidoReqMinimo.innerText = puesto.requisito_minimo;
            contenidoReqDeseables.innerText = puesto.requisito_deseable;
            contenidoPlus.innerText = puesto.aptitudes_plus;
        }
    } catch (error) {
        console.log(error);
    }
}

setTimeout(function() {
    cargarDatosOferta();
}, 90); 