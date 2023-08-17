const puestoModel = require("../models/puestoModel");
const model = new puestoModel();

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

    appPuestos.post("/puestos/addPuestos", async function(req,res){
        try {
            const fechaActual = new Date();
            const fechaFormato = fechaActual.toISOString().split('T')[0];

            const nuevoPuesto = {
                nombre: req.body.tituloOferta,
                empresa_id: req.body.empresaId,
                requisito_minimo: req.body.reqMinimos,
                requisito_deseable: req.body.reqDeseables,
                aptitudes_plus: req.body.plus,
                rango_salarial: `¢ ${req.body.rangoInicialOferta} a ${req.body.rangoMaximoOferta}`,
                ubicacion_oferta: req.body.ubicacionOferta,
                fecha_creacion : fechaFormato,
                disponible : true,
                tipo: req.body.tipo,
                aplicantes: []
            }; 

            await model.postPuesto(nuevoPuesto);

            console.log(nuevoPuesto);
            res.send({message:"Puesto guardado con exito"});

        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al agregar el Puesto"});
        }
    });

    appPuestos.post("/puestos/updatePuestos", async function(req,res){
        try {
            //Utilizar el HTLM de CrearOfertas como base 
            const nuevoPuesto = {
                tituloOferta: req.body.tituloOfertaPuesto,
                descripcionOferta: req.body.descripcionOfertaPuesto,
                rangoInicialOferta: req.body.rangoInicialOfertaPuesto,
                rangoMaximoOferta: req.body.erangoMaximoOfertaPuesto,
                ubicacionOferta: req.body.ubicacionOfertaPuesto
            }; 

            await model.postPuesto(updatePuesto);

            console.log(updatePuesto);
            res.send({message:"Puesto actualizado con exito"});

        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al actualizar el Puesto"});
        }
    });
}