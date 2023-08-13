const { MongoClient } = require("mongodb");
const { retry } = require("statuses");
var ObjectId = require("mongodb").ObjectId;

const dbconfig = {
    connectionString: "mongodb://localhost:27017/buscoEmpleoDB"
};
const mongodb = new MongoClient(dbconfig.connectionString);

module.exports = function(){
    this.getCandidatos = async function(){
        try {
            let connection = await mongodb.connect();
            let candidatos = await connection.db().collection("Candidatos").find().toArray();
            await connection.close();

            console.log(candidatos);
            return candidatos;
        } catch (error) {
            console.log(error);
        }
    }

    this.postCandidatos = async function(candidatoData){
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Candidatos").insertOne(candidatoData);
            await connection.close();

            console.log(`Candidato agregado: ${candidatoData}`);
        } catch (error) {
            console.log(error);
        }
    }

    this.updateCandidatos = async function(candidatoData, candidatoId){
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Candidatos").updateOne({_id: candidatoId._id},{$set:candidatoData});
            await connection.close();

            console.log(`Candidato agregado: ${candidatoData}`);
        } catch (error) {
            console.log(error);
        }
    }
}