const puestosModel = require("../models/puestosModel");
const model = new puestosModel();

module.exports = function(appPuestos){
    appPuestos.get("/puestos/getPuestos", async function(req, res){
        try {
            let puestos = await model.getPuestos();
            res.send(puestos);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los puestos"});            
        }
    });

    appPuestos.post("/puestos/getPuestosporId", async function(req,res){
        try {
            const puestoId = {_id:req.body._id};
            await model.postPuestosporId(puestoId._id);

            console.log(puestoId);
            res.send({message:"Candidato guardado con exito"});
            
        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al agregar el candidato"});
        }
    });
}