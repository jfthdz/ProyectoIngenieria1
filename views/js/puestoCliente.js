function validarFormularioCrearOferta() {
    try {
        event.preventDefault();
        var tituloOferta = document.getElementById("tituloOferta");
        var descripcionOferta = document.getElementById("descripcionOferta");
        var rangoInicialOferta = document.getElementById("rangoInicialOferta");
        var rangoMaximoOferta = document.getElementById("rangoMaximoOferta");
        var ubicacionOferta = document.getElementById("ubicacionOferta");
        var camposIncompletos = false;
        
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
            addPuesto();  
        }
    } catch (error) {
        console.log(error);
    }
}
async function addPuesto(){
    const puestoData = new FormData(document.querySelector("#form-add-Puesto"));
    const url = "/puestos/addPuestos"

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