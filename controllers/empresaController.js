const empresasModel = require("../models/empresaModel");
const model = new empresasModel();
const fs = require("fs");
const path = require("path");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const obtenerPasswordTemporal = () => {
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const longitud = 10;

    let password = "";
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        password += caracteres.charAt(indiceAleatorio);
    }
    return password;
};

module.exports = function(appEmpresas){
    appEmpresas.get("/empresas/getEmpresas", async function(req, res){
        try {
            let empresas = await model.getEmpresas();
            res.send(empresas);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de las empresas"});            
        }
    });

    appEmpresas.post("/empresas/addEmpresa", async function(req,res){
        try {
            let fotoPerfilPath = null;
            if(req.files.length > 0){
                const fotoPerfil = req.files[0].filename;
                fotoPerfilPath = path.join(__dirname, "../views/uploads", fotoPerfil);
                fs.renameSync(req.files[0].path, fotoPerfilPath);
            }

            const nuevaEmpresa = {
                nombre: req.body.nombreEmpresa,
                correo: req.body.emailEmpresa,
                password: req.body.passwordEmpresa,
                foto: fotoPerfilPath ? fotoPerfilPath : req.body.fotoPerfil,
                descripcion: req.body.contenidoDescripcion,
                integrante:[
                    {
                        id: 1,
                        email: "",
                        pass: "",
                        rol: "Admin",
                        estado: 0
                    },
                    {
                        id: 2,
                        email: "",
                        pass: "",
                        rol: "Manager",
                        estado: 0
                    },
                    {
                        id: 3,
                        email: "",
                        pass: "",
                        rol: "Recluta",
                        estado: 0
                    },
                ]
            }; 
        
            await model.postEmpresa(nuevaEmpresa);
        
            console.log(nuevaEmpresa);
            res.send({message:"Empresa guardada con éxito"});
            
        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al agregar la empresa"});
        }
    });

    appEmpresas.post("/empresas/updateEmpresas", async function(req,res){
        try {
            let fotoPerfilPath = null;
            if(req.files.length > 0){
                const fotoPerfil = req.files[0].filename;
                fotoPerfilPath = path.join(__dirname, "../views/uploads", fotoPerfil);
                fs.renameSync(req.files[0].path, fotoPerfilPath);
            }
            
            const empresaId = { _id: req.body._id };
            const nuevaEmpresa = {
                nombre: req.body.nombreEmpresa,
                correo: req.body.emailEmpresa,
                foto: fotoPerfilPath ? fotoPerfilPath : req.body.fotoPerfil,
                descripcion: req.body.contenidoDescripcion
            };

            await model.updateEmpresa(nuevaEmpresa, empresaId);
            res.send({message:"Perfil modificado con exito", empresaData: nuevaEmpresa});
            
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al modificar el perfil"});
        }
    });

    appEmpresas.post("/empresas/getEmpresaPorId", async function(req, res){
        try {
            let empresaId = { _id: req.body._id };
            let empresa = await model.getEmpresaPorId(empresaId);
            res.send({message:"Empresa encontrada", candidatoEncontrado: empresa });
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de la empresa"});            
        }
    });

    appEmpresas.post("/empresas/enviarInvitacionEmpresa", async function(req, res){
        try {
            const passwordTemporal = obtenerPasswordTemporal();
            const link = "http://localhost:3000/unlogged/inicioSesion.html";
            const nombre = req.body.nombreCandidato;
            const email = req.body.emailCandidato;
            const empresa = req.body.empresaNombre;
            const empresaId = req.body.empresaId;
            const rolCandidato = req.body.rolCandidato;
            let rol;

            if(rolCandidato === "1"){
                rol = "Manager";
            }else if(rolCandidato === "2"){
                rol = "Recluta";
            }

            const msg = {
                to: email,
                from: {
                    name: "Busco Empleo",
                    email: process.env.FROM_EMAIL,
                },
                subject: "Invitación de empresa - Busco Empleo",
                text: `\nHola, un gusto saludarle ${nombre}.\n
                    La empresa ${empresa} le está invitando a formar parte del equipo dentro de la aplicación BUSCO EMPLEO, con el rol de ${rol}.
                    Si estás interesado/a, te invitamos a hacer click en el siguiente enlace e iniciar sesión: ${link} \n\n
                    Tu contraseña temporal es: ${passwordTemporal}. Una vez dentro de la aplicación puedes crear tu propia contraseña.\n\n
                    Esperamos darte la bienvenida pronto a nuestra comunidad.\n\n
                    ¡Saludos cordiales!\n
                    -El equipo de Busco Empleo`,
                html: `
                    <p>Hola, un gusto saludarle ${nombre}.</p>
                    <p>Esperamos que estés teniendo un buen día. La empresa <strong>${empresa}</strong> le está invitando a formar parte del equipo dentro de la aplicación <strong>BUSCO EMPLEO</strong>, con el rol de <strong>${rol}</strong></p>
                    <p>Si estás interesado/a, te invitamos a hacer click en el siguiente enlace e iniciar sesión: <a href="${link}">buscoempleo.com</a></p>
                    <p>Tu contraseña temporal es: <strong>${passwordTemporal}</strong>. Una vez dentro de la aplicación puedes crear tu propia contraseña.</p>
                    <p>Esperamos darte la bienvenida pronto a nuestra comunidad.</p>
                    <p>¡Saludos cordiales!</p>
                    <p><strong>El equipo de Busco Empleo</strong></p>
                    `,
            };
            await sgMail.send(msg);
            await model.addIntegrante(empresaId, nombre, email, rol, passwordTemporal);

            res.send({message:"Invitación eviada exitosamente"});
        } catch (error) {
            console.error(error);
            res.send({message:"Error al enviar la invitación"});
        }
    });

    appEmpresas.post("/empresas/enviarInvitacionPuesto", async function(req, res){
        try {
            const link = "http://localhost:3000/unlogged/inicioSesion.html";
            const nombre = req.body.nombreCandidato;
            const email = req.body.emailCandidato;
            const reclutaEmail = req.body.reclutaEmail;
            const empresa = req.body.empresaNombre;
            const empresaId = req.body.empresaId;
            const puestoId = req.body.puestos;
            const puestoNombre = req.body.puestoNombre;
            const candidatoSeleccionadoId = req.body.candidatoSeleccionadoId;
            const recluta = req.body.recluta;

            const msg = {
                to: [email, reclutaEmail],
                from: {
                    name: "Busco Empleo",
                    email: process.env.FROM_EMAIL,
                },
                subject: "Nueva Oferta Laboral - Busco Empleo",
                text: `
                    \nHola, un gusto saludarle ${nombre},\n
                    Te queremos invitar a postularte para el puesto de ${puestoNombre} en la empresa ${empresa}. Creemos que tu perfil puede ser una excelente coincidencia para esta posición.\n
                    Si estás interesado/a, puedes aplicar haciendo click en el siguiente enlace: ${link} \n\n
                    Esperamos contar con tu participación.\n\n
                    ¡Saludos cordiales!\n
                    -El equipo de Busco Empleo
                    `,
                html: `
                    <p>Hola, un gusto saludarle ${nombre},</p>
                    <p>Te queremos invitar a postularte para el puesto de <strong>${puestoNombre}</strong> en la empresa <strong>${empresa}</strong>. Creemos que tu perfil puede ser una excelente coincidencia para esta posición.</p>
                    <p>Si estás interesado/a, puedes aplicar haciendo click en el siguiente enlace: <a href="${link}">Postulación</a></p>
                    <p>Esperamos contar con tu participación.</p>
                    <p>¡Saludos cordiales!</p>
                    <p><strong>El equipo de Busco Empleo</strong></p>
                    `,
            };
            await sgMail.send(msg);
            await model.addInvitacionPuesto(empresaId, puestoId, candidatoSeleccionadoId, recluta);

            res.send({message:"Invitación eviada exitosamente"});
        } catch (error) {
            console.error(error);
            res.send({message:"Error al enviar la invitación"});
        }
    });

    appEmpresas.post('/empresa/getInvitacionesPuesto', async (req, res) => {
        try {
            const empresaId = req.body.empresaId;
            let invitaciones = await model.getInvitacionesEmpresa(empresaId);
            res.send(invitaciones);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de las invitaciones"});            
        }
    });

    appEmpresas.post('/empresa/getAplicantes', async (req, res) => {
        try {
            const empresaId = req.body.empresaId;
            let aplicantes = await model.getAplicantes(empresaId);
            res.send(aplicantes);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los aplicantes"});            
        }
    });

    appEmpresas.post("/empresas/borrarAplicacion", async function(req, res){
        try {
            const empresaId = req.body.empresaId;
            const candidatoId = req.body.candidatoId;
            const puestoId = req.body.puestoId;
            let aplicacion = await model.deleteAplication(empresaId, candidatoId, puestoId);

            res.send(aplicacion);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los usuarios"});            
        }
    });

    appEmpresas.post("/empresas/aceptarAplicacion", async function(req, res){
        try {
            const candidatoId = req.body.candidatoId;
            const puestoId = req.body.puestoId;
            let aplicacion = await model.aceptarAplication(candidatoId, puestoId);
            console.log("Aceptada");

            res.send(aplicacion);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los usuarios"});            
        }
    });

    appEmpresas.post("/empresas/revisionAplication", async function(req, res){
        try {
            const candidatoId = req.body.candidatoId;
            const puestoId = req.body.puestoId;
            let aplicacion = await model.revisandoAplication(candidatoId, puestoId);
            console.log("En revision");

            res.send(aplicacion);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los usuarios"});            
        }
    });

    appEmpresas.post("/empresas/rechazarAplication", async function(req, res){
        try {
            const candidatoId = req.body.candidatoId;
            const puestoId = req.body.puestoId;
            let aplicacion = await model.rechazarAplication(candidatoId, puestoId);
            console.log("Rechazada");

            res.send(aplicacion);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los usuarios"});            
        }
    });

    appEmpresas.post("/empresas/eliminarInvitacion", async function(req, res){
        try {
            const empresaId = req.body.empresaId;
            const candidatoId = req.body.candidatoId;
            const puestoId = req.body.puestoId;
            let invitacion = await model.deleteInvitacion(empresaId, candidatoId, puestoId);

            res.send(invitacion);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los usuarios"});            
        }
    });
}

