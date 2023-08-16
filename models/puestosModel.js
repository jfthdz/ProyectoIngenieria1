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
            let puestos = await connection.db().collection("Puestos").find().toArray();
            await connection.close();

            console.log(puestos);
            return puestos;
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
}