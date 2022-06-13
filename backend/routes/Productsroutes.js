// 5. CREATION DE MA ROUTE USER
const express = require("express"); //Besoin d'express
const router = express.Router(); // Avec router designera la méthode

const productCtrl = require("../controllers/ProductsControllers");

// =================== ROUTES =========================
router.get("/", productCtrl.getAllProducts); // Route récupèrer produits
router.get("/:id", productCtrl.getOneProduct); // Route récupèrer id produit
module.exports = router;
