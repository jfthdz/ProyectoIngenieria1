const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const app=express();
app.use(multer({}).any());

const candidatoController = require("./controllers/candidatoController")(app);

const directorioEstaticos = path.join( __dirname, "views"); 
app.use(express.static( directorioEstaticos ));
console.log("Directorio archivos estáticos: " + directorioEstaticos);

const puertoServidor=3000;

app.use((req, res) => {
    res.status(404).sendFile(path.join( __dirname, "views", "404.html"));
});

const servidor=app.listen(puertoServidor , function( ){ 
console.log("Corriendo en http://localhost:"+puertoServidor);  
});