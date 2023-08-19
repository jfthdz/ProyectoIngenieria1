const { MongoClient } = require("mongodb");
const { retry } = require("statuses");
var ObjectId = require("mongodb").ObjectId;

const dbconfig = {
    connectionString: "mongodb://localhost:27017/buscoEmpleoDB"
};
const mongodb = new MongoClient(dbconfig.connectionString);

module.exports = function(){
    this.postAplicarPuesto = async function(candidatoData){
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Candidatos").insertOne(candidatoData);
            await connection.close();

            console.log(`Candidato agregado: ${candidatoData}`);
        } catch (error) {
            console.log(error);
        }
    }
}