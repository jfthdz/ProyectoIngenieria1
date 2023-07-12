var usuarios = [
    {nombre:"Jafet",apellidos:"Hernandez Alfaro",email:"jafethernandez2206@gmail.com",pass:"admin",rol:"Developer",foto:"../images/jafet.jpg"},
    {nombre:"Prueba",apellidos:"de usuarios",email:"prueba@gmail.com",pass:"123",rol:"Prueba",foto:"../images/fotoPerfilDefault.jpeg"}
];

var puestoTrabajo = [
    {
        empresa: "BCR",
        titulo:"FrontEnd Developer",
        rangoSalarial:"¢ 650 a 750 mil",
        reqMinimo:`Experiencia previa en desarrollo web.
        Conocimiento de HTML, CSS, JavaScript, PHP y MySQL.
        Comprensión de los principios de diseño web.
        Comprensión de los principios de programación.
        Comprensión de los principios de seguridad web.
        Capacidad para trabajar en equipo.
        Mentalidad de aprendizaje.`,
        reqDeseable:`Experiencia laboral de 2 años en desarrollo web.
        Comprensión del desarrollo front-end utilizando frameworks Angular y/o React.
        Experiencia con sistemas de control de versiones, como Git.
        Conocimiento de metodologías ágiles de desarrollo y mejores prácticas.`,
        plus:`Título en informática, ingeniería o un campo relacionado (o experiencia práctica equivalente).
        Familiaridad con las API RESTful y su integración en aplicaciones web.`
    },
    {
        empresa: "Amazon",
        titulo:"Full Stack Developer",
        rangoSalarial:"¢ 1 a 1,5 millones",
        reqMinimo:`Experiencia previa en desarrollo web.
        Conocimiento de HTML, CSS, JavaScript, PHP y MySQL.
        Comprensión de los principios de diseño web.
        Comprensión de los principios de programación.
        Comprensión de los principios de seguridad web.
        Capacidad para trabajar en equipo.
        Mentalidad de aprendizaje.`,
        reqDeseable:`Experiencia laboral de 2 años en desarrollo web.
        Comprensión del desarrollo front-end utilizando frameworks Angular y/o React.
        Experiencia con sistemas de control de versiones, como Git.
        Conocimiento de metodologías ágiles de desarrollo y mejores prácticas.`,
        plus:`Título en informática, ingeniería o un campo relacionado (o experiencia práctica equivalente).
        Familiaridad con las API RESTful y su integración en aplicaciones web.`
    },
    {
        empresa: "Intel",
        titulo:"Backend Mid Developer",
        rangoSalarial:"¢ 750 mil a 1 millón",
        reqMinimo:`Experiencia previa en desarrollo web.
        Conocimiento de HTML, CSS, JavaScript, PHP y MySQL.
        Comprensión de los principios de diseño web.
        Comprensión de los principios de programación.
        Comprensión de los principios de seguridad web.
        Capacidad para trabajar en equipo.
        Mentalidad de aprendizaje.`,
        reqDeseable:`Experiencia laboral de 2 años en desarrollo web.
        Comprensión del desarrollo front-end utilizando frameworks Angular y/o React.
        Experiencia con sistemas de control de versiones, como Git.
        Conocimiento de metodologías ágiles de desarrollo y mejores prácticas.`,
        plus:`Título en informática, ingeniería o un campo relacionado (o experiencia práctica equivalente).
        Familiaridad con las API RESTful y su integración en aplicaciones web.`
    },
    {
        empresa: "Cenfotec",
        titulo:"UI/UX Designer",
        rangoSalarial:"¢ 750 mil a 1 millón",
        reqMinimo:`Experiencia previa en desarrollo web.
        Conocimiento de HTML, CSS, JavaScript, PHP y MySQL.
        Comprensión de los principios de diseño web.
        Comprensión de los principios de programación.
        Comprensión de los principios de seguridad web.
        Capacidad para trabajar en equipo.
        Mentalidad de aprendizaje.`,
        reqDeseable:`Experiencia laboral de 2 años en desarrollo web.
        Comprensión del desarrollo front-end utilizando frameworks Angular y/o React.
        Experiencia con sistemas de control de versiones, como Git.
        Conocimiento de metodologías ágiles de desarrollo y mejores prácticas.`,
        plus:`Título en informática, ingeniería o un campo relacionado (o experiencia práctica equivalente).
        Familiaridad con las API RESTful y su integración en aplicaciones web.`
    }
];

//Smooth scroll del nav_menu en LandingPage Bitbyte
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Funciones en Registrar candidato
function habilitarCamposExperiencia(){
    event.preventDefault();
    var agregarExperiencia = document.getElementById("agregarExperiencia");
    agregarExperiencia.style.display = "flex";
    setTimeout(function() {
        agregarExperiencia.classList.add("mostrar");
      }, 100);    
}

function habilitarCamposEstudios(){
    event.preventDefault();
    var agregarEstudios = document.getElementById("agregarEstudios");
    agregarEstudios.style.display = "flex";
    setTimeout(function() {
        agregarEstudios.classList.add("mostrar");
      }, 100);    
}

function habilitarCampoDescripcion(){
    event.preventDefault();
    var agregarDescripcion = document.getElementById("agregarDescripcion");
    agregarDescripcion.style.display = "flex";
    setTimeout(function() {
        agregarDescripcion.classList.add("mostrar");
      }, 100);    
}

function experienciaExtra(){
    event.preventDefault();
    var agregarExperiencia = document.getElementById("agregarExperiencia");
    var nuevaExperiencia = `<p id="tituloCargo">¿Qué cargo tuviste/tienes?</p>
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
    
    console.log(agregarExperiencia);
    agregarExperiencia.innerHTML += nuevaExperiencia;        
}

function estudiosExtra(){
    event.preventDefault();
    var agregarEstudios = document.getElementById("agregarEstudios");
    var nuevoEstudio = `<p id="tituloEstudio">Título otorgado</p>
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
    
    console.log(agregarEstudios);
    agregarEstudios.innerHTML += nuevoEstudio;        
}

//subir foto de perfil en registrar candidato
let fotoPerfil = document.getElementById("img-perfil");
let inputFotoPerfil = document.getElementById("inputFotoPerfil");

inputFotoPerfil.onchange = function(){
    fotoPerfil.src = URL.createObjectURL(inputFotoPerfil.files[0]);
}

//Validar campos vacios formulario registrar candidato
function validarFormulario() {
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
            nombre.style.border = "1px solid red";
            errorNombre.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            nombre.style.border = "0";
            errorNombre.innerText = "";
        }

        if (apellidos.value === "") {
            apellidos.style.border = "1px solid red";
            errorApellidos.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            apellidos.style.border = "0";
            errorApellidos.innerText = "";
        }

        var valorGeneroSeleccionado = genero.value;
        if (valorGeneroSeleccionado!="default") {
            errorGenero.innerText = "";
        }else{
            errorGenero.innerText = "*Debe seleccionar una opción";
            camposIncompletos = true;
        }

        if (email.value === "") {
            email.style.border = "1px solid red";
            errorEmail.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else if(regexEmail.test(email.value)==false){
            email.style.border = "1px solid red";
            errorEmail.innerText = "*Ingrese un correo válido";
            camposIncompletos = true;
        }else{
            email.style.border = "0";
            errorEmail.innerText = "";
        }

        if (password.value === "") {
            password.style.border = "1px solid red";
            errorPassword.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            password.style.border = "0";
            errorPassword.innerText = "";
        }

        if (profesion.value === "") {
            profesion.style.border = "1px solid red";
            errorProfesion.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            profesion.style.border = "0";
            errorProfesion.innerText = "";
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
        }
    } catch (error) {
        console.log(error);
    }
}
//Validar campos vacios formulario registrar empresa
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

        //expresión regular para validar formato de correo
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if (nombreEmpresa.value === "") {
            nombreEmpresa.style.border = "1px solid red";
            errorNombreEmpresa.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            nombreEmpresa.style.border = "0";
            errorNombreEmpresa.innerText = "";
        }

        if (emailEmpresa.value === "") {
            emailEmpresa.style.border = "1px solid red";
            errorEmailEmpresa.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else if(regexEmail.test(emailEmpresa.value)==false){
            emailEmpresa.style.border = "1px solid red";
            errorEmailEmpresa.innerText = "*Ingrese un correo válido";
            camposIncompletos = true;
        }else{
            emailEmpresa.style.border = "0";
            errorEmailEmpresa.innerText = "";
        }

        if (passwordEmpresa.value === "") {
            passwordEmpresa.style.border = "1px solid red";
            errorPasswordEmpresa.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            passwordEmpresa.style.border = "0";
            errorPasswordEmpresa.innerText = "";
        }

        // Si se encontraron campos incompletos, detener el envío del formulario
        if (camposIncompletos) {
            // Validar cual es el primer campo incompleto
            var primerCampoIncompleto = null;
            if (nombreEmpresa.value === "") {
            primerCampoIncompleto = nombreEmpresa;
            } else if (emailEmpresa.value === "") {
            primerCampoIncompleto = emailEmpresa;
            } else if (passwordEmpresa==="default") {
            primerCampoIncompleto = passwordEmpresa;
            }

            // Hacer scroll al primer campo incompleto
            if (primerCampoIncompleto) {
            primerCampoIncompleto.scrollIntoView({ behavior: "smooth" });
            }

            return false;
        }
    } catch (error) {
        console.log(error);
    }
}
//Validar campos vacios invitar candidato
function validarFormularioInvitarCandidato() {
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
            nombreCandidato.style.border = "1px solid red";
            errorNombreCandidato.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            nombreCandidato.style.border = "0";
            errorNombreCandidato.innerText = "";
        }

        if (emailCandidato.value === "") {
            emailCandidato.style.border = "1px solid red";
            errorEmailCandidato.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else if(regexEmail.test(emailCandidato.value)==false){
            emailCandidato.style.border = "1px solid red";
            errorEmailCandidato.innerText = "*Ingrese un correo válido";
            camposIncompletos = true;
        }else{
            emailCandidato.style.border = "0";
            errorEmailCandidato.innerText = "";
        }

        var valorRolSeleccionado = rolCandidato.value;
        if (valorRolSeleccionado!="default") {
            errorRol.innerText = "";
        }else{
            errorRol.innerText = "*Debe seleccionar una opción";
            camposIncompletos = true;
        }

        // Si se encontraron campos incompletos, detener el envío del formulario
        if (camposIncompletos) {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}
function validarCampoCorreo(){
    try {
        event.preventDefault();
        var emailCandidato = document.getElementById("emailCandidato");
        var errorEmailCandidato = document.getElementById("errorEmailCandidato");
        //expresión regular para validar formato de correo
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if (emailCandidato.value === "") {
            emailCandidato.style.border = "1px solid red";
            errorEmailCandidato.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else if(regexEmail.test(emailCandidato.value)==false){
            emailCandidato.style.border = "1px solid red";
            errorEmailCandidato.innerText = "*Ingrese un correo válido";
            camposIncompletos = true;
        }else{
            emailCandidato.style.border = "0";
            errorEmailCandidato.innerText = "";
        }

        if (camposIncompletos) {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}
function validarCamposNuevoPassword(){
    try {
        event.preventDefault();
        var codigoVerificacion = document.getElementById("codigoVerificacion");
        var errorCodigoVerificacion = document.getElementById("errorCodigoVerificacion");
        var nuevoPassword = document.getElementById("nuevoPassword");
        var errorNuevoPassword = document.getElementById("errorNuevoPassword");

        if (codigoVerificacion.value === "") {
            codigoVerificacion.style.border = "1px solid red";
            errorCodigoVerificacion.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            codigoVerificacion.style.border = "0";
            errorCodigoVerificacion.innerText = "";
        }

        if (nuevoPassword.value === "") {
            nuevoPassword.style.border = "1px solid red";
            errorNuevoPassword.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            nuevoPassword.style.border = "0";
            errorNuevoPassword.innerText = "";
        }

        if (camposIncompletos) {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

//Validar barra de busqueda vacia en el HomePage
function validarBusquedaHomePage(){
    try {
        var formulario = document.getElementById("barraBusquedaForm");
        var barraBusqueda = document.querySelector("input[name=barra-busqueda]");

        if(barraBusqueda.value === ""){
            formulario.classList.add("borde-rojo");
            setTimeout(function() {
                formulario.classList.remove("borde-rojo");
            }, 2000);  
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
}

/* Validar Inicio de sesion */
function validarLogin(){
    try {
        var correoLogin = document.querySelector("#email");
        var passLogin = document.querySelector("#password");
        var errorLogin = document.querySelector("#errorLogin");
        var camposIncompletos = false;
        var encontrado = false;

        if(correoLogin.value === ""){
            correoLogin.style.border = "1px solid red";
            camposIncompletos = true;
        }else{
            correoLogin.style.border = "0";
            camposIncompletos = false;
        }
        console.log(camposIncompletos);
        if(passLogin.value === ""){
            passLogin.style.border = "1px solid red";
            camposIncompletos = true;
        }else{
            passLogin.style.border = "0";
            camposIncompletos = false;
        }
        console.log(camposIncompletos);

        if(correoLogin.value != "" && passLogin.value != ""){
            for(var usuario of usuarios){
                if(correoLogin.value == usuario.email && passLogin.value == usuario.pass){
                    alert(`Bienvenido ${usuario.nombre}`);
                    encontrado = true;
                    almacenarDatosUsuario(usuario);
                    location.href = "../views/HomePageLogged.html";
                    break;
                }
                if(!encontrado){
                    errorLogin.innerText = "Correo o contraseña incorrectos. Inténtelo nuevamente"
                    setTimeout(function(){
                        errorLogin.innerText = "";
                    },3000);
                }
            }
        }  
    } catch (error) {
        console.log(error);
    }
}

function cargarDatosUsuario() {
    try {
        var logoNav = document.querySelector("#nav_logo-buscoempleo");
        var logoFooter = document.querySelector("#footer_logo-buscoempleo");
        var opcionNav = document.querySelector("#opcionNav");
        var usuarioLoggeado = obtenerDatosUsuario();
    
        if (usuarioLoggeado) {
            var nombreUsuario = `${usuarioLoggeado.nombre} ${usuarioLoggeado.apellidos}`;
            logoNav.href = "../views/HomePageLogged.html";
            logoFooter.href = "../views/HomePageLogged.html";
            opcionNav.innerText = nombreUsuario;
            console.log("Loggeado!!!!");
        }else{
            logoNav.href = "../views/HomePageUnlogged.html";
            logoFooter.href = "../views/HomePageUnlogged.html";
            console.log("No loggeado :(((");
        }
        console.log(usuarioLoggeado);
    } catch (error) {
        console.log(error);
    }
}

function almacenarDatosUsuario(user){
    sessionStorage.setItem("datosUsuarioLoggeado",JSON.stringify(user));
}

function obtenerDatosUsuario(){
    var datosUsuarioJSON = sessionStorage.getItem("datosUsuarioLoggeado");
    if(datosUsuarioJSON){
        return JSON.parse(datosUsuarioJSON);
    }else{
        return null;
    }
}

function cargarDatosPuestos(){
    let num = 2;
    var grid = document.querySelector("#equipo");

    for(var puesto of puestoTrabajo){
        var card = document.createElement("div");
        var tituloPuesto = document.createElement("h3");
        var empresa = document.createElement("p");
        var rangoSalarial = document.createElement("p");
    
        card.classList.add("card");
        tituloPuesto.innerText = puesto.titulo;
        empresa.innerText = puesto.empresa;
        rangoSalarial.innerText = puesto.rangoSalarial;
        card.appendChild(tituloPuesto);
        card.appendChild(empresa);
        card.appendChild(rangoSalarial);
        grid.appendChild(card);
    
        num += 1;
        if(num > 4){
            break;
        }
    }
}