const { isObject } = require("util");
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

    appPuestos.get("/puestos/getPuestosBySearch", async function(req, res){
        try {
            const terminoBusqueda = req.query.search || "";
            let puestos = await model.getPuestosBySearch(terminoBusqueda);

            if(Object.keys(puestos).length === 0){
                res.status(204).json({message:"Hubo un error al obtener los datos de los puestos"});
            }else{
                res.status(200).send(puestos);
            }
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
            res.send({message:"Puesto encontrado"});
            
        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al buscar el puesto"});
        }
    });

    appPuestos.post("/puestos/findPuestosPorEmpresa", async function(req,res){
        try {
            const empresaId = { _id:req.body.empresa_id };
            const puestosPorEmpresa = await model.findPuestosPorEmpresa(empresaId._id);

            res.send(puestosPorEmpresa);
        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al buscar los puestos"});
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

    appPuestos.post("/puestos/aplicarPuesto", async function(req,res){
        try {
            const puestoId = req.body.puestoId;
            const candidatoId = req.body.candidatoId;

            const nuevoPuestoXCandidato = {
                puesto_id: puestoId,
                candidato_id: candidatoId,
                estado: "Enviada"
            };

            await model.postAplicarPuesto(nuevoPuestoXCandidato);

            res.send({message:"Aplico al puesto con exito"});
        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error en aplicar al puesto"});
        }
    });
}