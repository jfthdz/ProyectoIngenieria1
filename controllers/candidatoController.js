const candidatosModel = require("../models/candidatoModel");
const model = new candidatosModel();
const fs = require("fs");
const path = require("path");

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
}