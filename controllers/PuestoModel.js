const PuestoModel = require("../models/PuestoModelModel");
const model = new  PuestoModelModel();

module.exports = function(appPuestoModel){
    appPuestoModel.get("/Puesto/GetUpdate", async function(req, res){
        try {
            let Puesto = await model.getPuesto();
            res.send(Puesto);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de los Puestos"});            
        }
    });

    
    

    let PuestoData = [
        { id: 1, Titulo 'Desarrollador master', DescripcionPuesto: '...', Requisitos: '...' },
        { id: 2, Titulo: 'Diseñador UX/UI con 50 a;os de experienciaa', DescripcionPuesto: '...', Requisitos: '...' },
    ];