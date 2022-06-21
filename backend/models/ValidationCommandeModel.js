const mongoose = require("mongoose");

const ValidationCommandeSchema = new mongoose.Schema({
	article: {
		identifiantProduit: { type: Number, required: true },
		nameProduit: { type: String, required: true },
		quantiter: { type: Number, required: true },
		couleur: { type: String, required: true },
	},

	paiementMethode: {
		paiementMode: { type: String, required: true },
	},

	transporteur: {
		livreur: { type: String, required: true },
	},

	expeditionAdresse: {
		nom: { type: String, required: true },

		adresse: { type: String, required: true },
		ville: { type: String, required: true },
		codePostale: { type: String, required: true },
		pays: { type: String, required: true },
	},
});

module.exports = mongoose.model("Item", ValidationCommandeSchema);
