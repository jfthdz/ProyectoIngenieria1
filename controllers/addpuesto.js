const AddPuestoModel = require("../models/addPuestoModel");
const model = new AddPuestoModel();

module.exports = function(appAddPuesto){
    appAddPuesto.get("/Puesto/getPuesto", async function(req, res){
        try {
            let Puesto = await model.getPuesto();
            res.send(Puesto);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los puesto"});            
        }
    });

    appAddPuesto.post('/jobs', (req, res) => {
        const NuevoPuesto= req.body;
        NuevoPuesto.id = PuestoData.length + 1;
        PuestoData.push(NuevoPuesto);
        res.status(201).json(NuevoPuesto);
    });