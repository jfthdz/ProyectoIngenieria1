const UpdatePuesto = require("../models/PuestoClienteModel");
const model = new AddPuestoModel();

module.exports = function(appUpdatePuesto){
    appUpdatePuesto.get("/Puesto/GetUpdate", async function(req, res){
        try {
            let Puesto = await model.getPuesto();
            res.send(Puesto);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los Puestos"});            
        }
    });

    appUpdatePuesto.post("/Puesto/addCandidatos", async function(req,res){
        try {
            //agregar informacion de 
            const UpdatePuesto = {
                FotoEmpresa: req.body.FotoEmpresa,
                NombrePuesto: req.body.NombrePuesto,
                DescripcionPuesto: req.body.DescripcionPuesto,
                Responsabilidades: req.body.Responsabilidades,
                Requisitos: req.body.cargoExperienciaCandidato}
            }; 

           

            await model.postPuesto(UpdatePuesto);

            console.log(UpdatePuesto);
            res.send({message:"Puesto actualizado con exito"});
            
        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al actualizar el Puesto"});
        }
    });
}