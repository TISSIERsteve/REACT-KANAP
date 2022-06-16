import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "../modal/Dialog";

const HeadersAuth = () => {
	const navigate = useNavigate();
	const [utilisateur, setUtilisateur] = useState(localStorage.nom);

	// Pour le panier localeStorage
	if (localStorage.length === 0) {
		let array = [];
		localStorage.setItem("achats", JSON.stringify(array));
	}

	// Pour le nom localeStorage
	if (localStorage.nom === 0) {
		let utilisateur = [];
		localStorage.setItem("utilisateur", JSON.parse(utilisateur));
		if (localStorage.nom.length) {
			setUtilisateur(utilisateur);
		}
	}

	// Deconnexion
	const [dialog, setDialog] = useState({
		message: "",
		isLoading: false,
		nameProduct: "",
	});

	const handleDialog = (message, isLoading, nameProduct) => {
		setDialog({
			message,
			isLoading,
			nameProduct,
		});
	};

	const handleDelete = () => {
		handleDialog(
			true,
			utilisateur,
			"Êtes vous sûr de vouloir vous déconnecter ?",
		);
	};

	const areUSureDelete = choisir => {
		if (choisir) {
			handleDialog("", false);
			localStorage.clear();
			window.location.reload();
		} else {
			handleDialog("", false);
		}
	};
	return (
		<div className="header">
			<Link to="/panier">Panier</Link>

			{utilisateur && utilisateur.length ? (
				<div className="header-addItem">
					<h3>{utilisateur}</h3>
					<button onClick={handleDelete}>
						<i className="fas fa-power-off" />
					</button>
				</div>
			) : (
				<h2>
					<Link to="/connexion">Se connecter</Link>
				</h2>
			)}
			{dialog.isLoading && (
				<Dialog nameProduct={dialog.nameProduct} onDialog={areUSureDelete} />
			)}
		</div>
	);
};

export default HeadersAuth;
