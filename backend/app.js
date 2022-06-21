// 3. EXPRESS
const express = require("express");
const cors = require("cors");

// J'appel express pour permettre de créer mon application par la suite
const app = express();

// ==============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// 7. DECLARATION ROUTES
const userRoutes = require("./routes/UserRoute");
const productRoutes = require("./routes/Productsroutes");
const validationRoutes = require("./routes/ValidationCommandeRoutes");

app.use("/api/auth", userRoutes); // Routes pour connexion
app.use("/api/products", productRoutes); // Route pour produits
app.use("/api", validationRoutes); // Route pour validation commande

// Et j'exporte mon app
module.exports = app;
