let codigoVerificacion;

/* Validar Inicio de sesion */
function validarCamposLogin(){
    try {
        event.preventDefault();
        var correoLogin = document.querySelector("#email");
        var passLogin = document.querySelector("#password");
        var errorLogin = document.querySelector("#errorLogin");
        var errorEmail = document.getElementById("errorEmail");
        var camposIncompletos = false;
        var encontrado = false;
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        if(correoLogin.value === ""){
            correoLogin.style.border = "1px solid var(--redError)";
            errorEmail.innerText = "*Campo necesario";
            errorEmail.style.display = "block";
            camposIncompletos = true;
        } else if(regexEmail.test(correoLogin.value)==false){
            correoLogin.style.border = "1px solid var(--redError)";
            errorEmail.innerText = "*Ingrese un correo válido";
            errorEmail.style.display = "block";
            setTimeout(function(){
                errorEmail.innerText = "";
                errorEmail.style.display = "none";
            },3000);
            camposIncompletos = true;
        }else{
            correoLogin.style.border = "0";
            errorEmail.innerText = "";
            errorEmail.style.display = "none";
            camposIncompletos = false;
        }
        
        if(passLogin.value === ""){
            passLogin.style.border = "1px solid var(--redError)";
            errorLogin.innerText = "*Campo necesario";
            errorLogin.style.display = "block";
            camposIncompletos = true;
        }else{
            passLogin.style.border = "0";
            errorLogin.innerText = "";
            errorLogin.style.display = "none";
            camposIncompletos = false;
        }

        if(camposIncompletos == false && regexEmail.test(correoLogin.value)==true){
            buscarUsuario();
        }  
    } catch (error) {
        console.log(error);
    }
}

async function buscarUsuario(){
    event.preventDefault();
    const loginData = new FormData(document.querySelector("#form-login"));

    const loginObject = {};
    loginData.forEach((value, key) =>{
        loginObject[key]= value;
    });
    console.log(loginObject);

    const url = "/api/login";
    try {
        const response = await fetch(url,{
            body: loginData,
            method: "POST"
        });

        if(response.ok){
            const userObject = await response.json();

            if(userObject.userType === "empresa"){
                sessionStorage.setItem("datosEmpresaLoggeada",JSON.stringify(userObject));
                location.href = "/empresa/HomePageLoggedEmpresa.html";
            }else if(userObject.userType === "candidato"){
                sessionStorage.setItem("datosUsuarioLoggeado",JSON.stringify(userObject));
                location.href = "/candidato/HomePageLoggedCandidato.html";
            }else if(userObject.userType === "integrante"){
                const integranteLoggeando = userObject.integrante.find(integrante => integrante.email === loginObject.email);

                if(integranteLoggeando){
                    userObject.integrante = [integranteLoggeando];
                    sessionStorage.setItem("datosIntegranteLoggeado",JSON.stringify(userObject));
                    location.href = "/empresa/HomePageLoggedEmpresa.html";
                } 
            }
        }else if(response.status === 401){
            errorLogin.innerText = "Correo o contraseña incorrectos. Inténtelo nuevamente"
            errorLogin.style.display = "block";
        }else{
            console.log("Error al enviar los datos");
        }

    } catch (error) {
        console.log(error);
    }
}

function validarCampoCorreo(){
    try {
        event.preventDefault();
        var email = document.getElementById("email");
        var errorEmail = document.getElementById("errorEmail");
        var camposIncompletos = false;
        //expresión regular para validar formato de correo
        var regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

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
            camposIncompletos = false;
        }

        if (camposIncompletos) {
            return false;
        }else{
            buscarUsuarioPorCorreo();
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function buscarUsuarioPorCorreo(){
    event.preventDefault();
    const correo = new FormData(document.querySelector("#form-recuperacion-correo"));
    const url = "/api/findEmail";

    try {
        const response = await fetch(url,{
            body: correo,
            method: "POST"
        });

        if(response.ok){
            const datos = await response.json();
            const userId = {_id: datos._id};
            sessionStorage.setItem("userTempData", JSON.stringify(userId));
            enviarCodigoVerificacion();
        }else if(response.status === 401){
            email.style.border = "1px solid var(--redError)";
            errorEmail.innerText = "*Correo no encontrado. Por favor inténtelo nuevamente.";
            errorEmail.style.display = "block";
        }else{
            console.log("Error al enviar los datos");
        }

    } catch (error) {
        console.log(error);
    }
}

async function enviarCodigoVerificacion(){
    const correo = new FormData(document.querySelector("#form-recuperacion-correo"));
    const mensajeCorreoEnviado = document.querySelector("#mensajeCorreoEnviado");
    const url = "/api/enviarCodigoVerificacion";

    try {
        const response = await fetch(url,{
            body: correo,
            method: "POST"
        });

        if(response.ok){
            const datos = await response.json();
            codigoVerificacion = datos.codigo;

            mensajeCorreoEnviado.style.display = "flex";
            setTimeout(function() {
                mensajeCorreoEnviado.classList.add("mostrar");
            }, 100); 
        }else{
            console.log("Error al enviar los datos");
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
            errorCodigoVerificacion.style.display = "block";
            camposIncompletos = true;
        } else {
            campoCodigoVerificacion.style.border = "0";
            errorCodigoVerificacion.innerText = "";
            errorCodigoVerificacion.style.display = "none";
            camposIncompletos = false;
        }

        if (nuevoPassword.value === "") {
            nuevoPassword.style.border = "1px solid var(--redError)";
            errorNuevoPassword.innerText = "*Campo necesario";
            errorNuevoPassword.style.display = "block";
            camposIncompletos = true;
        } else {
            nuevoPassword.style.border = "0";
            errorNuevoPassword.innerText = "";
            errorNuevoPassword.style.display = "none";
            camposIncompletos = false;
        }

        if (camposIncompletos) {
            return false;
        }else{
            if (campoCodigoVerificacion.value !== codigoVerificacion.toString()) {
                campoCodigoVerificacion.style.border = "1px solid var(--redError)";
                errorCodigoVerificacion.innerText = "*Código de verificación incorrecto";
                errorCodigoVerificacion.style.display = "block";
                camposIncompletos = true;
            } else if(campoCodigoVerificacion.value === codigoVerificacion.toString()) {
                updatePassword();
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function limpiarCamposNuevoPassword(){
    var campoCodigoVerificacion = document.getElementById("codigoVerificacion");
    var nuevoPassword = document.getElementById("nuevoPassword");
    var email = document.getElementById("email");

    campoCodigoVerificacion.value = "";
    nuevoPassword.value = "";
    email.value = "";
}

async function updatePassword(){
    const data = new FormData();
    const nuevoPassword = document.querySelector("#nuevoPassword").value;
    const dataActual = sessionStorage.getItem("userTempData");
    const dataObjeto = JSON.parse(dataActual);
    dataObjeto.newPassword = nuevoPassword;

    data.append("userId", dataObjeto._id);
    data.append("newPassword", dataObjeto.newPassword);
    
    const url = "/api/updatePassword";

    try {
        const response = await fetch(url,{
            body: data,
            method: "POST"
        });

        if(response.ok){
            const mensajeCorreoEnviado = document.querySelector("#mensajeCorreoEnviado");
            mensajeCorreoEnviado.classList.remove("mostrar");
            mensajeCorreoEnviado.style.display = "none";

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
        }else{
            console.log("Error al enviar los datos");
        }

    } catch (error) {
        console.log(error);
    }
}