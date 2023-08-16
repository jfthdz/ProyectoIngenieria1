const UpdatePuesto = require("../models/UpdatePuestooModel");
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

    appUpdatePuesto.put('/Puesto:id', (req, res) => {
        const jobId = parseInt(req.params.id);
        const UpdatedPuesto = req.body;
        const index = PuestoData.findIndex(job => job.id === jobId);
        if (index !== -1) {
            PuestoDat[index] = { ...PuestoData[index], ...UpdatedPuesto };
            res.json(PuestoData[index]);
        } else {
            res.status(404).json({ message: 'Puesto de trabajo no encontrado' });
        }
    });