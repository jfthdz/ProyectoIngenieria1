const empresasModel = require("../models/empresaModel");
const model = new empresasModel();
const fs = require("fs");
const path = require("path");

module.exports = function(appEmpresas){
    appEmpresas.get("/empresas/getEmpresas", async function(req, res){
        try {
            let empresas = await model.getEmpresas();
            res.send(empresas);
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de las empresas"});            
        }
    });

    appEmpresas.post("/empresas/addEmpresa", async function(req,res){
        try {
            let fotoPerfilPath = null;
            if(req.files.length > 0){
                const fotoPerfil = req.files[0].filename;
                fotoPerfilPath = path.join(__dirname, "../views/uploads", fotoPerfil);
                fs.renameSync(req.files[0].path, fotoPerfilPath);
            }

            const nuevaEmpresa = {
                nombre: req.body.nombreEmpresa,
                correo: req.body.emailEmpresa,
                password: req.body.passwordEmpresa,
                foto: fotoPerfilPath ? fotoPerfilPath : req.body.fotoPerfil,
                descripcion: req.body.contenidoDescripcion,
                integrante:[
                    {
                        id: 1,
                        email: "",
                        pass: "",
                        rol: "Admin",
                        estado: 0
                    },
                    {
                        id: 2,
                        email: "",
                        pass: "",
                        rol: "Manager",
                        estado: 0
                    },
                    {
                        id: 3,
                        email: "",
                        pass: "",
                        rol: "Recluta",
                        estado: 0
                    },
                ]
            }; 
        
            await model.postEmpresa(nuevaEmpresa);
        
            console.log(nuevaEmpresa);
            res.send({message:"Empresa guardada con éxito"});
            
        } catch (error) {
            console.log(error);
            console.log(req.body);
            res.send({message:"Hubo un error al agregar la empresa"});
        }
    });

    appEmpresas.post("/empresas/updateEmpresas", async function(req,res){
        try {
            let fotoPerfilPath = null;
            if(req.files.length > 0){
                const fotoPerfil = req.files[0].filename;
                fotoPerfilPath = path.join(__dirname, "../views/uploads", fotoPerfil);
                fs.renameSync(req.files[0].path, fotoPerfilPath);
            }
            
            const empresaId = { _id: req.body._id };
            const nuevaEmpresa = {
                nombre: req.body.nombreEmpresa,
                correo: req.body.emailEmpresa,
                foto: fotoPerfilPath ? fotoPerfilPath : req.body.fotoPerfil,
                descripcion: req.body.contenidoDescripcion
            };

            await model.updateEmpresa(nuevaEmpresa, empresaId);
            res.send({message:"Perfil modificado con exito", empresaData: nuevaEmpresa});
            
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al modificar el perfil"});
        }
    });

    appEmpresas.post("/empresas/getEmpresaPorId", async function(req, res){
        try {
            let empresaId = { _id: req.body._id };
            let empresa = await model.getEmpresaPorId(empresaId);
            res.send({message:"Empresa encontrada", candidatoEncontrado: empresa });
        } catch (error) {
            console.log(error);
            res.send({message:"Hubo un error al obtener los datos de la empresa"});            
        }
    });
}
