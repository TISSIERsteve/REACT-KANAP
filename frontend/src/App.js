import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

// Components
import Main from "./pages/Main";
import Panier from "./pages/Panier";
import Aside from "./pages/Aside";
import Product from "./pages/Product";
import ImageAgrandi from "./components/ImageAgrandi";
import SeConnecter from "./pages/SeConnecter";
import Sinscrire from "./pages/Sinscrire";
import PasserCommande from "./pages/PasserCommande";
import Paiement from "./pages/Paiement";
import ValidationAchats from "./pages/ValidationAchats";

const App = () => {
	const [isActive, setisActive] = useState("");
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
					<div className="header-links">
						<Link to="/panier">Panier</Link>
						<Link to="/connexion">Se connecter</Link>
					</div>
				</header>

				<aside className={`aside close ${isActive}`}>
					<Aside></Aside>
				</aside>

				<Routes>
					<Route path="/" element={<Main></Main>}></Route>
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
					<Route path="*" element={<Main />} />
				</Routes>

				<footer className="footer">
					<h2>Tous droits réserver</h2>
				</footer>
			</div>
		</Router>
	);
};

export default App;
