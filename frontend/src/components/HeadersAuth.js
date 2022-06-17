import React, { useState } from "react";
import { Link, useNavigate, UseNavigate } from "react-router-dom";
import ModalDeconnect from "../modal/ModalDeconnect";

const HeadersAuth = () => {
	const [utilisateur, setUtilisateur] = useState(localStorage.nom);
	const navigate = useNavigate();

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

	// PARTIE DECONNEXION
	const [dialog, setDialog] = useState({
		isLoading: false,
		message: "",
	});

	// Boîte de dialogue
	const handleDialog = (isLoading, message) => {
		setDialog({
			isLoading,
			message,
		});
	};

	// Function déconnexion
	const handleDeconnect = () => {
		handleDialog(
			true,
			`Mr Mme ${utilisateur} êtes vous sûr de vouloir vous déconnecter ? `,
		);
	};

	const deconnect = choisir => {
		if (choisir) {
			localStorage.clear();
			navigate("/", { replace: true });
			handleDialog("", true);
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
					<button onClick={handleDeconnect}>
						<i className="fas fa-power-off" />
					</button>
				</div>
			) : (
				<h2>
					<Link to="/connexion">Se connecter</Link>
				</h2>
			)}
			{dialog.isLoading && (
				<ModalDeconnect message={dialog.message} onDialog={deconnect} />
			)}
		</div>
	);
};

export default HeadersAuth;
