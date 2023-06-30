const bodyParser = require("body-parser");
const express = require("express");
/**
 * crée une instance du server web
 */
const server = express()
/**
 * démarre le server 
 */
server.listen(8000, "localhost", console.log("démarrage du server"))
//je configure le moteur de template
server.set("view engine", "ejs")
/**
 * les midelewares
 */
//je configure le body-parser
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

//log des url demandées
server.use((req, res, next) => {
    console.log(req.path)
    next()
})

//log de l'heure
server.use((req, res, next) => {
    console.log((new Date()).toUTCString())
    next()
})
/**
 * Configure le serveur express pour servir des fichiers statiques à partir du répertoire public à la racine du serveur.
 * Si le fichier demandé n'est pa trouvé, les autres routes configurées seront utilisées
 */
server.use(express.static('public'));
server.get('/imposable', monstatut)
server.post('/imposable', calculimposable)
function monstatut(req, res) {
    let genre = "";
    let age = "";
    let statut = "";
    data = {
        "genre": genre,
        "age": age,
        "statut": statut
    }
    //rendre une vue et l'envoyer au navigateur   
    res.render("statut_vue.ejs", data)
};
function calculimposable(req, res) {
    let genre = req.body.genre;
    let age = req.body.age;
    let statut = "";

    if (genre === "homme" && age >= 20) {
        statut = "imposable";
    } else if (genre === "femme" && age >= 18 && age <= 35) {
        statut = "imposable";
    } else {
        statut = "non imposable";
    };

    let data = {
        "genre": genre,
        "age": age,
        "statut": statut
    };

    res.render("statut_vue.ejs", data);
};
