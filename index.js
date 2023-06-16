const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./db/connection');

const Game = require('./models/Game');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection.authenticate().then(() => {
    console.log("Connected in the api_rest_games database");
}).catch((err) => {
    console.log("Error in the database authentication");
});

app.post("/game", (req, res) => {
    let {title, year, price} = req.body;
    if(title === undefined || title === null || title === ""){
        res.sendStatus(400);
    }else{
        Game.create({
            title: title,
            year: year,
            price: price
        }).then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            res.sendStatus(400);
        });
    }
});

app.get("/games", (req, res) => {
    Game.findAll().then((games) => {
        if(games === undefined || games === null){
            res.sendStatus(404);
        }else{
            res.statusCode = 200;
            res.json(games);
        }
    }).catch((err) => {
        res.sendStatus(404);
    });
});

app.get("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        Game.findOne({
            where:{
                id: id
            }
        }).then((game) => {
            if(game === undefined || game === null){
                res.sendStatus(404);
            }else{
                res.statusCode = 200;
                res.json(game);
            }
        }).catch((err) => {
            res.sendStatus(404);
        });
    }
});

app.put("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        let {title, year, price} = req.body;
        if(title === undefined || title === null || title === ""){
            res.sendStatus(400);
        }else{
            Game.update({
                title: title,
                year: year,
                price: price
            },{
                where: {
                    id: id
                }
            }).then(() => {
                res.sendStatus(200);
            }).catch((err) => {
                res.sendStatus(404);
            });
        }
    }
});

app.delete("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);
        Game.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            res.sendStatus(404);
        });
    }
});

app.listen(8080, () => {
    console.log("App running in localhost:8080");
});