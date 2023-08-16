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

            console.log(empresas);
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

            console.log(`Empresa agregada: ${empresaData}`);
        } catch (error) {
            console.log(error);
        }
    }

    this.updateEmpresa = async function(id, empresaData) {
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Empresas").updateOne(
                { _id: ObjectId(id) },
                { $set: empresaData }
            );
            await connection.close();
            console.log(`Empresa actualizada: ${empresaData}`);
        } catch (error) {
            console.log(error);
        }
    }

}
