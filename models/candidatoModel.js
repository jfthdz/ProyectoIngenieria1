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

        } catch (error) {
            console.log(error);
        }
    }

    this.updateCandidatos = async function(candidatoData, candidatoId){
        try {
            let connection = await mongodb.connect();
            await connection.db().collection("Candidatos").updateOne({_id: new ObjectId(candidatoId._id)},{$set:candidatoData});
            await connection.close();

        } catch (error) {
            console.log(error);
        }
    }

    this.getCandidatoPorId = async function(candidatoId){
        try {
            let connection = await mongodb.connect();
            let candidato = await connection.db().collection("Candidatos").findOne({_id: new ObjectId(candidatoId._id)});
            await connection.close();

            return candidato;
        } catch (error) {
            console.log(error);
        }
    }

    this.getAplicaciones = async function(userId){
        try {
            let connection = await mongodb.connect();
            let aplicaciones = await connection.db().collection("PuestoXCandidato").find({candidato_id: userId}).toArray();
            await connection.close();

            return aplicaciones;
        } catch (error) {
            console.log(error);
        }
    }

    this.deleteAplication = async function(userId, puestoId){
        try {
            let connection = await mongodb.connect();
            const aplicacion = await connection.db().collection('PuestoXCandidato').deleteOne({candidato_id: userId, puesto_id: puestoId});
            await connection.close();

            console.log(`Se elimino la aplicacion: ${aplicacion.modifiedCount}`);
        } catch (error) {
            console.log(error);
        }
    }

    this.getInvitacionesCandidato = async function(userId){
        try {
            let connection = await mongodb.connect();
            let invitaciones = await connection.db().collection("InvitacionPuesto").find({candidato_id: userId}).toArray();
            await connection.close();

            return invitaciones;
        } catch (error) {
            console.log(error);
        }
    }

    this.aceptarInvitacion = async function(userId, puestoId){
        try {
            let connection = await mongodb.connect();
            console.log(userId, puestoId);
            const invitaciones = await connection.db().collection('InvitacionPuesto').updateOne({candidato_id: userId, puesto_id: puestoId}, {$set:{estado:"Aceptada"}});
            await connection.close();

        } catch (error) {
            console.log(error);
        }
    }
  
    this.rechazarInvitacion = async function(userId, puestoId){
        try {
            let connection = await mongodb.connect();
            console.log(userId, puestoId);
            const invitaciones = await connection.db().collection('InvitacionPuesto').updateOne({candidato_id: userId, puesto_id: puestoId}, {$set:{estado:"Rechazada"}});
            await connection.close();
          
        } catch (error) {
            console.log(error);
        }
    }

    this.deleteInvitacion = async function(userId, puestoId){
        try {
            let connection = await mongodb.connect();
            const invitaciones = await connection.db().collection('InvitacionPuesto').deleteOne({candidato_id: userId, puesto_id: puestoId});
            await connection.close();

            console.log(`Se elimino la invitacion: ${invitaciones.modifiedCount}`);
          } catch (error) {
            console.log(error);
        }
    }
}