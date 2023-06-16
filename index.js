const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./db/connection');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection.authenticate().then(() => {
    console.log("Connected in the db api_rest_games");
}).catch((err) => {
    console.log("Erro ao conectar no banco: ", err);
});









app.listen(8080, () => {
    console.log("App running in localhost:8080");
})