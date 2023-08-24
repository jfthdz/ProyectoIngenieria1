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
            let empresa = await connection.db().collection("Empresas").findOne({correo: email, password: password, estado: "Activo"});
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

    this.findIntegranteEmpresaLogin = async function(email, password){
        try {
            let connection = await mongodb.connect();
            let hasntLogged = await connection.db().collection("InvitacionEmpresa").findOne({email: email, hasLogged: false});

            if(hasntLogged){
                await connection.db().collection("InvitacionEmpresa").updateOne({email: email, hasLogged: false},{$set:{hasLogged: true, estado: "Aceptada"}});
                await connection.db().collection("Empresas").updateOne({"integrante.email": email, "integrante.pass": password},{$set: {"integrante.$.estado": "Activo"}});
            }
            const integrante = await connection.db().collection("Empresas").findOne({integrante:{$elemMatch:{email: email, pass: password}}, estado: "Activo"});
            await connection.close();

            return integrante ? integrante : false;
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
            console.log(userId, userNewPassword);
            let connection = await mongodb.connect();
            await connection.db().collection("Candidatos").updateOne({_id: new ObjectId(userId)},{$set:{password: userNewPassword}});
            await connection.close();

        } catch (error) {
            console.log(error);
        }
    }

}