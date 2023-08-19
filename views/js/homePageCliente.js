let listaOfertas = {};
let listaEmpresas = {};
let listaCandidatos = {};
let card;

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

async function cargarCandidatos(){
    const url = "/candidatos/getCandidatos"

    try {
        const response = await fetch(url);

        if(response.ok){
            listaCandidatos = await response.json();
            cargarDatosCandidatosHomePage(listaCandidatos);
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarDatosCandidatosHomePage(candidatos){
    let num = 1;
    var grid = document.querySelector("#equipo");
    const candidatosAleatorios = candidatos.sort(() => Math.random() - 0.5);

    for(var candidato of candidatosAleatorios){
        var divFotoCandidato = document.createElement("div");
        var fotoCandidato = document.createElement("img");
        var link = document.createElement("a");
        var card = document.createElement("div");
        var nombreCandidato = document.createElement("h3");
        var profesionCandidato = document.createElement("p");
    
        link.href = "../empresa/candidato.html";
        divFotoCandidato.classList.add("card_img");
        card.classList.add("card");
        card.setAttribute("data-id",candidato._id);
        
        const src = candidato.foto;

        if(src.startsWith("/images/")){
            fotoCandidato.src = candidato.foto;
        }else{
            const partes = src.split("\\");
            const indiceUploads = partes.indexOf("uploads");
            const rutaCorredida = partes.slice(indiceUploads).join("/");

            fotoCandidato.src = `/${rutaCorredida}`;
        } 

        nombreCandidato.innerText = `${candidato.nombre} ${candidato.apellidos}`;
        profesionCandidato.innerText = candidato.profesion;
        card.appendChild(divFotoCandidato);
        card.appendChild(fotoCandidato);
        card.appendChild(nombreCandidato);
        card.appendChild(profesionCandidato);
        divFotoCandidato.appendChild(fotoCandidato);
        link.append(card);
        grid.appendChild(link);
    
        num += 1;
        if(num > 3){
            break;
        }
    }

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", function () {
            const candidatoId = card.getAttribute("data-id");
            guardarCandidatoSeleccionadoHomePage(candidatoId);
        });
    });
}

async function cargarOfertas(){
    const url = "/puestos/getPuestos"

    try {
        const response = await fetch(url);

        if(response.ok){
            listaOfertas = await response.json();
            console.log(listaOfertas);
            cargarDatosOfertasHomePage(listaOfertas);
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarDatosOfertasHomePage(puestos){
    let num = 2;
    let nombreEmpresa;
    const grid = document.querySelector("#equipo");
    const puestosAleatorios = puestos.sort(() => Math.random() - 0.5);

    for(var puesto of puestosAleatorios){
        var empresaEncontrada = listaEmpresas.find(empresa => empresa._id == puesto.empresa_id);
        var divFotoEmpresa = document.createElement("div");
        var fotoEmpresa = document.createElement("img");
        var link = document.createElement("a");
        var card = document.createElement("div");
        var tituloPuesto = document.createElement("h3");
        var empresa = document.createElement("p");
        var rangoSalarial = document.createElement("p");

        if(empresaEncontrada){
            nombreEmpresa = empresaEncontrada.nombre;
            const src = empresaEncontrada.foto;
            if(src.startsWith("/images/")){
                fotoEmpresa.src = empresaEncontrada.foto;
            }else{
                const partes = src.split("\\");
                const indiceUploads = partes.indexOf("uploads");
                const rutaCorredida = partes.slice(indiceUploads).join("/");

                fotoEmpresa.src = `/${rutaCorredida}`;
            } 
        }
    
        link.href = "../candidato/ofertasTrabajo.html";
        divFotoEmpresa.classList.add("card_img");
        card.classList.add("card");
        card.setAttribute("data-id",puesto._id);
        tituloPuesto.innerText = puesto.nombre;
        empresa.innerText = nombreEmpresa;
        rangoSalarial.innerText = puesto.rango_salarial;
        card.appendChild(divFotoEmpresa);
        card.appendChild(tituloPuesto);
        card.appendChild(empresa);
        card.appendChild(rangoSalarial);
        link.append(card);
        grid.appendChild(link);
        divFotoEmpresa.appendChild(fotoEmpresa);
    
        num += 1;
        if(num > 4){
            break;
        }
    }

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", function () {
            const ofertaId = card.getAttribute("data-id");
            guardarOfertaSeleccionadaHomePage(ofertaId);
        });
    });
}

async function guardarOfertaSeleccionadaHomePage(ofertaId){
    ofertaSeleccionada = await listaOfertas.find(puesto => puesto._id === ofertaId);
    sessionStorage.setItem(`ofertaSeleccionada`,JSON.stringify(ofertaSeleccionada));
}

async function guardarCandidatoSeleccionadoHomePage(candidatoId){
    candidatoSeleccionado = await listaCandidatos.find(candidato => candidato._id === candidatoId);
    sessionStorage.setItem(`candidatoSeleccionado`,JSON.stringify(candidatoSeleccionado));
}

setTimeout(function() {
    cargarOfertas();
}, 100); 