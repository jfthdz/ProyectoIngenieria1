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
                rango_inicial: req.body.rangoInicialOferta,
                rango_final: req.body.rangoMaximoOferta,
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
            const puestoId = req.body.puestoId;
            const puestoModificado = {
                nombre: req.body.tituloOferta,
                requisito_minimo: req.body.reqMinimos,
                requisito_deseable: req.body.reqDeseables,
                aptitudes_plus: req.body.plus,
                rango_inicial: req.body.rangoInicialOferta,
                rango_final: req.body.rangoMaximoOferta,
                ubicacion_oferta: req.body.ubicacionOferta,
                disponible : true,
                tipo: req.body.tipo,
            }; 

            await model.updatePuesto(puestoId, puestoModificado);

            res.send({message:"Puesto actualizado con exito"});

        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al actualizar el Puesto"});
        }
    });

    appPuestos.post("/puestos/deletePuesto", async function(req,res){
        try {
            const puestoId = req.body.puestoId;

            await model.deletePuesto(puestoId);

            res.send({message:"Puesto eliminado con exito"});

        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al eliminar el puesto"});
        }
    });

    appPuestos.post("/puestos/aplicarPuesto", async function(req,res){
        try {
            const fechaActual = new Date();
            const fechaFormato = fechaActual.toISOString().split('T')[0];
            const puestoId = req.body.puestoId;
            const candidatoId = req.body.candidatoId;
            const empresaId = req.body.empresaId;

            const nuevoPuestoXCandidato = {
                puesto_id: puestoId,
                candidato_id: candidatoId,
                empresa_id: empresaId,
                fecha_aplicacion: fechaFormato,
                estado: "Pendiente"

            };

            console.log(nuevoPuestoXCandidato);
            await model.postAplicarPuesto(nuevoPuestoXCandidato);

            res.send({message:"Aplico al puesto con exito"});
        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error en aplicar al puesto"});
        }
    });
}