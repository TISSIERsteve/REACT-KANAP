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
	User.findOne({
		email: req.body.email,
	})
		.then(user => {
			if (!user) {
				return res.status(401).json({ error: "Utilsateur non trouvé !" });
			}

			bcrypt.compare(req.body.password, user.password).then(valid => {
				if (!valid) {
					return res.status(401).json({ error: "Mot de passe incorrect !" });
				}
				if (valid) {
					const token = jwt.sign(
						{
							expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
							userId: user._id,
						},
						process.env.JWT_SECRET,
					);

					return res.status(200).json({
						token,
						identifiant: user._id,
						nom: user.name,
						email: user.email,
					});
				}
			});
		})
		.catch(error => {
			return res.status(500).json({ msg: error });
		});
};
