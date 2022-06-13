// 5. CREATION DE MA ROUTE USER
const express = require("express"); //Besoin d'express
const router = express.Router(); // Avec router designera la méthode

const userCtrl = require("../controllers/UserController");

// =================== ROUTES =========================
router.post("/signup", userCtrl.signup); // Route création user
router.post("/login", userCtrl.login); // Route pour connecter user

module.exports = router;
