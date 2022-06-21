const Item = require("../models/ValidationCommandeModel");

exports.orderItem = (req, res) => {
	const item = new Item({
		article: {
			identifiantProduit: req.body.identifiantProduit,
			nameProduit: req.body.nameProduit,
			quantiter: req.body.quantiter,
			couleur: req.body.couleur,
		},

		paiementMethode: {
			paiementMode: req.body.paiementMode,
		},

		transporteur: {
			livreur: req.body.livraisonMode,
		},

		expeditionAdresse: {
			nom: req.body.nom,

			adresse: req.body.adresse,
			ville: req.body.ville,
			codePostale: req.body.codePostale,
			pays: req.body.pays,
		},
	});
	item
		.save()
		.then(() => {
			return res.status(200).json({ message: "validation accepter" });
		})
		.catch(error => console.log(error));
};
