const express = require("express"); //Besoin d'express
const router = express.Router(); // Avec router designera la méthode

// const userCtrl = require("../controllers/UserController");
const validationCommandeCtrl = require("../controllers/ValidationCommandeControllers");

// =================== ROUTES =========================
router.post("/validation", validationCommandeCtrl.orderItem);

module.exports = router;
