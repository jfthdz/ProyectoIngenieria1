async function obtenerPuestos(){
    const url = "/puestos/getPuestos"

    try {
        const response = await fetch(url);

        if(response.ok){
            const datos = await response.json();
            console.log(datos);
            mostrarOfertas(datos);
            almacenarDatoPuesto(datos);

        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

async function obtenerPuestospoID(){
    const url = "/puestos/getPuestos"
    const puesto = obtenerPuestoSessionStorage();

    

    try {
        const response = await fetch(url,{
            body: 
            method: "POST"
        });
        

        if(response.ok){
            const datos = await response.json();
            console.log(datos);
            mostrarOfertas(datos);
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

async function almacenarDatoPuesto(datos){
    sessionStorage.setItem("puestoData", datos);
}

function mostrarOfertas (datos){
    const contenidoOpcionesDiv = document.querySelector(".contenido-opciones");
    const nuevoPuesto= document.createElement("div");
    for (let puesto of datos){

        nuevoPuesto.classList.add("opcion");
        nuevoPuesto.innerHTML = `
            <div class="opcion-info">
            <img class="imgFotoPerfilMostrarCandidato" src="../../images/logo-cenfotec.png">
            
            <div class="opcion-info-texto">
                <h3>${puesto.nombre}</h3>
                <p>${puesto.empresa_id}</p>
                <p>${puesto.rango_salarial}</p>
            </div>
            
            </div>
            <div class="opcion-boton">
            <a href="../candidato/ofertasTrabajo.html">
                <button class="boton-contenido" onclick="guardarOfertaSeleccionado(1)">Ver</button>
            </a>
            </div>
        `; 

        contenidoOpcionesDiv.appendChild(nuevoPuesto);
        console.log(nuevoPuesto);
    }
}

function obtenerPuestoSessionStorage(){
    var datosPuestoJSON = sessionStorage.getItem("puestoData");
    if(datosPuestoJSON ){
        return JSON.parse(datosPuestoJSON );
    }else{
        return null;
    }
}
