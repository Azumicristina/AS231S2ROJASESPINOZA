const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connection = require("./db.js");


const app = express();
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(path.join(__dirname, "public")));


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
})
app.post("/envio", function(req, res){
    const { Carrera, Nombres, Apellidos, DNI, FechaNacimiento, CorreoInstitucional, Contraseña } = req.body;

    const sql = 'INSERT INTO datos (carrera, nombres, apellidos, dni, fechadenacimiento, correoinstitucional, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [Carrera, Nombres, Apellidos, DNI, FechaNacimiento, CorreoInstitucional, Contraseña];
    
    connection.query(sql, values, (err, result) => {
              if (err) {
                        console.error('Error al insertar datos en la base de datos:', err);
                        res.status(500).send('Error interno del servidor');
              } else {
                        console.log('Datos insertados correctamente');
                        res.status(200).send('Registro exitoso');
              }
    });
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
});