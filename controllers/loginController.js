const loginModel = require("../models/loginModel");
const model = new loginModel();

module.exports = function(appLogin){
    appLogin.post("/api/login", async function(req, res){
        try {
            const email = req.body.email;
            const pass = req.body.password;

            let empresa = await model.findEmpresaByEmail(email, pass);
            let candidato = await model.findCandidatoByEmail(email, pass);

            if(empresa){
                empresa.userType = "empresa";
                res.json(empresa);
            }else if(candidato){
                candidato.userType = "candidato";
                res.json(candidato);
            }else{
                res.status(401).json({message: "Credenciales invalidos"});
            }
        } catch (error) {
            console.error(error);
            res.send({message:"Hubo un error al obtener los datos de la cuenta"});
        }
    });
}
