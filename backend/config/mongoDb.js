//  2. PARTIE POUR SE CONNECTER 0 MONGOOSE
require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Vous êtes connecter avec succés à MongoDB"))
	.catch(err => console.log("Echec de la connexion à MongoDB", err));
