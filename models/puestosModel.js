const { MongoClient } = require("mongodb");
const { retry } = require("statuses");
var ObjectId = require("mongodb").ObjectId;

const dbconfig = {
    connectionString: "mongodb://localhost:27017/buscoEmpleoDB"
};
const mongodb = new MongoClient(dbconfig.connectionString);

module.exports = function(){

    this.getPuestos = async function(){
        try {
            let connection = await mongodb.connect();
            let puestos = await connection.db().collection("Puestos").find({tipo: "publico"}).toArray();
            await connection.close();

            return puestos;
        } catch (error) {
            console.log(error);
        }
    }

    this.getPuestosBySearch = async function(busqueda){
        try {
            let connection = await mongodb.connect();

            const query = {tipo: "publico"};
            if(busqueda){
                const palabrasClave = busqueda.split(" ").map(palabra => palabra.trim());
                const empresas = await connection.db().collection("Empresas").find({
                    nombre: {$regex: palabrasClave.join("|"), $options: "i"}
                }).toArray();
                const empresaIds = empresas.map(empresa => empresa._id.toString());

                query.$or = [
                    {nombre: {$regex: palabrasClave.join("|"), $options:"i"}},
                    {empresa_id: {$in: empresaIds}},
                    {requisito_minimo: {$regex: palabrasClave.join("|"), $options:"i"}},
                    {requisito_deseable: {$regex: palabrasClave.join("|"), $options:"i"}},
                    {aptitudes_plus: {$regex: palabrasClave.join("|"), $options:"i"}},
                    {ubicacion_oferta: {$regex: palabrasClave.join("|"), $options:"i"}}
                ];
            }
            console.log(query);
            let puestos = await connection.db().collection("Puestos").find(query).toArray();
            await connection.close();

            return puestos;
        } catch (error) {
            console.log(error);
        }
    }

    this.postPuesto = async function(puestoData){
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Puestos").insertOne(puestoData);
            await connection.close();

            console.log(`Puesto agregado: ${puestoData}`);
        } catch (error) {
            console.log(error);
        }
    }

    this.postPuestosporId = async function(puestoId){
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Puestos").findOne({_id: new ObjectId(puestoId)});
            await connection.close();

            console.log(`Puesto agregado: ${puestoId}`);
        } catch (error) {
            console.log(error);
        }
    }

    this.findPuestosPorEmpresa = async function(empresaId){
        try {
            let connection = await mongodb.connect();
            let puestos = await connection.db().collection("Puestos").find({empresa_id: empresaId}).toArray();
            await connection.close();

            return puestos;
        } catch (error) {
            console.log(error);
        }
    }

    //Cambiar el Update para los Puestos
    this.updatePuesto = async function(puestoData){
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Puestos").insertOne(puestoData);
            await connection.close();

            console.log(`Puesto agregado: ${puestoData}`);
        } catch (error) {
            console.log(error);
        }
    }

    this.postAplicarPuesto = async function(nuevoPuestoXCandidato){
        try {
            let connection = await mongodb.connect();
            let invitado = await connection.db().collection("InvitacionPuesto").findOne({candidato_id: nuevoPuestoXCandidato.candidato_id, puesto_id: nuevoPuestoXCandidato.puesto_id});

            if(invitado){
                await connection.db().collection("InvitacionPuesto").updateOne({candidato_id: nuevoPuestoXCandidato.candidato_id, puesto_id: nuevoPuestoXCandidato.puesto_id},{$set:{estado:"Aceptada"}});
            }else{
                await connection.db().collection("PuestoXCandidato").insertOne(nuevoPuestoXCandidato);
            }
            await connection.close();

            console.log(`Candidato agregado: ${nuevoPuestoXCandidato}`);
        } catch (error) {
            console.log(error);
        }
    }
}