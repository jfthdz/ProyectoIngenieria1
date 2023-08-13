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
            }
        }else if(response.status === 401){
            errorLogin.innerText = "Correo o contraseña incorrectos. Inténtelo nuevamente"
            errorLogin.style.display = "block";
            setTimeout(function(){
                errorLogin.innerText = "";
                errorLogin.style.display = "none";
            },3000);
        }else{
            console.log("Error al enviar los datos");
        }

    } catch (error) {
        console.log(error);
    }
}