const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const loginModel = require("../models/loginModel");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const obtenerCodigoVerificacion = () => {
    let codigo;
    do {
        codigo = Math.floor(Math.random() * 90000 + 10000);
    } while (codigo < 10000);
    return codigo;
}

module.exports = function(appLogin){
    const model = new loginModel();

    appLogin.post("/api/login", async function(req, res){
        try {
            const email = req.body.email;
            const pass = req.body.password;

            let empresa = await model.findEmpresaLogin(email, pass);
            let candidato = await model.findCandidatoLogin(email, pass);
            let integrante = await model.findIntegranteEmpresaLogin(email, pass);

            if(empresa){
                empresa.userType = "empresa";
                res.json(empresa);
            }else if(candidato){
                candidato.userType = "candidato";
                res.json(candidato);
            }else if(integrante){
                integrante.userType = "integrante";
                console.log(integrante);
                res.json(integrante);
            }else{
                res.status(401).json({message: "Credenciales invalidos"});
            }
        } catch (error) {
            console.error(error);
            res.send({message:"Hubo un error al obtener los datos de la cuenta"});
        }
    });

    appLogin.post("/api/findEmail", async function(req, res){
        try {
            const email = req.body.email;

            let empresa = await model.findEmpresaByEmail(email);
            let candidato = await model.findCandidatoByEmail(email);

            if(empresa){
                res.json(empresa);
            }else if(candidato){
                res.json(candidato);
            }else{
                res.status(401).json({message: "Credenciales invalidos"});
            }
        } catch (error) {
            console.error(error);
            res.send({message:"Hubo un error al obtener los datos de la cuenta"});
        }
    });

    appLogin.post("/api/enviarCodigoVerificacion", async function(req, res){
        try {
            const email = req.body;
            const codigoVerificacion = obtenerCodigoVerificacion();

            const msg = {
                to: email,
                from: {
                    name: "Busco Empleo",
                    email: process.env.FROM_EMAIL,
                },
                subject: "Código de verificación - Busco Empleo",
                text: `Tu código de verificación es: ${codigoVerificacion}`,
            };
            await sgMail.send(msg);

            res.send({message:"Correo de verificación enviado exitosamente", codigo: codigoVerificacion});
        } catch (error) {
            console.error(error);
            res.send({message:"Error al enviar el correo de verificación"});
        }
    });

    appLogin.post("/api/updatePassword", async function(req, res){
        try {
            const userId = req.body.userId;
            const newPassword = req.body.newPassword;

            console.log(userId, newPassword);

            await model.updatePassword(userId, newPassword);
            res.send({message:"Password actualizada correctamente", newPassword: newPassword});
        } catch (error) {
            console.error(error);
            res.send({message:"Hubo un error al obtener los datos de la cuenta"});
        }
    });
}
