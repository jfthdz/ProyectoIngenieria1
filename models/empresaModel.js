const { MongoClient } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;

const dbconfig = {
    connectionString: "mongodb://localhost:27017/buscoEmpleoDB"
};
const mongodb = new MongoClient(dbconfig.connectionString);

module.exports = function(){
    this.getEmpresas = async function(){
        try {
            let connection = await mongodb.connect();
            let empresas = await connection.db().collection("Empresas").find().toArray();
            await connection.close();

            return empresas;
        } catch (error) {
            console.log(error);
        }
    }

    this.postEmpresa = async function(empresaData){
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Empresas").insertOne(empresaData);
            await connection.close();

        } catch (error) {
            console.log(error);
        }
    }

    this.updateEmpresa = async function(empresaData, empresaId){
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Empresas").updateOne({_id: new ObjectId(empresaId._id)},{$set:empresaData});
            await connection.close();

        } catch (error) {
            console.log(error);
        }
    }

    this.getEmpresaPorId = async function(empresaId){
        try {
            let connection = await mongodb.connect();
            let empresa = await connection.db().collection("Empresas").findOne({_id: new ObjectId(empresaId._id)});
            await connection.close();

            return empresa;
        } catch (error) {
            console.log(error);
        }
    }
}
