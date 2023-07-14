var usuarios = [
    {
        id: 1, nombre:"Jafet",apellidos:"Hernández Alfaro",email:"jafethernandez2206@gmail.com",
        pass:"admin",rol:"Desarrollo",foto:"../images/jafet.jpg",
        genero:"1",profesion:"Coordinador Desarrollo",
        expTitulo: "Desarollador de software",expEmpresa: "Softtek",
        expContenido: `Toma de requerimientos con el cliente
        Análisis de requerimientos y diseño de aplicaciones
        Desarrollo Front End y Back End de aplicaciones con C#,Typescript, Javascript, HTML5, SQLServer
        Solución de incidencias
        Mantenimiento de aplicaciones web`, 
        expFechaInicio: "01/01/2021", expFechaFinal: "",
        estTitulo: "Bachillerato en Ingeniería de software", estInstitucion: "Universidad Cenfotec",
        estFechaInicio: "01/01/2021", estFechaFinal: ""
    },
    {
        id: 2, nombre:"Vanessa",apellidos:"Villegas",email:"vvillegast@ucenfotec.ac.cr",
        pass:"123",rol:"Calidad",foto:"../images/vanessa.jpg",
        genero:"2",profesion:"Coordinadora Calidad"
    },
    {
        id: 3, nombre:"Alonso",apellidos:"Aguero",email:"aaguero@ucenfotec.ac.cr",
        pass:"123",rol:"Soporte",foto:"../images/Alonso.jpg",
        genero:"1",profesion:"Coordinador Soporte"
    },
    {
        id: 4, nombre:"Prueba",apellidos:"de usuarios",email:"prueba@gmail.com",pass:"123",
        rol:"Prueba",foto:"../images/fotoPerfilDefault.jpeg",
        genero:"3",profesion:"Test"
    },
    {
        id: 5, nombre:"Jose",apellidos:"Solís",email:"jsolisj@ucenfotec.ac.cr",
        pass:"123",rol:"Soporte",foto:"../images/jose.jpg",
        genero:"1",profesion:"Coordinador Soporte"
    },
    {
        id: 6, nombre:"Fabián",apellidos:"Mora",email:"fmoraq@ucenfotec.ac.cr",
        pass:"123",rol:"Calidad",foto:"../images/fabian.jpg",
        genero:"1",profesion:"Coordinador Calidad"
    },
    {
        id: 7, nombre:"Bryan",apellidos:"Bieta",email:"bbeitam@ucenfotec.ac.cr",
        pass:"123",rol:"General",foto:"../images/fotoPerfilDefault.jpeg",
        genero:"1",profesion:"Coordinador General"
    }
];

var puestoTrabajo = [
    {
        id: 1,
        fecha: "01/06/2023",
        empresa: "Universidad Cenfotec",
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
    },
    {
        id: 2,
        fecha: "01/07/2023",
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
        id: 3,
        fecha: "01/05/2023",
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
        id: 4,
        fecha: "01/04/2023",
        empresa: "Microsoft",
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
    }
];

var empresas = [
    {
        id:1, nombre:"Microsoft", email: "microsoft@outlook.com", pass: "123", foto: "../images/microsoft-logo.jpg",
        descripcion: `Microsoft Corp. es una compañía estadounidense vinculada al desarrollo, fabricación, entrega de licencias y respaldo de un amplio rango de productos de software y servicios para diferentes tipos de dispositivos computacionales.`
    },
    {
        id:2, nombre:"Google", email: "google@gmail.com", pass: "123", foto: "../images/google-logo.jpg",
        descripcion: `Nuestra misión es organizar la información del mundo para que todos puedan acceder a ella y usarla.`
    },
    {
        id:3, nombre:"Tesla", email: "tesla@tesla.com", pass: "123", foto: "../images/tesla-logo.jpg",
        descripcion: `Nuestros vehículos son de los más seguros del mundo. Después de la seguridad, nuestro objetivo es hacer que en cada Tesla se encuentre el mayor disfrute que se pueda tener en un vehículo.`
    },
    {
        id:4, nombre:"Meta", email: "meta@meta.com", pass: "123", foto: "../images/meta-logo.jpg",
        descripcion: `Cuando Facebook se lanzó en 2004, cambió la forma en que las personas se conectan. Apps como Messenger, Instagram y WhatsApp brindaron aún más herramientas a miles de millones de personas en todo el mundo. Ahora, Meta trasciende las pantallas 2D e incursiona en experiencias envolventes, como la realidad aumentada y la realidad virtual, para impulsar la próxima evolución de la tecnología social.`
    },
    {
        id:5, nombre:"Universidad Cenfotec", email: "ucenfotec@ucenfotec.ac.cr", pass: "123", foto: "../images/logo-cenfotec.png",
        descripcion: `La Universidad Cenfotec aspira a ser reconocida como una institución académica de excelencia que impulsa el desarrollo innovador, integral y sostenible de la sociedad mediante la investigación, la extensión y la formación de profesionales en computación e informática.`
    },
    {
        id:6, nombre:"Intel", email: "intel@intel.com", pass: "123", foto: "../images/intel-logo.png",
        descripcion: `Creamos tecnología revolucionaria que mejore la vida de todas las personas sobre la tierra.`
    },
    {
        id:7, nombre:"Apple", email: "apple@apple.com", pass: "123", foto: "../images/logo-apple.png",
        descripcion: `El mundo está en constante cambio. Y las empresas también. El hardware, el software y los servicios de Apple se integran a la perfección para ofrecer a tus equipos de trabajo el poder y la versatilidad que necesitan, dondequiera que los necesiten.`
    },
    {
        id:8, nombre:"Amazon", email: "amazon@amazon.com", pass: "123", foto: "../images/amazon-logo.jpg",
        descripcion: `Descubre nuestra empresa y nuestra tecnología. La tienda más centrada en el cliente del mundo.`
    }
];

var codigoVerificacion;
var candidatoSeleccionado;
var ofertaSeleccionada;

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

function deshabilitarCamposExperiencia(){
    event.preventDefault();
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
    event.preventDefault();
    var agregarEstudios = document.getElementById("agregarEstudios");
    agregarEstudios.style.display = "none";   
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
function subirImagen(){
    let fotoPerfil = document.getElementById("img-perfil");
    let inputFotoPerfil = document.getElementById("inputFotoPerfil");
    
    inputFotoPerfil.onchange = function(){
        fotoPerfil.src = URL.createObjectURL(inputFotoPerfil.files[0]);
    }
    console.log(fotoPerfil);
}

function modificarImagen(){
    let fotoPerfil = document.getElementById("img-perfil-modificar");
    let inputFotoPerfil = document.getElementById("inputFotoPerfil");
    
    inputFotoPerfil.onchange = function(){
        fotoPerfil.src = URL.createObjectURL(inputFotoPerfil.files[0]);
    }
    console.log(fotoPerfil);
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
            nombre.style.border = "1px solid var(--redError)";
            errorNombre.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            nombre.style.border = "0";
            errorNombre.innerText = "";
        }

        if (apellidos.value === "") {
            apellidos.style.border = "1px solid var(--redError)";
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
            email.style.border = "1px solid var(--redError)";
            errorEmail.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else if(regexEmail.test(email.value)==false){
            email.style.border = "1px solid var(--redError)";
            errorEmail.innerText = "*Ingrese un correo válido";
            camposIncompletos = true;
        }else{
            email.style.border = "0";
            errorEmail.innerText = "";
        }

        if (password.value === "") {
            password.style.border = "1px solid var(--redError)";
            errorPassword.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            password.style.border = "0";
            errorPassword.innerText = "";
        }

        if (profesion.value === "") {
            profesion.style.border = "1px solid var(--redError)";
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
        }else{
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
            nombreEmpresa.style.border = "1px solid var(--redError)";
            errorNombreEmpresa.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            nombreEmpresa.style.border = "0";
            errorNombreEmpresa.innerText = "";
        }

        if (emailEmpresa.value === "") {
            emailEmpresa.style.border = "1px solid var(--redError)";
            errorEmailEmpresa.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else if(regexEmail.test(emailEmpresa.value)==false){
            emailEmpresa.style.border = "1px solid var(--redError)";
            errorEmailEmpresa.innerText = "*Ingrese un correo válido";
            camposIncompletos = true;
        }else{
            emailEmpresa.style.border = "0";
            errorEmailEmpresa.innerText = "";
        }

        if (passwordEmpresa.value === "") {
            passwordEmpresa.style.border = "1px solid var(--redError)";
            errorPasswordEmpresa.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            passwordEmpresa.style.border = "0";
            errorPasswordEmpresa.innerText = "";
        }

        // Si se encontraron campos incompletos, detener el envío del formulario
        if (camposIncompletos) {
            return false;
        }else{
            var navBuscoEmpleo = document.querySelector("#nav-buscoempleo");
            var mensajeExito = document.querySelector("#mensajeExito");
            mensajeExito.style.display = "flex";
            setTimeout(function() {
                mensajeExito.classList.add("mostrar");
                navBuscoEmpleo.scrollIntoView({behavior: "smooth"});
            }, 100); 
            limpiarCamposRegistrarEmpresa();
            setTimeout(function() {
                mensajeExito.classList.remove("mostrar");
            }, 3000); 
            setTimeout(function() {
                mensajeExito.style.display = "none";
            }, 3500); 
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
            nombreCandidato.style.border = "1px solid var(--redError)";
            errorNombreCandidato.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            nombreCandidato.style.border = "0";
            errorNombreCandidato.innerText = "";
        }

        if (emailCandidato.value === "") {
            emailCandidato.style.border = "1px solid var(--redError)";
            errorEmailCandidato.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else if(regexEmail.test(emailCandidato.value)==false){
            emailCandidato.style.border = "1px solid var(--redError)";
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
        }else{
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
            eliminarDatosCandidatoSeleccionado();
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
        var camposIncompletos = false;
        //expresión regular para validar formato de correo
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if (emailCandidato.value === "") {
            emailCandidato.style.border = "1px solid var(--redError)";
            errorEmailCandidato.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else if(regexEmail.test(emailCandidato.value)==false){
            emailCandidato.style.border = "1px solid var(--redError)";
            errorEmailCandidato.innerText = "*Ingrese un correo válido";
            camposIncompletos = true;
        }else{
            emailCandidato.style.border = "0";
            errorEmailCandidato.innerText = "";
            camposIncompletos = false;
        }

        if (camposIncompletos) {
            return false;
        }else{
            enviarCodigoVerificacion();
        }
        
    } catch (error) {
        console.log(error);
    }
}

function validarCamposNuevoPassword(){
    try {
        event.preventDefault();
        var campoCodigoVerificacion = document.getElementById("codigoVerificacion");
        var errorCodigoVerificacion = document.getElementById("errorCodigoVerificacion");
        var nuevoPassword = document.getElementById("nuevoPassword");
        var errorNuevoPassword = document.getElementById("errorNuevoPassword");
        var camposIncompletos = false;

        if (campoCodigoVerificacion.value === "") {
            campoCodigoVerificacion.style.border = "1px solid var(--redError)";
            errorCodigoVerificacion.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            campoCodigoVerificacion.style.border = "0";
            errorCodigoVerificacion.innerText = "";
            camposIncompletos = false;
        }

        if (nuevoPassword.value === "") {
            nuevoPassword.style.border = "1px solid var(--redError)";
            errorNuevoPassword.innerText = "*Campo necesario";
            camposIncompletos = true;
        } else {
            nuevoPassword.style.border = "0";
            errorNuevoPassword.innerText = "";
            camposIncompletos = false;
        }

        if (camposIncompletos) {
            return false;
        }else{
            if (campoCodigoVerificacion.value !== codigoVerificacion.toString()) {
                campoCodigoVerificacion.style.border = "1px solid var(--redError)";
                errorCodigoVerificacion.innerText = "*Código de verificación incorrecto";
                camposIncompletos = true;
            } else if(campoCodigoVerificacion.value === codigoVerificacion.toString()) {
                var mensajeExito = document.querySelector("#mensajeExito");
                mensajeExito.style.display = "flex";
                setTimeout(function() {
                    mensajeExito.classList.add("mostrar");
                }, 100); 
                limpiarCamposNuevoPassword();
                setTimeout(function() {
                    mensajeExito.classList.remove("mostrar");
                }, 3000); 
                setTimeout(function() {
                    mensajeExito.style.display = "none";
                }, 3500); 
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function limpiarCamposNuevoPassword(){
    var campoCodigoVerificacion = document.getElementById("codigoVerificacion");
    var nuevoPassword = document.getElementById("nuevoPassword");
    var emailCandidato = document.getElementById("emailCandidato");

    campoCodigoVerificacion.value = "";
    nuevoPassword.value = "";
    emailCandidato.value = "";
}

function limpiarCamposInvitarCandidato(){
    var nombreCandidato = document.getElementById("nombreCandidato");
    var emailCandidato = document.getElementById("emailCandidato");
    var rolCandidato = document.getElementsByName("rolCandidato")[0];

    nombreCandidato.value = "";
    emailCandidato.value = "";
    rolCandidato.value = "default";
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
    
    fotoPerfil.src = "../images/fotoPerfilDefault.jpeg"
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

function limpiarCamposRegistrarEmpresa(){
    var fotoPerfil = document.querySelector("#img-perfil");
    var nombreEmpresa = document.querySelector("#nombreEmpresa");
    var emailEmpresa = document.querySelector("#emailEmpresa");
    var passwordEmpresa = document.querySelector("#passwordEmpresa");
    var agregarDescripcion = document.querySelector("#agregarDescripcion");
    var textAreaAgregarDescripcion = document.querySelector("#agregarDescripcion textarea");
    
    fotoPerfil.src = "../images/fotoPerfilDefault.jpeg"
    nombreEmpresa.value = "";
    emailEmpresa.value = "";
    passwordEmpresa.value = "";
    
    agregarDescripcion.style.display = "none"; 
    textAreaAgregarDescripcion.value = "";
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
        var errorEmail = document.getElementById("errorEmail");
        var camposIncompletos = false;
        var encontrado = false;
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if(correoLogin.value === ""){
            correoLogin.style.border = "1px solid var(--redError)";
            camposIncompletos = true;
        } else if(regexEmail.test(correoLogin.value)==false){
            correoLogin.style.border = "1px solid var(--redError)";
            errorEmail.innerText = "*Ingrese un correo válido";
            setTimeout(function(){
                errorEmail.innerText = "";
            },3000);
            camposIncompletos = true;
        }else{
            correoLogin.style.border = "0";
            camposIncompletos = false;
        }
        
        if(passLogin.value === ""){
            passLogin.style.border = "1px solid var(--redError)";
            camposIncompletos = true;
        }else{
            passLogin.style.border = "0";
            camposIncompletos = false;
        }

        if(camposIncompletos == false && regexEmail.test(correoLogin.value)==true){
            var usuarioEncontrado = usuarios.find(usuario => usuario.email === correoLogin.value);
            var empresaEncontrada = empresas.find(empresa => empresa.email === correoLogin.value);
            if(usuarioEncontrado){
                if(usuarioEncontrado.pass === passLogin.value){
                    alert(`Bienvenido ${usuarioEncontrado.nombre}`);
                    almacenarDatosUsuario(usuarioEncontrado);
                    location.href = "../views/HomePageLoggedCandidato.html";
                }else{
                    errorLogin.innerText = "Correo o contraseña incorrectos. Inténtelo nuevamente"
                    setTimeout(function(){
                    errorLogin.innerText = "";
                    },3000);
                }
            } else if(empresaEncontrada) {
                if(empresaEncontrada.pass === passLogin.value){
                    alert(`Bienvenido ${empresaEncontrada.nombre}`);
                    almacenarDatosEmpresa(empresaEncontrada);
                    location.href = "../views/HomePageLoggedEmpresa.html";
                }else{
                    errorLogin.innerText = "Correo o contraseña incorrectos. Inténtelo nuevamente"
                    setTimeout(function(){
                    errorLogin.innerText = "";
                    },3000);
                }
            }else{
                errorLogin.innerText = "Correo no encontrado. Revisa los datos e intenta de nuevo"
                setTimeout(function(){
                errorLogin.innerText = "";
                },3000);
            }
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
        addFotoPerfilModificarCandidato(rutaFotoPeril);
        campoNombre.value = usuarioLoggeado.nombre;
        campoApellidos.value = usuarioLoggeado.apellidos;
        campoGenero.value = usuarioLoggeado.genero;
        campoEmail.value = usuarioLoggeado.email;
        campoProfesion.value = usuarioLoggeado.profesion;
        console.log(fotoPerfil);
    }
}

function cargarFormularioModificarEmpresa(){
    var campoNombreEmpresa = document.querySelector("#nombreEmpresa");
    var campoCorreoEmpresa = document.querySelector("#emailEmpresa");
    var empresaLoggeado = obtenerDatosEmpresa();
    var rutaFotoPeril;

    if(empresaLoggeado){
        rutaFotoPeril = empresaLoggeado.foto
        addFotoPerfilModificarCandidato(rutaFotoPeril);
        campoNombreEmpresa.value = empresaLoggeado.nombre;
        campoCorreoEmpresa.value = empresaLoggeado.email;
    }
}

function cargarDatosUsuario() {
    try {
        var logoNav = document.querySelector("#nav_logo-buscoempleo");
        var logoFooter = document.querySelector("#footer_logo-buscoempleo");
        var opcionNav = document.querySelector("#opcionNav");
        var subMenu = document.querySelector("#sub-menu");
        var logoutBoton = document.querySelector("#divOpcionesNav > button");
        var imgPerfil = document.querySelector("#img-perfil");
        var usuarioLoggeado = obtenerDatosUsuario();
        var rutaFotoPeril;
    
        if (usuarioLoggeado) {
            var nombreUsuario = ""+usuarioLoggeado.nombre;
            var apellidoUsuario = ""+usuarioLoggeado.apellidos;
            var iniciales = `${nombreUsuario.slice(0,1)}${apellidoUsuario.slice(0,1)}`;
            rutaFotoPeril = usuarioLoggeado.foto;
            logoNav.href = "../views/HomePageLoggedCandidato.html";
            logoFooter.href = "../views/HomePageLoggedCandidato.html";
            opcionNav.href = "../views/modificarCuentaCandidato.html";
            document.querySelector("#barraBusquedaForm").action = "../views/mostrarOfertasTrabajo.html";
            opcionNav.innerText = iniciales;
            addFotoPerfil(rutaFotoPeril);
            console.log("Loggeado!!!!");
        }else{
            logoNav.href = "../views/HomePageUnlogged.html";
            logoFooter.href = "../views/HomePageUnlogged.html";
            opcionNav.href = "../views/inicioSesion.html";
            subMenu.style.display = "none";
            logoutBoton.style.display = "none";
            imgPerfil.style.display = "none";
            console.log("No loggeado :(((");
        }
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

function cargarDatosEmpresa() {
    try {
        var logoNav = document.querySelector("#nav_logo-buscoempleo");
        var logoFooter = document.querySelector("#footer_logo-buscoempleo");
        var opcionNav = document.querySelector("#opcionNav");
        var subMenu = document.querySelector("#sub-menu");
        var logoutBoton = document.querySelector("#divOpcionesNav > button");
        var imgPerfil = document.querySelector("#img-perfil");
        var empresaLoggeada = obtenerDatosEmpresa();
        var rutaFotoPeril;
    
        if (empresaLoggeada) {
            rutaFotoPeril = empresaLoggeada.foto;
            logoNav.href = "../views/HomePageLoggedEmpresa.html";
            logoFooter.href = "../views/HomePageLoggedEmpresa.html";
            opcionNav.href = "../views/modificarCuentaEmpresa.html";
            document.querySelector("#barraBusquedaForm").action = "../views/mostrarCandidatos.html";
            opcionNav.style.display = "none";
            addFotoPerfil(rutaFotoPeril);
            console.log("Loggeado!!!!");
        }else{
            logoNav.href = "../views/HomePageUnlogged.html";
            logoFooter.href = "../views/HomePageUnlogged.html";
            opcionNav.href = "../views/inicioSesion.html";
            subMenu.style.display = "none";
            logoutBoton.style.display = "none";
            imgPerfil.style.display = "none";
            console.log("No loggeado :(((");
        }
    } catch (error) {
        console.log(error);
    }
}

function almacenarDatosEmpresa(empresa){
    sessionStorage.setItem("datosEmpresaLoggeada",JSON.stringify(empresa));
}

function obtenerDatosEmpresa(){
    var datosEmpresaJSON = sessionStorage.getItem("datosEmpresaLoggeada");
    if(datosEmpresaJSON){
        console.log("hay datos");
        return JSON.parse(datosEmpresaJSON);
    }else{
        console.log("no hay");
        return null;
    }
}

function cargarDatosPuestosHomePage(){
    let num = 2;
    var grid = document.querySelector("#equipo");

    for(var puesto of puestoTrabajo){
        var empresaEncontrada = empresas.find(empresa => empresa.nombre == puesto.empresa);
        var divFotoEmpresa = document.createElement("div");
        var fotoEmpresa = document.createElement("img");
        var card = document.createElement("div");
        var tituloPuesto = document.createElement("h3");
        var empresa = document.createElement("p");
        var rangoSalarial = document.createElement("p");

        if(empresaEncontrada){
            fotoEmpresa.src = empresaEncontrada.foto;
        }else{
            fotoEmpresa.src = "../images/fotoPerfilDefault.jpeg";
        }
    
        divFotoEmpresa.classList.add("card_img");
        card.classList.add("card");
        tituloPuesto.innerText = puesto.titulo;
        empresa.innerText = puesto.empresa;
        rangoSalarial.innerText = puesto.rangoSalarial;
        card.appendChild(divFotoEmpresa);
        card.appendChild(tituloPuesto);
        card.appendChild(empresa);
        card.appendChild(rangoSalarial);
        grid.appendChild(card);
        divFotoEmpresa.appendChild(fotoEmpresa);
    
        num += 1;
        if(num > 4){
            break;
        }
    }
}

function cargarDatosCandidatosHomePage(){
    let num = 2;
    var grid = document.querySelector("#equipo");

    for(var candidato of usuarios){
        var divFotoCandidato = document.createElement("div");
        var fotoCandidato = document.createElement("img");
        var card = document.createElement("div");
        var nombreCandidato = document.createElement("h3");
        var profesionCandidato = document.createElement("p");
    
        divFotoCandidato.classList.add("card_img");
        card.classList.add("card");
        fotoCandidato.src = candidato.foto;
        nombreCandidato.innerText = `${candidato.nombre} ${candidato.apellidos}`;
        profesionCandidato.innerText = candidato.profesion;
        card.appendChild(divFotoCandidato);
        card.appendChild(fotoCandidato);
        card.appendChild(nombreCandidato);
        card.appendChild(profesionCandidato);
        divFotoCandidato.appendChild(fotoCandidato);
        grid.appendChild(card);
    
        num += 1;
        if(num > 4){
            break;
        }
    }
}

function cargarMostrarCandidatos(){
    var contenidoOpciones = document.querySelector("#contenido .contenido-opciones");

    for(var candidato of usuarios){
        var opcion = document.createElement("div");
        var opcionInfo = document.createElement("div");
        var opcionImg = document.createElement("img");
        var opcionInfoTexto = document.createElement("div");
        var opcionNombre = document.createElement("h3");
        var opcionProfesion = document.createElement("p");
        var opcionBoton = document.createElement("div");
        var opcionBotonLink = document.createElement("a");
        var botonVer = document.createElement("button");
        var rutaFoto;
        
        opcion.classList.add("opcion");
        opcionInfo.classList.add("opcion-info");
        opcionImg.classList.add("imgFotoPerfilMostrarCandidato");
        opcionInfoTexto.classList.add("opcion-info-texto");
        opcionBoton.classList.add("opcion-boton");
        botonVer.classList.add("boton-contenido");

        opcionImg.src = candidato.foto;
        opcionNombre.innerText = `${candidato.nombre} ${candidato.apellidos}`;
        opcionProfesion.innerText = candidato.profesion;
        opcionBotonLink.href = "../views/candidato.html";
        botonVer.innerText = "Ver";
        botonVer.setAttribute("onclick", `guardarCandidatoSeleccionado(${candidato.id})`);

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

function cargarMostrarOfertas(){
    var contenidoOpciones = document.querySelector("#contenido .contenido-opciones");

    for(var oferta of puestoTrabajo){
        var empresaEncontrada = empresas.find(empresa => empresa.nombre == oferta.empresa);
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
        
        opcion.classList.add("opcion");
        opcionInfo.classList.add("opcion-info");
        opcionImgEmpresa.classList.add("imgFotoPerfilMostrarCandidato");
        opcionInfoTexto.classList.add("opcion-info-texto");
        opcionBoton.classList.add("opcion-boton");
        botonVer.classList.add("boton-contenido");

        if(empresaEncontrada){
            opcionImgEmpresa.src = empresaEncontrada.foto;
        }else{
            opcionImgEmpresa.src = "../images/fotoPerfilDefault.jpeg";
        }

        opcionTituloPuesto.innerText = oferta.titulo;
        opcionEmpresa.innerText = oferta.empresa;
        opcionRangoSalarial.innerText = oferta.rangoSalarial;
        opcionBotonLink.href = "../views/ofertasTrabajo.html";
        botonVer.innerText = "Ver";
        botonVer.setAttribute("onclick", `guardarOfertaSeleccionado(${oferta.id})`);

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

        almacenarDatosCandidatos(oferta);
    }
}

function almacenarDatosCandidatos(candidato){
    sessionStorage.setItem(`candidato${candidato.id}`,JSON.stringify(candidato));
}

function guardarCandidatoSeleccionado(candidatoId){
    candidatoSeleccionado = usuarios.find(usuario => usuario.id === candidatoId);
    sessionStorage.setItem(`candidatoSeleccionado`,JSON.stringify(candidatoSeleccionado));
}

function guardarOfertaSeleccionado(ofertaId){
    ofertaSeleccionada = puestoTrabajo.find(puesto => puesto.id === ofertaId);
    sessionStorage.setItem(`ofertaSeleccionada`,JSON.stringify(ofertaSeleccionada));
}

function obtenerDatosCandidatoSeleccionado(){
    var candidatoSeleccionadoJSON = sessionStorage.getItem("candidatoSeleccionado");
    if(candidatoSeleccionadoJSON){
        return JSON.parse(candidatoSeleccionadoJSON);
    }else{
        return null;
    } 
}

function obtenerDatosOfertaSeleccionada(){
    var ofertaSeleccionadaJSON = sessionStorage.getItem("ofertaSeleccionada");
    if(ofertaSeleccionadaJSON){
        return JSON.parse(ofertaSeleccionadaJSON);
    }else{
        return null;
    } 
}

function cargarDatosCandidato(){
    try {
        var nombreCandidato = document.querySelector("#nombre-candidato");
        var profesionCandidato = document.querySelector("#profesion-candidato");
        
        var tituloExperiencia = document.querySelector("#titulo-experiencia");
        var empresaExperiencia = document.querySelector("#empresa-experiencia");
        var contenidoExperiencia = document.querySelector("#contenido-experiencia");
        var fechaInicioExp = document.querySelector("#fecha-inicio-exp");
        var fechaFinalExp = document.querySelector("#fecha-final-exp");
    
        var tituloEstudios = document.querySelector("#titulo-estudios");
        var institucionEstudios = document.querySelector("#institucion-estudios");
        var fechaInicioEst = document.querySelector("#fecha-inicio-est");
        var fechaFinalEst = document.querySelector("#fecha-final-est");
    
        var candidato = obtenerDatosCandidatoSeleccionado();
        var rutaFotoCandidato = candidato.foto;
    
        if(candidato){
            addFotoCandidato(rutaFotoCandidato);
            nombreCandidato.innerText = `${candidato.nombre} ${candidato.apellidos}`;
            profesionCandidato.innerText = candidato.profesion;
            tituloExperiencia.innerText = candidato.expTitulo;
            empresaExperiencia.innerText += " "+candidato.expEmpresa;
            contenidoExperiencia.innerText = candidato.expContenido;
            fechaInicioExp.innerText = candidato.expFechaInicio;
            fechaFinalExp.innerText = candidato.expFechaFinal;
            tituloEstudios.innerText = candidato.estTitulo;
            institucionEstudios.innerText += " "+candidato.estInstitucion;
            fechaInicioEst.innerText = candidato.estFechaInicio;
            fechaFinalEst.innerText = candidato.estFechaFinal;
            if(candidato.estFechaFinal === ""){
                fechaFinalEst.innerText = "Actualmente";
            }
            if(candidato.expFechaFinal === ""){
                fechaFinalExp.innerText = "Actualmente";
            }
            
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarDatosOferta(){
    try {
        var tituloPuesto = document.querySelector("#titulo-puesto");
        var empresaPuesto = document.querySelector("#empresa-puesto");
        var fechaPuesto = document.querySelector("#fecha-puesto");
        var empresaRangoSalarial = document.querySelector("#empresa-rangoSalarial");
        var imgPerfilEmpresa = document.querySelector("#img-perfil-contenido");
        
        var contenidoReqMinimo = document.querySelector("#contenido-reqminimos");
        var contenidoReqDeseables = document.querySelector("#contenido-reqdeseables");
        var contenidoPlus = document.querySelector("#contenido-plus");
    
        var puesto = obtenerDatosOfertaSeleccionada();
    
        if(puesto){
            var empresaEncontrada = empresas.find(empresa => empresa.nombre == puesto.empresa);
            addFotoEmpresaOfertaTrabajo(empresaEncontrada.foto);
            tituloPuesto.innerText = puesto.titulo;
            empresaPuesto.innerText = puesto.empresa;
            fechaPuesto.innerText += " "+puesto.fecha;
            empresaRangoSalarial.innerText = puesto.rangoSalarial;

            contenidoReqMinimo.innerText = puesto.reqMinimo;
            contenidoReqDeseables.innerText = puesto.reqDeseable;
            contenidoPlus.innerText = puesto.plus;
        }
    } catch (error) {
        console.log(error);
    }
}

function cargarDatosInvitarCandidato(){
    try {
        var nombreCandidato = document.querySelector("#nombreCandidato");
        var emailCandidato = document.querySelector("#emailCandidato");
    
        var candidato = obtenerDatosCandidatoSeleccionado();
    
        if(candidato){
            nombreCandidato.value = `${candidato.nombre} ${candidato.apellidos}`;
            emailCandidato.value = candidato.email;
        }
    } catch (error) {
        console.log(error);
    }
}

function eliminarDatosCandidatoSeleccionado(){
    sessionStorage.removeItem("candidatoSeleccionado");
}

function addFotoPerfil(rutaFoto){
    var fotoPerfilNav = document.querySelector("#divOpcionesNav img");

    fotoPerfilNav.style.display = "block";
    fotoPerfilNav.src = rutaFoto;
}

function addFotoPerfilModificarCandidato(rutaFoto){
    var fotoPerfilModificar = document.querySelector("#img-perfil-modificar");

    fotoPerfilModificar.src = rutaFoto;
}

function addFotoCandidato(rutaFoto){
    var fotoPerfilCandidato = document.querySelector("#img-perfil-candidato");

    fotoPerfilCandidato.src = rutaFoto;
}

function addFotoEmpresaOfertaTrabajo(rutaFoto){
    var fotoPerfilEmpresa = document.querySelector("#img-perfil-contenido");

    fotoPerfilEmpresa.src = rutaFoto;
}

function irModificarCuenta(){
    var usuarioLoggeado = obtenerDatosUsuario();
    var empresaLoggeada = obtenerDatosEmpresa();
    if(usuarioLoggeado){
        location.href = "../views/modificarCuentaCandidato.html";
    }else if(empresaLoggeada){
        location.href = "../views/modificarCuentaEmpresa.html";
    }
}

function cerrarSesion(){
    sessionStorage.removeItem("datosUsuarioLoggeado");
    sessionStorage.removeItem("datosEmpresaLoggeada");
    location.href = "../views/HomePageUnlogged.html";
}

function enviarCodigoVerificacion(){
    codigoVerificacion = obtenerCodigoVerificacion();
    alert(`Código de verificación: ${codigoVerificacion}`);
}

function obtenerCodigoVerificacion(){
    var codigo = Math.floor(Math.random()*90000);
    return codigo;
}

function aplicarPuesto(){
    var usuarioLoggeado = obtenerDatosUsuario();
    var empresaLoggeada = obtenerDatosEmpresa();

    if(usuarioLoggeado || empresaLoggeada){
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