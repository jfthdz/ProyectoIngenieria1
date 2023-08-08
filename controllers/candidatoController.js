const candidatosModel = require("../models/candidatoModel");
const model = new candidatosModel();

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
            //let nuevoCandidato = req.body;
            const nuevoCandidato = {
                nombre: req.body.nombreCandidato,
                apellidos: req.body.apellidosCandidato,
                email: req.body.emailCandidato,
                pass: req.body.passwordCandidato,
                foto: req.body.fotoPerfil,
                genero: req.body.generoCandidato,
                profesion: req.body.profesionCandidato,
                experiencia: req.body.cargoExperienciaCandidato.map((cargo, index) => {
                    return{
                        cargo,
                        empresa: req.body.empresaExperienciaCandidato[index],
                        contenido: req.body.contenidoExperiencia[index],
                        fecha_inicio: req.body.fechaInicioExperiencia[index],
                        fecha_final: req.body.fechaFinalExperiencia[index],
                    }
                }),
                estudio: req.body.tituloEstudioCandidato.map((titulo, index) => {
                    return{
                        titulo,
                        institucion: req.body.institucionEstudioCandidato[index],
                        fecha_inicio: req.body.fechaInicioEstudio[index],
                        fecha_final: req.body.fechaFinalEstudio[index],
                    }
                })
            }; 

            await model.postCandidatos(nuevoCandidato);

            console.log(nuevoCandidato);
            res.send({message:"Candidato guardado con exito"});
            
        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al agregar el candidato"});
        }
    });
}