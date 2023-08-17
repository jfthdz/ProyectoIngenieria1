const { MongoClient } = require("mongodb");
const { retry } = require("statuses");
const ObjectId = require("mongodb").ObjectId;

const dbconfig = {
    connectionString: "mongodb://localhost:27017/buscoEmpleoDB"
}
const mongodb = new MongoClient(dbconfig.connectionString);

module.exports = function(){

    this.findEmpresaByEmail = async function(email, password){
        try {
            let connection = await mongodb.connect();
            let empresa = await connection.db().collection("Empresas").findOne({correo: email, password: password});
            await connection.close();

            return empresa ? empresa : false;
        } catch (error) {
            console.error(error);
        }
    }

    this.findCandidatoByEmail = async function(email, password){
        try {
            let connection = await mongodb.connect();
            let candidato = await connection.db().collection("Candidatos").findOne({email: email, password: password});
            await connection.close();

            return candidato ? candidato : false;
        } catch (error) {
            console.error(error);
        }
    }

}