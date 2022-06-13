import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
const { REACT_APP_API_URL } = process.env;

const Product = () => {
	const { id } = useParams();
	const [product, setProduct] = useState("");

	useEffect(() => {
		axios
			.get(`${REACT_APP_API_URL}api/products/` + id)
			.then(res => {
				setProduct(res.data);
			})
			.catch(err => alert("Une erreur s'est produite"));
	}, [id]);

	return (
		<div>
			<div className="retour-accueil">
				<Link to="/">Retour accueil</Link>
			</div>
			<ProductItem product={product}></ProductItem>
		</div>
	);
};

export default Product;
