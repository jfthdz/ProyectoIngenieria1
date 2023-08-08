//Funciones en Registrar candidato
function habilitarCamposExperiencia(){
    event.preventDefault();
    var agregarExperiencia = document.getElementById("agregarExperiencia");
    agregarExperiencia.style.display = "flex";
    setTimeout(function() {
        agregarExperiencia.classList.add("mostrar");
      }, 100);    
}

function deshabilitarCamposExperiencia(){
    var agregarExperiencia = document.getElementById("agregarExperiencia");
    agregarExperiencia.style.display = "none";
}

function habilitarCamposEstudios(){
    event.preventDefault();
    var agregarEstudios = document.getElementById("agregarEstudios");
    agregarEstudios.style.display = "flex";
    setTimeout(function() {
        agregarEstudios.classList.add("mostrar");
      }, 100);    
}

function deshabilitarCamposEstudios(){
    var agregarEstudios = document.getElementById("agregarEstudios");
    agregarEstudios.style.display = "none";   
}
function experienciaExtra(){
    event.preventDefault();
    var agregarExperiencia = document.getElementById("agregarExperiencia");

    var nuevaExperiencia = document.createElement("div");
    nuevaExperiencia.classList.add("agregarExperiencia");

    nuevaExperiencia.innerHTML = `<p id="tituloCargo">¿Qué cargo tuviste/tienes?</p>
    <input placeholder='Ej: "Diseñador(a)","Asistente","Coordinador(a)", etc'
      type="text" name="cargoExperienciaCandidato[]"/>
    <p id="tituloEmpresa">Nombre de la empresa</p>
    <input type="text" name="empresaExperienciaCandidato[]" />
    <p id="tituloResponsabilidades">Tus logros y responsabilidades</p>
    <textarea type="text" name="contenidoExperiencia[]"></textarea>
    <p id="tituloFechaInicio">Fecha de inicio</p>
    <input type="date" name="fechaInicioExperiencia[]" />
    <p id="tituloFechaInicio">Fecha de finalización</p>
    <input type="date" name="fechaFinalExperiencia[]" />
    <button class="boton-registro" onclick="experienciaExtra()">
      Agregar otra experiencia
    </button>`;
    
    console.log(nuevaExperiencia);
    agregarExperiencia.appendChild(nuevaExperiencia);        
    nuevaExperiencia.style.display = "flex";
    setTimeout(function() {
        nuevaExperiencia.classList.add("mostrar");
    }, 100);    
}

function estudiosExtra(){
    event.preventDefault();
    var agregarEstudios = document.getElementById("agregarEstudios");
    var nuevoEstudio = document.createElement("div");
    nuevoEstudio.classList.add("agregarEstudios");

    nuevoEstudio.innerHTML = `<p id="tituloEstudio">Título otorgado</p>
    <input placeholder='Ej: "Ingeniería","Bachillerato","Técnico", etc'
      type="text" name="tituloEstudioCandidato[]"/>
    <p id="tituloInstitucion">Nombre de institución en la que estudiaste</p>
    <input type="text" name="institucionEstudioCandidato[]" />
    <p id="tituloFechaInicio">Fecha de inicio</p>
    <input type="date" name="fechaInicioEstudio[]" />
    <p id="tituloFechaInicio">Fecha de finalización</p>
    <input type="date" name="fechaFinalEstudio[]" />
    <button class="boton-registro" onclick="estudiosExtra()">
      Agregar más estudios
    </button>`;
    
    console.log(nuevoEstudio);
    agregarEstudios.appendChild(nuevoEstudio);        
    nuevoEstudio.style.display = "flex";
    setTimeout(function() {
        nuevoEstudio.classList.add("mostrar");
    }, 100);      
}

function subirImagen(){
    let fotoPerfil = document.getElementById("img-perfil");
    let inputFotoPerfil = document.getElementById("inputFotoPerfil");
    
    inputFotoPerfil.onchange = function(){
        fotoPerfil.src = URL.createObjectURL(inputFotoPerfil.files[0]);
    }
    console.log(fotoPerfil);
}

//Validar formulario registrar candidato
async function validarFormulario() {
    try {
        event.preventDefault();
        var nombre = document.getElementById("nombreCandidato");
        var apellidos = document.getElementById("apellidosCandidato");
        var genero = document.getElementsByName("generoCandidato")[0];
        var email = document.getElementById("emailCandidato");
        var password = document.getElementById("passwordCandidato");
        var profesion = document.getElementById("profesionCandidato");
        var camposIncompletos = false;

        var errorNombre = document.getElementById("errorNombre");
        var errorApellidos = document.getElementById("errorApellidos");
        var errorGenero = document.getElementById("errorGenero");
        var errorEmail = document.getElementById("errorEmail");
        var errorPassword = document.getElementById("errorPassword");
        var errorProfesion = document.getElementById("errorProfesion");

        //expresión regular para validar formato de correo
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if (nombre.value === "") {
            nombre.style.border = "1px solid var(--redError)";
            errorNombre.innerText = "*Campo necesario";
            errorNombre.style.display = "block";
            camposIncompletos = true;
        } else {
            nombre.style.border = "0";
            errorNombre.innerText = "";
            errorNombre.style.display = "none";
        }

        if (apellidos.value === "") {
            apellidos.style.border = "1px solid var(--redError)";
            errorApellidos.innerText = "*Campo necesario";
            errorApellidos.style.display = "block";
            camposIncompletos = true;
        } else {
            apellidos.style.border = "0";
            errorApellidos.innerText = "";
            errorApellidos.style.display = "none";
        }

        var valorGeneroSeleccionado = genero.value;
        if (valorGeneroSeleccionado!="default") {
            errorGenero.innerText = "";
            errorGenero.style.display = "none";
        }else{
            errorGenero.innerText = "*Debe seleccionar una opción";
            errorGenero.style.display = "block";
        }

        if (email.value === "") {
            email.style.border = "1px solid var(--redError)";
            errorEmail.innerText = "*Campo necesario";
            errorEmail.style.display = "block";
            camposIncompletos = true;
        } else if(regexEmail.test(email.value)==false){
            email.style.border = "1px solid var(--redError)";
            errorEmail.innerText = "*Ingrese un correo válido";
            errorEmail.style.display = "block";
            camposIncompletos = true;
        }else{
            email.style.border = "0";
            errorEmail.innerText = "";
            errorEmail.style.display = "none";
        }

        if (password.value === "") {
            password.style.border = "1px solid var(--redError)";
            errorPassword.innerText = "*Campo necesario";
            errorPassword.style.display = "block";
            camposIncompletos = true;
        } else {
            password.style.border = "0";
            errorPassword.innerText = "";
            errorPassword.style.display = "none";
        }

        if (profesion.value === "") {
            profesion.style.border = "1px solid var(--redError)";
            errorProfesion.innerText = "*Campo necesario";
            errorProfesion.style.display = "block";
            camposIncompletos = true;
        } else {
            profesion.style.border = "0";
            errorProfesion.innerText = "";
            errorProfesion.style.display = "none";
        }

        // Si se encontraron campos incompletos, detener el envío del formulario
        if (camposIncompletos) {
            // Validar cual es el primer campo incompleto
            var primerCampoIncompleto = null;
            if (nombre.value === "") {
            primerCampoIncompleto = nombre;
            } else if (apellidos.value === "") {
            primerCampoIncompleto = apellidos;
            } else if (valorGeneroSeleccionado==="default") {
            primerCampoIncompleto = genero;
            } else if (email.value === "") {
            primerCampoIncompleto = email;
            } else if (password.value === "") {
            primerCampoIncompleto = password;
            } else if (profesion.value === "") {
            primerCampoIncompleto = profesion;
            }

            // Hacer scroll al primer campo incompleto
            if (primerCampoIncompleto) {
            primerCampoIncompleto.scrollIntoView({ behavior: "smooth" });
            }

            return false;
        }else{
            //Si todos los campos estan completos, se procede con el registro
            registrarCandidato();
        }
    } catch (error) {
        console.log(error);
    }
}

function limpiarCamposRegistrarCandidato(){
    var fotoPerfil = document.querySelector("#img-perfil");
    var nombre = document.getElementById("nombreCandidato");
    var apellidos = document.getElementById("apellidosCandidato");
    var genero = document.getElementsByName("generoCandidato")[0];
    var email = document.getElementById("emailCandidato");
    var password = document.getElementById("passwordCandidato");
    var profesion = document.getElementById("profesionCandidato");

    var divAgregarExperiencia = document.querySelector("#agregarExperiencia");
    var inputsAgregarExperiencia = document.querySelectorAll("#agregarExperiencia > input");
    var textAreasAgregarExperiencia = document.querySelectorAll("#agregarExperiencia > textarea");
    var divAgregarEstudios = document.querySelector("#agregarEstudios");
    var inputsAgregarEstudios = document.querySelectorAll("#agregarExperiencia > input");
    
    fotoPerfil.src = "../../images/fotoPerfilDefault.jpeg"
    nombre.value = "";
    apellidos.value = "";
    genero.value = "default";
    email.value = "";
    password.value = "";
    profesion.value = "";

    //limpiar todos los inputs y textAreas que existan de Agregar Experiencia
    for(var inputExp=0; inputExp < inputsAgregarExperiencia.length; inputExp++){
        inputsAgregarExperiencia[inputExp].value = "";
    }
    for(var textAreaExp=0; textAreaExp < textAreasAgregarExperiencia.length; textAreaExp++){
        textAreasAgregarExperiencia[textAreaExp].value = "";
    }
    //limpiar todos los inputs que existan de Agregar Estudios
    for(var inputEst=0; inputEst < inputsAgregarEstudios.length; inputEst++){
        inputsAgregarEstudios[inputEst].value = "";
    }

    //reiniciar div agregar experiencia
    var reiniciarCamposExp = `<p id="tituloCargo">¿Qué cargo tuviste/tienes?</p>
    <input placeholder='Ej: "Diseñador(a)","Asistente","Coordinador(a)", etc'
      type="text" name="cargoExperienciaCadidato"/>
    <p id="tituloEmpresa">Nombre de la empresa</p>
    <input type="text" name="empresaExperienciaCandidato" />
    <p id="tituloResponsabilidades">Tus logros y responsabilidades</p>
    <textarea type="text" name="contenidoExperiencia"></textarea>
    <p id="tituloFechaInicio">Fecha de inicio</p>
    <input type="date" name="fechaInicioExperiencia" />
    <p id="tituloFechaInicio">Fecha de finalización</p>
    <input type="date" name="fechaFinalExperiencia" />
    <button class="boton-registro" onclick="experienciaExtra()">
      Agregar otra experiencia
    </button>`;
    divAgregarExperiencia.innerHTML = reiniciarCamposExp; 

    //reiniciar div agregar estudios
    var reiniciarCamposEst = `<p id="tituloEstudio">Título otorgado</p>
    <input placeholder='Ej: "Ingeniería","Bachillerato","Técnico", etc'
      type="text" name="tituloEstudiocandidato"/>
    <p id="tituloInstitucion">Nombre de institución en la que estudiaste</p>
    <input type="text" name="institucionEstudioCandidato" />
    <p id="tituloFechaInicio">Fecha de inicio</p>
    <input type="date" name="fechaInicioEstudio" />
    <p id="tituloFechaInicio">Fecha de finalización</p>
    <input type="date" name="fechaFinalExperiencia" />
    <button class="boton-registro" onclick="estudiosExtra()">
      Agregar más estudios
    </button>`;
    divAgregarEstudios.innerHTML = reiniciarCamposEst; 
}

async function registrarCandidato(){
    const candidatoData = new FormData(document.querySelector("#form-registrar-candidato"));
    const url = "/candidatos/addCandidatos"

    try {
        const response = await fetch(url,{
            body: candidatoData,
            method: "POST"
        });

        if(response.ok){
            const datos = Object.entries(candidatoData.entries());
            const jsonString = JSON.stringify(datos);
            console.log(jsonString);

            var navBuscoEmpleo = document.querySelector("#nav-buscoempleo");
            var mensajeExito = document.querySelector("#mensajeExito");
            mensajeExito.style.display = "flex";
            setTimeout(function() {
                mensajeExito.classList.add("mostrar");
                navBuscoEmpleo.scrollIntoView({behavior: "smooth"});
            }, 100); 

            limpiarCamposRegistrarCandidato();
            deshabilitarCamposEstudios();
            deshabilitarCamposExperiencia();
            
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

