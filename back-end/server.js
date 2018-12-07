//express
const express = require('express');
const app = express();
// biblioteca SQLITE3

const cors = require('cors');
//diretorio "estático"
app.use(express.static('public'));
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./web.db');

//PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

//server

app.get('/', (req, res) =>{
    db.all('SELECT name FROM fazer', (err, rows) =>{
        const aux = rows.map(e=>e.name)
        res.send(aux);
    })
})

app.post('/:name', (req, res) =>{
    db.run(
        'INSERT INTO fazer VALUES ($name)',
        {
            $name: req.body.name,
        },
        (err) => {
            if (err) {
                res.send({ message: 'error in app.post(/)' });
            } else {
                res.send({ message: 'successfully run app.post(/)' });
            }
        }
    );
})

app.get('/rm/:name', (req, res) => {
    const name = req.params.name;
    db.all(
        'DELETE FROM fazer WHERE name=$name',
        {
            $name: name
        },
        (err, rows) => {
            console.log(rows);
            if (rows.length > 0) {
                res.send(rows[0]);
            } else {
                res.send({ name: 'Nao encontrado' });
            }
        }
    );
});

app.listen(4000, () => {
    console.log('Server started at http://localhost:4000/');
});