let estadoOferta = "";

function validarFormularioCrearOferta() {
    try {
        event.preventDefault();
        const opcionPrivada = document.querySelector('label[for="privado"]');
        const opcionPublica = document.querySelector('label[for="publico"]');
        var tituloOferta = document.getElementById("tituloOferta");
        var reqMinimos = document.getElementById("reqMinimos");
        var reqDeseables = document.getElementById("reqDeseables");
        var plus = document.getElementById("plus");
        var rangoInicialOferta = document.getElementById("rangoInicialOferta");
        var rangoMaximoOferta = document.getElementById("rangoMaximoOferta");
        var ubicacionOferta = document.getElementById("ubicacionOferta");
        var camposIncompletos = false;

        var errorEstado = document.getElementById("errorEstado");
        var errorTituloOferta = document.getElementById("errorTituloOferta");
        var errorReqMinimos = document.getElementById("errorReqMinimos");
        var errorReqDeseables = document.getElementById("errorReqDeseables");
        var errorPlus = document.getElementById("errorPlus");
        var errorRangoInicialOferta = document.getElementById("errorRangoInicialOferta");
        var errorRangoMaximoOferta = document.getElementById("errorRangoMaximoOferta");
        var errorUbicacionOferta = document.getElementById("errorUbicacionOferta");

        if(estadoOferta === ""){
            opcionPrivada.style.border = "1px solid var(--redError)";
            opcionPublica.style.border = "1px solid var(--redError)";
            errorEstado.innerText = "Seleccione una opcion";
            errorEstado.style.display = "block";
            camposIncompletos = true;
        }else{
            opcionPrivada.style.border = "0";
            opcionPublica.style.border = "0";
            errorTituloOferta.style.display = "none";
        }

        if (tituloOferta.value === "") {
            tituloOferta.style.border = "1px solid var(--redError)";
            errorTituloOferta.innerText = "*Campo necesario";
            errorTituloOferta.style.display = "block";
            camposIncompletos = true;
        } else {
            tituloOferta.style.border = "0";
            errorTituloOferta.style.display = "none";
        }

        if (reqMinimos.value === "") {
            reqMinimos.style.border = "1px solid var(--redError)";
            errorReqMinimos.innerText = "*Campo necesario";
            errorReqMinimos.style.display = "block";
            camposIncompletos = true;
        } else {
            reqMinimos.style.border = "0";
            errorReqMinimos.style.display = "none";
        }

        if (reqDeseables.value === "") {
            reqDeseables.style.border = "1px solid var(--redError)";
            errorReqDeseables.innerText = "*Campo necesario";
            errorReqDeseables.style.display = "block";
            camposIncompletos = true;
        } else {
            reqDeseables.style.border = "0";
            errorReqDeseables.style.display = "none";
        }

        if (plus.value === "") {
            plus.style.border = "1px solid var(--redError)";
            errorPlus.innerText = "*Campo necesario";
            errorPlus.style.display = "block";
            camposIncompletos = true;
        } else {
            plus.style.border = "0";
            errorPlus.style.display = "none";
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
            // Validar cual es el primer campo incompleto
            var primerCampoIncompleto = null;
            if (estadoOferta === "") {
            primerCampoIncompleto = opcionPrivada;
            } else if (tituloOferta.value === "") {
            primerCampoIncompleto = tituloOferta;
            } else if (reqMinimos.value ==="") {
            primerCampoIncompleto = reqMinimos;
            } else if (reqDeseables.value === "") {
            primerCampoIncompleto = reqDeseables;
            }

            // Hacer scroll al primer campo incompleto
            if (primerCampoIncompleto) {
            primerCampoIncompleto.scrollIntoView({ behavior: "smooth" });
            }

            return false;
        }else{
            addPuesto();  
        }
    } catch (error) {
        console.log(error);
    }
}
async function addPuesto(){
    const puestoData = new FormData(document.querySelector("#form-add-Puesto"));
    const url = "/puestos/addPuestos"

    puestoData.append("tipo",estadoOferta);
    const puestoObject = {};
    puestoData.forEach((value, key) =>{
        puestoObject[key]= value;
    });
    console.log(puestoObject);

    try {
        const response = await fetch(url,{
            body: puestoData,
            method: "POST"
        });

        if(response.ok){
            const datos = await response.json();
            console.log(datos);

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
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}
// (se utiliza {puestos} en plural cuando es una palabra sola, y puesto en singular al utilizar variantes tipo Data,add,get, etc... para diferenciar)
async function updatePuesto(){
    const puestoData = new FormData(document.querySelector("#form-update-Puesto"));
    const url = "/puestos/updatePuestos"

    try {
        const response = await fetch(url,{
            body: puestosData,
            method: "POST"
        });

        if(response.ok){
            const datos = Object.entries(puestoData.entries());
            const jsonString = JSON.stringify(datos);
            console.log(jsonString);


        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

function cambiarEstado(tipoEstado){
    const opcionPrivada = document.querySelector('label[for="privado"]');
    const opcionPublica = document.querySelector('label[for="publico"]');

    if(tipoEstado === "publico"){
        opcionPublica.style.border = "2px solid var(--lightpurple)";
        opcionPrivada.style.border = "0";

        estadoOferta = "publico";
    }else if(tipoEstado === "privado"){
        opcionPrivada.style.border = "2px solid var(--lightpurple)";
        opcionPublica.style.border = "0";

        estadoOferta = "privado";
    }
}

function limpiarCamposCrearOferta(){
    const opcionPrivada = document.querySelector('label[for="privado"]');
    const opcionPublica = document.querySelector('label[for="publico"]');
    const tituloOferta = document.getElementById("tituloOferta");
    const reqMinimos = document.getElementById("reqMinimos");
    const reqDeseables = document.getElementById("reqDeseables");
    const plus = document.getElementById("plus");
    const rangoInicialOferta = document.getElementById("rangoInicialOferta");
    const rangoMaximoOferta = document.getElementById("rangoMaximoOferta");
    const ubicacionOferta = document.getElementById("ubicacionOferta");

    opcionPrivada.style.border = "0";
    opcionPublica.style.border = "0";
    tituloOferta.value = "";
    reqMinimos.value = "";
    reqDeseables.value = "";
    plus.value = "";
    rangoInicialOferta.value = "";
    rangoMaximoOferta.value = "";
    ubicacionOferta.value = "";
}