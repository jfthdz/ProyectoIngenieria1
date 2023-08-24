const candidatosModel = require("../models/candidatoModel");
const model = new candidatosModel();
const fs = require("fs");
const path = require("path");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = function(appCandidatos){
    appCandidatos.get("/candidatos/getCandidatos", async function(req, res){
        try {
            let candidatos = await model.getCandidatos();
            res.send(candidatos);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los candidatos"});            
        }
    });
    
    appCandidatos.post("/candidatos/addCandidatos", async function(req,res){
        try {
            let fotoPerfilPath = null;
            let curriculumPath = null;
            if(req.files.length > 0){
                const fotoPerfil = req.files[0].filename;
                fotoPerfilPath = path.join(__dirname, "../views/uploads", fotoPerfil);
                fs.renameSync(req.files[0].path, fotoPerfilPath);
            }
            if(req.files.length > 1){
                const curriculum = req.files[1].filename;
                curriculumPath = path.join(__dirname, "../views/uploads", curriculum);
                fs.renameSync(req.files[1].path, curriculumPath);
            }

            console.log(req.files);
            console.log("files length: "+req.files.length);
            
            const nuevoCandidato = {
                nombre: req.body.nombreCandidato,
                apellidos: req.body.apellidosCandidato,
                email: req.body.emailCandidato,
                password: req.body.passwordCandidato,
                foto: fotoPerfilPath ? fotoPerfilPath : req.body.fotoPerfil,
                genero: req.body.generoCandidato,
                profesion: req.body.profesionCandidato,
                experiencia: req.body.cargoExperienciaCandidato ? req.body.cargoExperienciaCandidato.map((cargo, index) => {
                    return{
                        cargo,
                        empresa: req.body.empresaExperienciaCandidato[index],
                        contenido: req.body.contenidoExperiencia[index],
                        fecha_inicio: req.body.fechaInicioExperiencia[index],
                        fecha_final: req.body.fechaFinalExperiencia[index],
                    }
                }) : [],
                estudio: req.body.tituloEstudioCandidato ? req.body.tituloEstudioCandidato.map((titulo, index) => {
                    return{
                        titulo,
                        institucion: req.body.institucionEstudioCandidato[index],
                        fecha_inicio: req.body.fechaInicioEstudio[index],
                        fecha_final: req.body.fechaFinalEstudio[index],
                    }
                }) : [],
                curriculum: curriculumPath ? curriculumPath : null
            }; 

            await model.postCandidatos(nuevoCandidato);

            console.log(nuevoCandidato);
            res.send({message:"Candidato guardado con exito"});
            
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al agregar el candidato"});
        }
    });

    appCandidatos.post("/candidatos/updateCandidatos", async function(req,res){
        try {
            let fotoPerfilPath = null;
            let curriculumPath = null;
            if(req.files.length > 0){
                const fotoPerfil = req.files[0].filename;
                fotoPerfilPath = path.join(__dirname, "../views/uploads", fotoPerfil);
                fs.renameSync(req.files[0].path, fotoPerfilPath);
            }
            if(req.files.length > 1){
                const curriculum = req.files[1].filename;
                curriculumPath = path.join(__dirname, "../views/uploads", curriculum);
                fs.renameSync(req.files[1].path, curriculumPath);
            }

            console.log(req.files);
            console.log("files length: "+req.files.length);
            console.log("fotoPerfilPath: "+ fotoPerfilPath);

            const candidatoId = { _id: req.body._id };
            const nuevoCandidato = {
                nombre: req.body.nombreCandidato,
                apellidos: req.body.apellidosCandidato,
                email: req.body.emailCandidato,
                foto: fotoPerfilPath ? fotoPerfilPath : req.body.fotoPerfil,
                genero: req.body.generoCandidato,
                profesion: req.body.profesionCandidato,
                experiencia: req.body.cargoExperienciaCandidato ? req.body.cargoExperienciaCandidato.map((cargo, index) => {
                    return{
                        cargo,
                        empresa: req.body.empresaExperienciaCandidato[index],
                        contenido: req.body.contenidoExperiencia[index],
                        fecha_inicio: req.body.fechaInicioExperiencia[index],
                        fecha_final: req.body.fechaFinalExperiencia[index],
                    }
                }) : [],
                estudio: req.body.tituloEstudioCandidato ? req.body.tituloEstudioCandidato.map((titulo, index) => {
                    return{
                        titulo,
                        institucion: req.body.institucionEstudioCandidato[index],
                        fecha_inicio: req.body.fechaInicioEstudio[index],
                        fecha_final: req.body.fechaFinalEstudio[index],
                    }
                }) : []
            }; 

            await model.updateCandidatos(nuevoCandidato, candidatoId);

            console.log(nuevoCandidato);
            res.send({message:"Perfil modificado con exito", candidatoData: nuevoCandidato});
            
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al modificar el perfil"});
        }
    });

    appCandidatos.post("/candidatos/getCandidatoPorId", async function(req, res){
        try {
            let candidatoId = { _id: req.body._id };
            let candidato = await model.getCandidatoPorId(candidatoId);
            res.send({message:"Candidato encontrado", candidatoEncontrado: candidato });
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los candidatos"});            
        }
    });

    appCandidatos.post('/candidato/getAplicacionesCandidato', async (req, res) => {
        try {
            const userId = req.body.userId;
            let aplicaciones = await model.getAplicaciones(userId);
            res.send(aplicaciones);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de las aplicaciones"});            
        }
    });

    appCandidatos.post("/candidato/borrarAplicacion", async function(req, res){
        try {
            const userId = req.body.userId;
            const puestoId = req.body.puestoId;
            let aplicacion = await model.deleteAplication(userId, puestoId);

            res.send(aplicacion);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al borrar la aplicacion"});            
        }
    });

    appCandidatos.post('/candidato/getInvitacionesCandidato', async (req, res) => {
        try {
            const userId = req.body.userId;
            let invitaciones = await model.getInvitacionesCandidato(userId);
            res.send(invitaciones);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de las invitaciones"});            
        }
    });

    appCandidatos.post("/candidato/aceptarInvitacion", async function(req, res){
        try {
            const userId = req.body.userId;
            const puestoId = req.body.puestoId;
            const userNombre = req.body.userNombre;
            const puestoNombre = req.body.puestoNombre;
            const userEmail = req.body.userEmail;
            const email = "jhernandeza@ucenfotec.ac.cr";

            const msg1 = {
                to: email,
                from: {
                    name: "Busco Empleo",
                    email: process.env.FROM_EMAIL,
                },
                subject: "Actualización de invitación - Busco Empleo",
                text: `\nHola, un gusto saludarle ${userNombre}.\n
                    Esperamos que este teniendo un buen día. Queríamos informarte que has aceptado la invitación del puesto ${puestoNombre} en la aplicación BUSCO EMPLEO.\n\n
                    ¡Felicidades por esta nueva oportunidad, esperamos que tu experiencia en tu nuevo puesto sea excelente!\n\n
                    Saludos cordiales,
                    -El equipo de Busco Empleo`,
                html: `
                    <p>Hola, un gusto saludarle ${userNombre}.</p>
                    <p>Esperamos que este teniendo un buen día. Queríamos informarte que has aceptado la invitación del puesto <strong>${puestoNombre}</strong> en la aplicación <strong>BUSCO EMPLEO</strong>.</p>
                    <p>¡Felicidades por esta nueva oportunidad, esperamos que tu experiencia en tu nuevo puesto sea excelente!</p>
                    <p>Saludos cordiales,</p>
                    <p><strong>El equipo de Busco Empleo</strong></p>
                    `,
            };

            const msg2 = {
                to: "jafethernandez2206@gmail.com",
                from: {
                    name: "Busco Empleo",
                    email: process.env.FROM_EMAIL,
                },
                subject: "Candidato/a aceptó la invitación - Busco Empleo",
                text: `\nHola,\n
                    Queríamos informarte que el candidato ${userNombre} ha aceptado la invitación para el puesto ${puestoNombre} en la aplicación BUSCO EMPLEO.\n\n
                    ¡Esperamos que esta sea una excelente adición para tu equipo!
                    Saludos cordiales,\n
                    -El equipo de Busco Empleo`,
                html: `
                    <p>Hola,</p>
                    <p>Queríamos informarte que el candidato <strong>${userNombre}</strong> ha aceptado la invitación para el puesto <strong>${puestoNombre}</strong> en la aplicación <strong>BUSCO EMPLEO</strong>.</p>
                    <p>¡Esperamos que esta sea una excelente adición para tu equipo!</p>
                    <p>Saludos cordiales,</p>
                    <p><strong>El equipo de Busco Empleo</strong></p>
                    `,
            };
            await sgMail.send(msg1);
            await sgMail.send(msg2);

            let invitacion = await model.aceptarInvitacion(userId, puestoId);
            console.log(invitacion);
            console.log("Aceptada");

            res.send(invitacion);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al aceptar la invitacion"});            
        }
    });

    appCandidatos.post("/candidato/rechazarInvitacion", async function(req, res){
        try {
            const userId = req.body.userId;
            const puestoId = req.body.puestoId;
            const userNombre = req.body.userNombre;
            const puestoNombre = req.body.puestoNombre;
            const userEmail = req.body.userEmail;
            const email = "jhernandeza@ucenfotec.ac.cr";   //"amunoz@ucenfotec.ac.cr";

            const msgCandidato = {
                to: [userEmail],
                from: {
                    name: "Busco Empleo",
                    email: process.env.FROM_EMAIL,
                },
                subject: "Actualización de invitación - Busco Empleo",
                text: `
                    Hola ${userNombre},\n
                    Queríamos informarte que has decidido rechazar la invitación para el puesto ${puestoNombre} en la aplicación BUSCO EMPLEO.
                    Agradecemos tu consideración y te deseamos éxito en tus futuras oportunidades.\n\n
                    Saludos cordiales,
                    - El equipo de Busco Empleo
                `,
                html: `
                    <p>Hola ${userNombre},</p>
                    <p>Queríamos informarte que has decidido rechazar la invitación para el puesto <strong>${puestoNombre}</strong> en la aplicación <strong>BUSCO EMPLEO</strong>.</p>
                    <p>Agradecemos tu consideración y te deseamos éxito en tus futuras oportunidades.</p>
                    <p>Saludos cordiales,</p>
                    <p><strong>El equipo de Busco Empleo</strong></p>
                `,
            };

            const msgRecluta = {
                to: [email],
                from: {
                    name: "Busco Empleo",
                    email: process.env.FROM_EMAIL,
                },
                subject: "Candidato rechazó la invitación",
                text: `
                    Hola,\n
                    Queríamos informarte que el/la candidato/a ${userNombre} ha decidido rechazar la invitación para el puesto ${puestoNombre} en la aplicación BUSCO EMPLEO.
                    Agradecemos tu interés y esperamos que encuentres al candidato adecuado en el futuro.\n\n
                    Saludos cordiales,
                    - El equipo de Busco Empleo
                `,
                html: `
                    <p>Hola,</p>
                    <p>Queríamos informarte que el/la candidato/a ${userNombre} ha decidido rechazar la invitación para el puesto <strong>${puestoNombre}</strong> en la aplicación <strong>BUSCO EMPLEO</strong>.</p>
                    <p>Agradecemos tu interés y esperamos que encuentres al candidato adecuado en el futuro.</p>
                    <p>Saludos cordiales,</p>
                    <p><strong>El equipo de Busco Empleo</strong></p>
                `,
            };

            await sgMail.send(msgCandidato);
            await sgMail.send(msgRecluta);

            let invitacion = await model.rechazarInvitacion(userId, puestoId);
            console.log(invitacion);
            console.log("Rechazada");

            res.send(invitacion);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al rechazar la invitacion"});            
        }
    });

    appCandidatos.post("/candidato/borrarInvitacion", async function(req, res){
        try {
            const userId = req.body.userId;
            const puestoId = req.body.puestoId;
            let invitacion = await model.deleteInvitacion(userId, puestoId);

            res.send(invitacion);
          } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al borrar la invitacion"});            
        }
    });
}