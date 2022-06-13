// 1. PARTIE POUR CREATION D'UN SERVEUR
require("dotenv").config({ path: "./config/.env" });
require("./config/mongoDb");

//  Import du module HTTP
const http = require("http");
const app = require("./app");

// Création du serveur
const server = http.createServer(app);

// Port d'écoute
server.listen(process.env.PORT, () => {
	console.log(`Serveur en route sur le ${process.env.PORT}`);
});

// *****************************************************************************
