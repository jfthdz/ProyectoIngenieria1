const candidatosModel = require("../models/candidatoModel");
const model = new candidatosModel();

module.exports = function(appCandidatos){
    appCandidatos.post("/puestos/aplicarPuesto", async function(req,res){
        try {
            const candidato = req.body.candidatoLoggeado;
            await model.postAplicarPuesto(candidato);

            console.log(nuevoCandidato);
            res.send({message:"Candidato guardado con exito"});
        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al agregar el candidato"});
        }
    });
}