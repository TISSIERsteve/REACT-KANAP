const express = require("express"); //Besoin d'express
const router = express.Router(); // Avec router designera la méthode

const token = require("../middleware/AuthMiddleware");
const validationCommandeCtrl = require("../controllers/ValidationCommandeControllers");

// =================== ROUTES =========================
router.post("/validation", token, validationCommandeCtrl.orderItem); // Route validation Commande

module.exports = router;
