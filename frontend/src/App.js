import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

// Components
// import Main from "./pages/Main";
import Panier from "./pages/Panier";
import Aside from "./pages/Aside";
import Product from "./pages/Product";
import ImageAgrandi from "./components/ImageAgrandi";
import SeConnecter from "./pages/SeConnecter";
import Sinscrire from "./pages/Sinscrire";
import PasserCommande from "./pages/PasserCommande";
import Paiement from "./pages/Paiement";
import ValidationAchats from "./pages/ValidationAchats";
import Products from "./pages/Products";
import HeadersAuth from "./components/HeadersAuth";

const { REACT_APP_API_URL } = process.env;

const App = () => {
	const [products, setProducts] = useState(null);
	const [isActive, setisActive] = useState("");

	useEffect(() => {
		axios
			.get(`${REACT_APP_API_URL}api/products/`)
			.then(res => {
				setProducts(res.data);
			})
			.catch(err => {
				console.log(err);
				if (err.response === "jwt expired") {
					alert("Votre session est expiré veuillez vous reconnecter");
					localStorage.clear();

					<Navigate to="/connexion"></Navigate>;
				}
			});
	}, []);

	const open = () => {
		if (isActive === "open") {
			setisActive("");
		} else {
			setisActive("open");
		}
	};

	return (
		<Router>
			<div className="grid-container">
				<header className="header">
					<div className="brand">
						<button className="button-aside" onClick={open}>
							&#9776;
						</button>

						<Link to="/">KANAP</Link>
					</div>
					<HeadersAuth></HeadersAuth>
				</header>

				<aside className={`aside close ${isActive}`}>
					<Aside></Aside>
				</aside>

				<Routes>
					<Route
						path="/"
						element={<Products products={products}></Products>}
					></Route>
					<Route path="/panier" element={<Panier></Panier>}></Route>
					<Route path="/product/:id" element={<Product></Product>}></Route>
					<Route
						path="/imageAgrandi/:id"
						element={<ImageAgrandi></ImageAgrandi>}
					></Route>
					<Route path="/sinscrire" element={<Sinscrire></Sinscrire>}></Route>
					<Route
						path="/connexion"
						element={<SeConnecter></SeConnecter>}
					></Route>
					<Route
						path="/validationAchats"
						element={<ValidationAchats></ValidationAchats>}
					></Route>
					<Route path="/paiement" element={<Paiement></Paiement>}></Route>
					<Route
						path="/passerCommande"
						element={<PasserCommande></PasserCommande>}
					></Route>
					<Route path="*" element={<Products />} />
				</Routes>

				<footer className="footer">
					<h2>Tous droits réserver</h2>
				</footer>
			</div>
		</Router>
	);
};

export default App;
