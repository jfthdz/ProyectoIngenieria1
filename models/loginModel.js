const { MongoClient } = require("mongodb");
const { retry } = require("statuses");
const ObjectId = require("mongodb").ObjectId;

const dbconfig = {
    connectionString: "mongodb://localhost:27017/buscoEmpleoDB"
}
const mongodb = new MongoClient(dbconfig.connectionString);

module.exports = function(){

    this.findEmpresaLogin = async function(email, password){
        try {
            let connection = await mongodb.connect();
            let empresa = await connection.db().collection("Empresas").findOne({correo: email, password: password});
            await connection.close();

            return empresa ? empresa : false;
        } catch (error) {
            console.error(error);
        }
    }

    this.findCandidatoLogin = async function(email, password){
        try {
            let connection = await mongodb.connect();
            let candidato = await connection.db().collection("Candidatos").findOne({email: email, password: password});
            await connection.close();

            return candidato ? candidato : false;
        } catch (error) {
            console.error(error);
        }
    }

    this.findEmpresaByEmail = async function(email){
        try {
            let connection = await mongodb.connect();
            let empresa = await connection.db().collection("Empresas").findOne({correo: email});
            await connection.close();

            return empresa ? empresa : false;
        } catch (error) {
            console.error(error);
        }
    }

    this.findCandidatoByEmail = async function(email){
        try {
            let connection = await mongodb.connect();
            let candidato = await connection.db().collection("Candidatos").findOne({email: email});
            await connection.close();

            return candidato ? candidato : false;
        } catch (error) {
            console.error(error);
        }
    }

    this.updatePassword = async function(userId, userNewPassword){
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Candidatos").updateOne({_id: new ObjectId(userId._id)},{$set:{password: userNewPassword}});
            await connection.close();

        } catch (error) {
            console.log(error);
        }
    }

}