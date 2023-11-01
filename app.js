const express = require('express');
const mysql = require('mysql');
const app = express();
const puerto = process.env.PUERTO || 3000;

app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'obras_literarias'
});

conexion.connect(error => {
    if (error) {
        throw error;
    }
});

app.get('/api/obras', (req, res) => {
    conexion.query('SELECT * FROM obras', (error, filas) => {
        if (error) {
            throw error;
        }
        res.json(filas);
    });
});

app.get('/api/obras/:id', (req, res) => {
    conexion.query('SELECT * FROM obras WHERE id=?', [req.params.id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            res.json(fila);
        }
    });
});

app.listen(puerto, () => {
    console.log("Servidor OK en puerto: " + puerto);
});

app.post('/api/obras', (req,res) => {
    let data = { titulo:req.body.titulo, autor:req.body.autor, genero:req.body.genero, idioma:req.body.idioma, isbn:req.body.isbn};
    let sql = "INSERT INTO obras SET ?";
    conexion.query(sql, data, function(error,results) {
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

app.put('/api/obras/:id', (req, res) => {
    let data = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        genero: req.body.genero,
        idioma: req.body.idioma,
        isbn: req.body.isbn
    };
    let sql = "UPDATE obras SET ? WHERE id = ?";
    conexion.query(sql, [data, req.params.id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});

app.delete('/api/obras/:id', (req, res) => {
    let sql = "DELETE FROM obras WHERE id = ?";
    conexion.query(sql, [req.params.id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});