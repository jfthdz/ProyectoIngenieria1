const empresasModel = require("../models/empresaModel");
const model = new empresasModel();

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
            const nuevaEmpresa = {
                nombre: req.body.nombreEmpresa,
                correo: req.body.emailEmpresa,
                password: req.body.passwordEmpresa,
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
}
