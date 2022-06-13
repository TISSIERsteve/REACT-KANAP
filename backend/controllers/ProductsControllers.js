const data = require("../data/data");

exports.getAllProducts = async (req, res) => {
	const products = await data.products;
	res.json(products);

	// OU
	// res.send(data.products);
};
exports.getOneProduct = async (req, res) => {
	// ceci on peut le mettre aussi côter frontend pour récupérer sur produit avec Id
	const product = await data.products.filter(x => x._id === req.params.id);
	res.json(product);

	// OU
	// res.send(data.products);
};
