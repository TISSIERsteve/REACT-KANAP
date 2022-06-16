// 6. CONTROLLER POUR CREATION USER
const bcrypt = require("bcrypt"); // BCRYPT crypter le mot de passe
const jwt = require("jsonwebtoken"); // TOKEN
const User = require("../models/UserModel"); // Importe mon model

// Inscription
exports.signup = (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then(hash => {
			const user = new User({
				name: req.body.nom,
				email: req.body.email,
				password: hash,
			});
			user
				.save()
				.then(() => res.status(201).json({ msg: "Utilisateur crée" }))
				.catch(error => res.status(400).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

// Connexion
exports.login = (req, res) => {
	// Je récupère l'user qui corespond à la base de donnée

	User.findOne({
		email: req.body.email,
	}).then(user => {
		if (!user) {
			return res.status(401).json({ error: "Utilsateur non trouvé !" });
		}

		bcrypt
			.compare(req.body.password, user.password)
			.then(valid => {
				if (!valid) {
					return res.status(401).json({ error: "Mot de passe incorrect !" });
				}

				res.status(200).json({
					identifiant: user._id,
					nom: user.name,
					email: user.email,
					token: jwt.sign({ userId: user._id }, `${process.env.JWT_SECRET}`, {
						expiresIn: "1h",
					}),
				});
			})
			.catch(error =>
				res.status(500).json({ msg: "Erreur sur la connexion au compte" }),
			);
	});
};
