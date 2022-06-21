const jwt = require("jsonwebtoken"); // Je vérifie les token

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			return res.status(401).json({
				success: false,
				result: null,
				message: "Utilisateur non authentifié pas de token",
			});
		}

		const decodeToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
		if (!decodeToken) {
			return res.status(401).json({
				success: false,
				result: null,
				message: "Utilisateur non authentifié token correspond pas",
			});
		}
		const userId = decodeToken.userId;

		if (req.body.userId && req.body.userId !== userId) {
			throw "User ID non valable !";
		} else {
			next();
		}
		// Problème si autre erreur
	} catch (error) {
		res.status(401).json({ error: error | "Requête non authentifiéé" });
	}
};
