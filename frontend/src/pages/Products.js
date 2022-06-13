import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProductsItem from "../components/ProductsItem";
const { REACT_APP_API_URL } = process.env;

const Products = utilisateur => {
	const [products, setProducts] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${REACT_APP_API_URL}api/products/`)
			.then(res => {
				setProducts(res.data);
			})
			.catch(err => {
				if (err.response.data.message === "jwt expired") {
					alert("Votre session est expiré veuillez vous reconnecter");
					localStorage.clear();

					navigate("/connexion", { replace: true });
				}
			});
	}, []);

	return (
		<div className="content">
			<ProductsItem products={products}></ProductsItem>
		</div>
	);
};

export default Products;
