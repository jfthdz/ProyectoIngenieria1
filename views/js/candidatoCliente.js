let listaEmpresas = {};
let listaCandidatos = {};
let listaPuestos = {};

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

async function obtenerPuestos(){
    const url = "/puestos/getPuestos"

    try {
        const response = await fetch(url);

        if(response.ok){
            listaPuestos = await response.json();
        }else{
            console.log("Error al enviar los datos");
        }
    } catch (error) {
        console.log(error);
    }
}

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

        const emailEmpresaExiste = listaEmpresas.find(empresa => empresa.correo === email.value);
        const emailCandidatoExiste = listaCandidatos.find(candidato => candidato.email === email.value);
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
        }else if (emailEmpresaExiste || emailCandidatoExiste) {
            email.style.border = "1px solid var(--redError)";
            errorEmail.innerText = "*Este correo ya se encuentra en uso";
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
            } else if (emailEmpresaExiste || emailCandidatoExiste) {
            primerCampoIncompleto = email;
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
    
    if(candidatoData.get("fotoPerfil").name === ""){
        const fotoPorDefecto = "/images/fotoPerfilDefault.jpeg";
        candidatoData.set("fotoPerfil", fotoPorDefecto);
    }

    const candidatoObjeto = {};
    candidatoData.forEach((value, key)=>{
        candidatoObjeto[key]=value;
    });
    console.log(candidatoObjeto);

    const url = "/candidatos/addCandidatos"

    try {
        const response = await fetch(url,{
            body: candidatoData,
            method: "POST"
        });

        if(response.ok){
            const datos = await response.json();
            console.log(datos);

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

//Validar formulario modificar candidato
function validarFormularioModificar() {
    try {
        event.preventDefault();
        var nombre = document.getElementById("nombreCandidato");
        var apellidos = document.getElementById("apellidosCandidato");
        var genero = document.getElementsByName("generoCandidato")[0];
        var email = document.getElementById("emailCandidato");
        var profesion = document.getElementById("profesionCandidato");
        var camposIncompletos = false;

        var errorNombre = document.getElementById("errorNombre");
        var errorApellidos = document.getElementById("errorApellidos");
        var errorGenero = document.getElementById("errorGenero");
        var errorEmail = document.getElementById("errorEmail");
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
            camposIncompletos = true;
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
            } else if (profesion.value === "") {
            primerCampoIncompleto = profesion;
            }

            // Hacer scroll al primer campo incompleto
            if (primerCampoIncompleto) {
            primerCampoIncompleto.scrollIntoView({ behavior: "smooth" });
            }

            return false;
        }else{
            modificarCandidato();
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarFormularioModificarCandidato(){
    var campoNombre = document.querySelector("#nombreCandidato");
    var campoApellidos = document.querySelector("#apellidosCandidato");
    var campoGenero = document.getElementsByName("generoCandidato")[0];
    var campoEmail = document.querySelector("#emailCandidato");
    var campoProfesion = document.querySelector("#profesionCandidato");
    var usuarioLoggeado = obtenerDatosUsuario();
    var rutaFotoPeril;

    if(usuarioLoggeado){
        rutaFotoPeril = usuarioLoggeado.foto
        sessionStorage.setItem("rutaFotoPerfil", rutaFotoPeril);
        addFotoPerfilModificarCandidato(rutaFotoPeril);
        campoNombre.value = usuarioLoggeado.nombre;
        campoApellidos.value = usuarioLoggeado.apellidos;
        campoGenero.value = usuarioLoggeado.genero;
        campoEmail.value = usuarioLoggeado.email;
        campoProfesion.value = usuarioLoggeado.profesion;

        if(usuarioLoggeado.experiencia.length > 0){
            if(usuarioLoggeado.experiencia[0].cargo != ""){
                var agregarExperiencia = document.getElementById("agregarExperiencia");
                var botonAgregarExperiencia = document.getElementById("boton-agregar-experiencia");
                botonAgregarExperiencia.disabled = true;

                for(let index=0; index < usuarioLoggeado.experiencia.length; index++){
                    var nuevaExperiencia = document.createElement("div");
                    nuevaExperiencia.classList.add("agregarExperiencia");
                    nuevaExperiencia.classList.add("mostrar");
                    nuevaExperiencia.style.display = "flex";
                    agregarExperiencia.classList.add("mostrar");
                    agregarExperiencia.style.display = "flex";

                    nuevaExperiencia.innerHTML = `<p id="tituloCargo">Nombre del cargo</p>
                                                <input placeholder='Ej: "Diseñador(a)","Asistente","Coordinador(a)", etc'
                                                type="text" name="cargoExperienciaCandidato[]" value="${usuarioLoggeado.experiencia[index].cargo}"/>
                                                <p id="tituloEmpresa">Nombre de la empresa</p>
                                                <input type="text" name="empresaExperienciaCandidato[]" value="${usuarioLoggeado.experiencia[index].empresa}"/>
                                                <p id="tituloResponsabilidades">Tus logros y responsabilidades</p>
                                                <textarea type="text" name="contenidoExperiencia[]" rows="3">${usuarioLoggeado.experiencia[index].contenido}</textarea>
                                                <p id="tituloFechaInicio">Fecha de inicio</p>
                                                <input type="date" name="fechaInicioExperiencia[]" value="${usuarioLoggeado.experiencia[index].fecha_inicio}"/>
                                                <p id="tituloFechaInicio">Fecha de finalización</p>
                                                <input type="date" name="fechaFinalExperiencia[]" value="${usuarioLoggeado.experiencia[index].fecha_final}"/>
                                                <button class="boton-registro" onclick="experienciaExtra()">
                                                Agregar otra experiencia
                                                </button>`;
                    
                    agregarExperiencia.appendChild(nuevaExperiencia);        
                }
            }
        }

        if(usuarioLoggeado.estudio.length > 0){
            if(usuarioLoggeado.estudio[0].titulo != ""){
                var agregarEstudios = document.getElementById("agregarEstudios");
                var botonAgregarEstudio = document.getElementById("boton-agregar-estudios");
                botonAgregarEstudio.disabled = true;

                for(let index=0; index < usuarioLoggeado.experiencia.length; index++){
                    var nuevoEstudio = document.createElement("div");
                    nuevoEstudio.classList.add("agregarExperiencia");
                    nuevoEstudio.classList.add("mostrar");
                    nuevoEstudio.style.display = "flex";
                    agregarEstudios.classList.add("mostrar");
                    agregarEstudios.style.display = "flex";

                    nuevoEstudio.innerHTML = `<p id="tituloEstudio">Título otorgado</p>
                                            <input placeholder='Ej: "Ingeniería","Bachillerato","Técnico", etc'
                                            type="text" name="tituloEstudioCandidato[]" value="${usuarioLoggeado.estudio[index].titulo}"/>
                                            <p id="tituloInstitucion">Nombre de la institución</p>
                                            <input type="text" name="institucionEstudioCandidato[]" value="${usuarioLoggeado.estudio[index].institucion}"/>
                                            <p id="tituloFechaInicio">Fecha de inicio</p>
                                            <input type="date" name="fechaInicioEstudio[]" value="${usuarioLoggeado.estudio[index].fecha_inicio}"/>
                                            <p id="tituloFechaInicio">Fecha de finalización</p>
                                            <input type="date" name="fechaFinalEstudio[]" value="${usuarioLoggeado.estudio[index].fecha_final}"/>
                                            <button class="boton-registro" onclick="estudiosExtra()">
                                            Agregar más estudios
                                            </button>`;
                    
                    agregarEstudios.appendChild(nuevoEstudio);        
                }
            }
        }
    }
}

function habilitarCamposModificarExperiencia(){
    event.preventDefault();
    var agregarExperiencia = document.getElementById("agregarExperiencia");
    var nuevaExperiencia = document.createElement("div");
    nuevaExperiencia.classList.add("agregarExperiencia");

    nuevaExperiencia.innerHTML = `<p id="tituloCargo">¿Qué cargo tuviste/tienes?</p>
                                <input placeholder='Ej: "Diseñador(a)","Asistente","Coordinador(a)", etc'
                                type="text" name="cargoExperienciaCandidato[]"/>
                                <p id="tituloEmpresa">Nombre de la empresa</p>
                                <input type="text" name="empresaExperienciaCandidato[]"/>
                                <p id="tituloResponsabilidades">Tus logros y responsabilidades</p>
                                <textarea type="text" name="contenidoExperiencia[]"></textarea>
                                <p id="tituloFechaInicio">Fecha de inicio</p>
                                <input type="date" name="fechaInicioExperiencia[]"/>
                                <p id="tituloFechaInicio">Fecha de finalización</p>
                                <input type="date" name="fechaFinalExperiencia[]"/>
                                <button class="boton-registro" onclick="experienciaExtra()">
                                Agregar otra experiencia
                                </button>`;
                
    agregarExperiencia.appendChild(nuevaExperiencia); 
    agregarExperiencia.style.display = "flex";
    nuevaExperiencia.classList.add("mostrar");
    nuevaExperiencia.style.display = "flex";
    setTimeout(function() {
        agregarExperiencia.classList.add("mostrar");
      }, 100);   
}

function habilitarCamposModificarEstudios(){
    event.preventDefault();
    var agregarEstudios = document.getElementById("agregarEstudios");
    var nuevoEstudio = document.createElement("div");
    nuevoEstudio.classList.add("agregarEstudios");

    nuevoEstudio.innerHTML = `<p id="tituloEstudio">Título otorgado</p>
                            <input placeholder='Ej: "Ingeniería","Bachillerato","Técnico", etc'
                            type="text" name="tituloEstudioCandidato[]"/>
                            <p id="tituloInstitucion">Nombre de la institución</p>
                            <input type="text" name="institucionEstudioCandidato[]"/>
                            <p id="tituloFechaInicio">Fecha de inicio</p>
                            <input type="date" name="fechaInicioEstudio[]"/>
                            <p id="tituloFechaInicio">Fecha de finalización</p>
                            <input type="date" name="fechaFinalEstudio[]"/>
                            <button class="boton-registro" onclick="estudiosExtra()">
                            Agregar más estudios
                            </button>`;
                
    agregarEstudios.appendChild(nuevoEstudio); 
    agregarEstudios.style.display = "flex";
    nuevoEstudio.classList.add("mostrar");
    nuevoEstudio.style.display = "flex";
    setTimeout(function() {
        agregarEstudios.classList.add("mostrar");
      }, 100);   
}

async function modificarCandidato(){
    const candidatoData = new FormData(document.querySelector("#form-modificar-candidato"));
    const usuarioLoggeado = obtenerDatosUsuario();
    const _id = usuarioLoggeado._id.toString();
    candidatoData.append("_id",_id);
    
    const rutaFoto = sessionStorage.getItem("rutaFotoPerfil")
    if(candidatoData.get("fotoPerfil").name === ""){
        candidatoData.set("fotoPerfil", rutaFoto);
    }

    const url = "/candidatos/updateCandidatos"

    try {
        const response = await fetch(url,{
            body: candidatoData,
            method: "POST"
        });

        if(response.ok){
            //Actualizamos el Candidato Modificado en el item del sessionStorage
            almacenarDatosCandidatoModificado(_id);

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

async function almacenarDatosCandidatoModificado(candidatoId){
    const url = "/candidatos/getCandidatoPorId"
    const data = new FormData();
    data.append("_id", candidatoId);

    try {
        const response = await fetch(url,{
            body: data,
            method: "POST"
        });

        if(response.ok){
            const datos = await response.json();
            const candidatoModificado = datos.candidatoEncontrado;
            if(candidatoModificado){
                sessionStorage.setItem("datosUsuarioLoggeado", JSON.stringify(candidatoModificado));
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

async function cargarAplicaciones(){
    const url = "/candidato/getAplicacionesCandidato"; 
    var usuarioLoggeado = obtenerDatosUsuario();
    const usuario = new FormData();

    usuario.append("userId", usuarioLoggeado._id);

    try {
        const response = await fetch(url,{
            body: usuario,
            method: "POST"
        });

        if(response.ok){
            const listaAplicaciones = await response.json();
            if(listaAplicaciones){
                cargarAplicacionesTabla(listaAplicaciones, usuarioLoggeado._id); 
            }
        }else{
            console.log("Error al obtener las aplicaciones hechas");
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarAplicacionesTabla(listaAplicaciones, userId) {
    const tabla = document.querySelector("#tablaAplicaciones tbody");
    tabla.innerHTML = '';

    for(let aplicacion of listaAplicaciones) {
        setTimeout(function() {
            const empresa = listaEmpresas.find(empresa => empresa._id === aplicacion.empresa_id);
            const puesto = listaPuestos.find(puesto => puesto._id === aplicacion.puesto_id);
            const fila = document.createElement("tr");
    
            const celdaPuesto = document.createElement("td");
            celdaPuesto.innerText = puesto.nombre; 
            fila.appendChild(celdaPuesto);

            const celdaEmpresa = document.createElement("td");
            celdaEmpresa.innerHTML = empresa.nombre;
            fila.appendChild(celdaEmpresa);

            const celdaFecha = document.createElement("td");
            celdaFecha.innerText = aplicacion.fecha_aplicacion; 
            fila.appendChild(celdaFecha);
    
            const celdaEstado = document.createElement("td");
            celdaEstado.innerText = aplicacion.estado; 
            fila.appendChild(celdaEstado);

            const celdaAcciones = document.createElement("td");
            const botonEliminar = document.createElement("button");
            botonEliminar.innerText = "Eliminar";
            botonEliminar.onclick = function() {
                eliminarAplicacion(userId, puesto._id);
            };
            celdaAcciones.appendChild(botonEliminar);

            fila.appendChild(celdaAcciones);
    
            tabla.appendChild(fila);
        }, 100);
    }
}

function filtrarAplicaciones(){
    try {
        event.preventDefault();
        const puesto = document.querySelector("#puesto");
        const empresa = document.querySelector("#empresa");
        const fecha = document.querySelector("#fecha");
        const estado = document.querySelector("#estado");
        var errorFiltro = document.querySelector("#errorFiltro");
        var camposIncompletos = false;

        if (empresa.value === "" && fecha.value === "" && puesto.value === "" && estado.value === "") {
            empresa.style.border = "1px solid var(--redError)";
            fecha.style.border = "1px solid var(--redError)";
            puesto.style.border = "1px solid var(--redError)";
            estado.style.border = "1px solid var(--redError)";
            errorFiltro.innerText = "*Se necesita al menos un filtro.";
            errorFiltro.style.display = "block";
            camposIncompletos = true;
        } else {
            empresa.style.border = "0";
            fecha.style.border = "0";
            puesto.style.border = "0";
            estado.style.border = "0";
            errorFiltro.innerText = "";
            errorFiltro.style.display = "none";
        }

        if (camposIncompletos) {
            return false;
        }else{
            const tabla = document.querySelector("#tablaAplicaciones");
            const filas = document.querySelectorAll("#tablaAplicaciones tbody tr");
            const mensajeSinResultados = document.querySelector("#sinResultados");
            const filtroEmpresa = empresa.value.toLowerCase();
            const filtroFecha = fecha.value.toLowerCase();
            const filtroPuesto = puesto.value.toLowerCase();
            const filtroEstado = estado.value.toLowerCase();
            let hayResultados = false;

            filas.forEach((fila) => {
                const puesto = fila.querySelector("td:first-child").textContent.toLowerCase();
                const empresa = fila.querySelector("td:nth-child(2)").textContent.toLowerCase();
                const fecha = fila.querySelector("td:nth-child(3)").textContent.toLowerCase();
                const estado = fila.querySelector("td:nth-child(4)").textContent.toLowerCase();
        
                const cumpleFiltros =
                    empresa.includes(filtroEmpresa) &&
                    fecha.includes(filtroFecha) &&
                    puesto.includes(filtroPuesto) &&
                    estado.includes(filtroEstado);

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

async function eliminarAplicacion(userId, puestoId){
    try {
        const url = "/candidato/borrarAplicacion";
        const data = new FormData();
        data.append("userId", userId);
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

async function cargarInvitaciones(){
    const url = "/candidato/getInvitacionesCandidato"; 
    var usuarioLoggeado = obtenerDatosUsuario();
    const usuario = new FormData();

    usuario.append("userId", usuarioLoggeado._id);

    try {
        const response = await fetch(url,{
            body: usuario,
            method: "POST"
        });

        if(response.ok){
            const listaInvitaciones = await response.json();
            if(listaInvitaciones){
                cargarInvitacionesTabla(listaInvitaciones, usuarioLoggeado._id); 
            }
        }else{
            console.log("Error al obtener las invitaciones");
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarInvitacionesTabla(listaInvitaciones, userId) {
    const tabla = document.querySelector("#tablaInvitaciones tbody");
    tabla.innerHTML = '';

    for(let invitacion of listaInvitaciones) {
        setTimeout(function() {
            const empresa = listaEmpresas.find(empresa => empresa._id === invitacion.empresa_id);
            const puesto = listaPuestos.find(puesto => puesto._id === invitacion.puesto_id);
            const fila = document.createElement("tr");
    
            const celdaPuesto = document.createElement("td");
            celdaPuesto.innerText = puesto.nombre; 
            fila.appendChild(celdaPuesto);

            const celdaEmpresa = document.createElement("td");
            celdaEmpresa.innerHTML = empresa.nombre;
            fila.appendChild(celdaEmpresa);

            const celdaFecha = document.createElement("td");
            celdaFecha.innerText = invitacion.fecha_creacion; 
            fila.appendChild(celdaFecha);
    
            const celdaEstado = document.createElement("td");
            celdaEstado.innerText = invitacion.estado; 
            fila.appendChild(celdaEstado);

            const celdaAcciones = document.createElement("td");
            if(invitacion.estado === "Aceptada" || invitacion.estado === "Rechazada"){
                const botonEliminar = document.createElement("button");
                botonEliminar.innerText = "Eliminar";

                botonEliminar.onclick = function() {
                    eliminarInvitacion(userId, puesto._id);
                };
                celdaAcciones.appendChild(botonEliminar);
            }else{
                const botonAceptar = document.createElement("button");
                const botonRechazar = document.createElement("button");
                botonAceptar.innerText = "Aceptar";
                botonRechazar.innerText = "Rechazar";
    
                botonAceptar.onclick = function() {
                    aceptarInvitacion(puesto._id, puesto.nombre);
                };
                botonRechazar.onclick = function() {
                    rechazarInvitacion(puesto._id, puesto.nombre);
                };
    
                celdaAcciones.appendChild(botonAceptar);
                celdaAcciones.appendChild(botonRechazar);
            }

            fila.appendChild(celdaAcciones);
    
            tabla.appendChild(fila);
        }, 100);
    }
}

function filtrarInvitaciones(){
    try {
        event.preventDefault();
        const puesto = document.querySelector("#puesto");
        const empresa = document.querySelector("#empresa");
        const fecha = document.querySelector("#fecha");
        const estado = document.querySelector("#estado");
        var errorFiltro = document.querySelector("#errorFiltro");
        var camposIncompletos = false;

        if (empresa.value === "" && fecha.value === "" && puesto.value === "" && estado.value === "") {
            empresa.style.border = "1px solid var(--redError)";
            fecha.style.border = "1px solid var(--redError)";
            puesto.style.border = "1px solid var(--redError)";
            estado.style.border = "1px solid var(--redError)";
            errorFiltro.innerText = "*Se necesita al menos un filtro.";
            errorFiltro.style.display = "block";
            camposIncompletos = true;
        } else {
            empresa.style.border = "0";
            fecha.style.border = "0";
            puesto.style.border = "0";
            estado.style.border = "0";
            errorFiltro.innerText = "";
            errorFiltro.style.display = "none";
        }

        if (camposIncompletos) {
            return false;
        }else{
            const tabla = document.querySelector("#tablaInvitaciones");
            const filas = document.querySelectorAll("#tablaInvitaciones tbody tr");
            const mensajeSinResultados = document.querySelector("#sinResultados");
            const filtroEmpresa = empresa.value.toLowerCase();
            const filtroFecha = fecha.value.toLowerCase();
            const filtroPuesto = puesto.value.toLowerCase();
            const filtroEstado = estado.value.toLowerCase();
            let hayResultados = false;

            filas.forEach((fila) => {
                const puesto = fila.querySelector("td:first-child").textContent.toLowerCase();
                const empresa = fila.querySelector("td:nth-child(2)").textContent.toLowerCase();
                const fecha = fila.querySelector("td:nth-child(3)").textContent.toLowerCase();
                const estado = fila.querySelector("td:nth-child(4)").textContent.toLowerCase();
        
                const cumpleFiltros =
                    empresa.includes(filtroEmpresa) &&
                    fecha.includes(filtroFecha) &&
                    puesto.includes(filtroPuesto) &&
                    estado.includes(filtroEstado);

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

async function eliminarInvitacion(userId, puestoId){
    try {
        const url = "/candidato/borrarInvitacion";
        const data = new FormData();
        data.append("userId", userId);
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

async function aceptarInvitacion(puestoId, puestoNombre){
    try {
        const usuarioLoggeado = obtenerDatosUsuario();
        const url = "/candidato/aceptarInvitacion";
        const data = new FormData();
        data.append("userId", usuarioLoggeado._id);
        data.append("puestoId", puestoId);
        data.append("userNombre", usuarioLoggeado.nombre);
        data.append("puestoNombre", puestoNombre);

        const temp = {};
        data.forEach((value, key) =>{
            temp[key] =value;
        });
        console.log(temp);
        
        const response = await fetch(url, {
            body: data,
            method: "POST",
        });

        if (response.ok) {
            location.reload();
        }else {
            console.log("Error al aceptar la invitación.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function rechazarInvitacion(puestoId, puestoNombre){
    try {
        const usuarioLoggeado = obtenerDatosUsuario();
        const url = "/candidato/rechazarInvitacion";
        const data = new FormData();
        data.append("userId", usuarioLoggeado._id);
        data.append("puestoId", puestoId);
        data.append("userNombre", usuarioLoggeado.nombre);
        data.append("puestoNombre", puestoNombre);
        data.append("userEmail", usuarioLoggeado.email);
        
        const response = await fetch(url, {
            body: data,
            method: "POST",
        });

        if (response.ok) {
            location.reload();
        }else {
            console.log("Error al rechazar la invitación.");
        }
    } catch (error) {
        console.error(error);
    }
}