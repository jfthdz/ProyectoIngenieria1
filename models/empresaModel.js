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

    this.addIntegrante = async function(empresaId, nombre, email, rol, passwordTemporal){
        try {
            let connection = await mongodb.connect();
            let id;

            if(rol === "Manager"){
                id = 1;
            }else if(rol === "Recluta"){
                id = 2;
            }

            const nuevoIntegrante = {
                id: id,
                nombre: nombre,
                email: email,
                pass: passwordTemporal,
                rol: rol,
                estado: "Inactivo"
            }
            const nuevaInvitacionEmpresa = {
                empresa_id: empresaId,
                email: email,
                rol: rol,
                estado: "Pendiente"
            }

            await connection.db().collection("Empresas").updateOne({_id: new ObjectId(empresaId)},{$push:{integrante: nuevoIntegrante}});
            await connection.db().collection("InvitacionEmpresa").insertOne(nuevaInvitacionEmpresa);
            await connection.close();

        } catch (error) {
            console.log(error);
        }
    }

    this.addInvitacionPuesto = async function(empresaId, puestoId, candidatoSeleccionadoId, recluta){
        try {
            let connection = await mongodb.connect();
            const fechaActual = new Date();
            const fechaFormato = fechaActual.toISOString().split('T')[0];

            const nuevaInvitacionPuesto = {
                empresa_id: empresaId,
                puesto_id: puestoId,
                candidato_id: candidatoSeleccionadoId,
                fecha_creacion: fechaFormato,
                recluta: recluta,
                estado: "Pendiente"
            }
            await connection.db().collection("InvitacionPuesto").insertOne(nuevaInvitacionPuesto);
            await connection.close();

        } catch (error) {
            console.log(error);
        }
    }

    this.getInvitacionesEmpresa = async function(empresaId){
        try {
            let connection = await mongodb.connect();
            let invitaciones = await connection.db().collection("InvitacionPuesto").find({empresa_id: empresaId}).toArray();
            await connection.close();

            return invitaciones;
        } catch (error) {
            console.log(error);
        }
    }

    this.getAplicantes = async function(empresaId){
        try {
            let connection = await mongodb.connect();
            let aplicantes = await connection.db().collection("PuestoXCandidato").find({empresa_id: empresaId}).toArray();
            await connection.close();

            return aplicantes;
        } catch (error) {
            console.log(error);
        }
    }

    this.deleteAplication = async function(empresaId, candidatoId, puestoId){
        try {
            let connection = await mongodb.connect();
            const aplicacion = await connection.db().collection('PuestoXCandidato').deleteOne({empresa_id: empresaId, candidato_id: candidatoId, puesto_id: puestoId});
            await connection.close();

            console.log(`Se elimino la aplicacion: ${aplicacion.modifiedCount}`);
        } catch (error) {
            console.log(error);
        }
    }

    this.aceptarAplication = async function(candidatoId, puestoId){
        try {
            let connection = await mongodb.connect();
            const aplicacion = await connection.db().collection('PuestoXCandidato').updateOne({candidato_id: candidatoId, puesto_id: puestoId}, {$set:{estado:"Aceptada"}});
            await connection.close();

        } catch (error) {
            console.log(error);
        }
    }

    this.revisandoAplication = async function(candidatoId, puestoId){
        try {
            let connection = await mongodb.connect();
            const aplicacion = await connection.db().collection('PuestoXCandidato').updateOne({candidato_id: candidatoId, puesto_id: puestoId}, {$set:{estado:"En revisión"}});
            await connection.close();
          
        } catch (error) {
            console.log(error);
        }
    }
  
    this.deleteInvitacion = async function(empresaId, candidatoId, puestoId){
        try {
            let connection = await mongodb.connect();
            const invitacion = await connection.db().collection('InvitacionPuesto').deleteOne({empresa_id: empresaId, candidato_id: candidatoId, puesto_id: puestoId});
            await connection.close();

            console.log(`Se elimino la invitacion: ${invitacion.modifiedCount}`);
          } catch (error) {
            console.log(error);
        }
    }
  
   this.rechazarAplication = async function(candidatoId, puestoId){
        try {
            let connection = await mongodb.connect();
            const aplicacion = await connection.db().collection('PuestoXCandidato').updateOne({candidato_id: candidatoId, puesto_id: puestoId}, {$set:{estado:"Rechazada"}});
            await connection.close();
          
        } catch (error) {
            console.log(error);
        }
    }

    this.getCandidatosBySearch = async function(busqueda){
        try {
            let connection = await mongodb.connect();

            const query = {estado: "Activo"};
            if (busqueda) {
                const palabrasClave = busqueda.split(" ").map(palabra => palabra.trim());
                query.$or = [
                    { nombre: { $regex: palabrasClave.join("|"), $options: "i" } },
                    { apellidos: { $regex: palabrasClave.join("|"), $options: "i" } },
                    { profesion: { $regex: palabrasClave.join("|"), $options: "i" } },
                    { email: { $regex: palabrasClave.join("|"), $options: "i" } },
                    {
                        experiencia: {
                            $elemMatch: {
                                $or: [
                                    { cargo: { $regex: palabrasClave.join("|"), $options: "i" } },
                                    { empresa: { $regex: palabrasClave.join("|"), $options: "i" } },
                                    { contenido: { $regex: palabrasClave.join("|"), $options: "i" } }
                                ]
                            }
                        }
                    },
                    {
                        estudio: {
                            $elemMatch: {
                                $or: [
                                    { titulo: { $regex: palabrasClave.join("|"), $options: "i" } },
                                    { institucion: { $regex: palabrasClave.join("|"), $options: "i" } }
                                ]
                            }
                        }
                    }
                ];
            }
            console.log(query);
            let candidatos = await connection.db().collection("Candidatos").find(query).toArray();
            await connection.close();

            return candidatos;
        } catch (error) {
            console.log(error);
        }
    }


    this.getUsuarios = async function(empresaId){
        try {
            let connection = await mongodb.connect();
            let usuarios = await connection.db().collection("Empresas").find({_id: new ObjectId(empresaId)},{projection:{integrante: 1}}).toArray();
            await connection.close();

            return usuarios[0];
        } catch (error) {
            console.log(error);
        }
    }

    
    this.deleteUser = async function(empresaId, userEmail){
        try {
            let connection = await mongodb.connect();
            const usuario = await connection.db().collection('Empresas').updateOne({_id: new ObjectId(empresaId)},{$pull: { integrante: { email: userEmail }}});
            await connection.close();

            console.log(`Se elimino el integrante: ${usuario.modifiedCount}`);
        } catch (error) {
            console.log(error);
        }
    }

    this.borrarCuentaEmpresa = async function(empresaId){
        try {
            let connection = await mongodb.connect();
            const empresa = await connection.db().collection('Empresas').updateOne({_id: new ObjectId(empresaId)},{$set: { estado: "Inactivo"}});
            await connection.close();

            console.log(`Se innactivo la empresa: ${empresa.modifiedCount}`);
        } catch (error) {
            console.log(error);
        }
    }
}
