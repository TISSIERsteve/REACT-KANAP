import React, { useEffect, useState } from "react";
// import data from "../data";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Panier = () => {
	const PanierResult = JSON.parse(localStorage.achats);
	const changeQuantiter = document.querySelectorAll(".itemQuantity");
	// const { id } = useParams;
	const [quantiter, setquantiterArticle] = useState("");
	const [achats, setAchats] = useState("");
	const navigate = useNavigate();

	// MODIFIER QUANTITER
	useEffect(() => {
		let resultQuantiter = 0;
		PanierResult.filter(x => {
			resultQuantiter += parseInt(x.quantiter);
			setquantiterArticle(resultQuantiter);
		});

		let totalPrix = 0;
		PanierResult.filter(x => {
			totalPrix += parseInt(x.prix * x.quantiter);
			setAchats(totalPrix);
		});
	}, [PanierResult]);

	// MODIFICCATION QUANTITER
	const ecouteChangementQuantiter = e => {
		for (const item of changeQuantiter) {
			let resultSupplement = 0;
			resultSupplement += parseInt(item.value);
			setquantiterArticle(resultSupplement);

			const productId = item.closest("#liste").dataset.id;
			const productColor = item.closest("#liste").dataset.color;

			const filtre = PanierResult.filter(
				x => x.id === productId && x.couleur === productColor,
			);

			if (filtre && filtre.length) {
				filtre[0].quantiter = resultSupplement;
				setquantiterArticle(resultSupplement);
			}

			window.localStorage.setItem("achats", JSON.stringify(PanierResult));
			window.location.reload();
		}
	};
	// SUPPRIMER
	const handleDelete = (productId, productColor) => {
		PanierResult.splice(
			PanierResult.findIndex(
				x => x.id === productId && x.couleur === productColor,
			),
			1,
		);
		window.localStorage.setItem("achats", JSON.stringify(PanierResult));
		window.location.reload();
	};

	// Procéder au paiement
	const checkoutHandler = () => {
		if (achats.length <= 0) {
			alert("Votre panier est vide");
			navigate("/", { replace: true });
		} else if (localStorage.bearer || localStorage.expedition) {
			if (localStorage.bearer) {
				navigate("/validationAchats", { replace: true });
			}
			if (localStorage.expedition && localStorage.bearer) {
				navigate("/paiement", { replace: true });
			}
			if (localStorage.ModeLivraison) {
				navigate("/passerCommande", { replace: true });
			}
			if (localStorage.ModePaiement) {
				navigate("/passerCommande", { replace: true });
			}
		} else {
			alert("Vous devez être connecter pour valider votre commande");
			navigate("/connexion", { replace: true });
		}
	};

	return (
		<div className="cart">
			<div className="cart-list">
				<div className="retour-accueil">
					<Link to="/">Retour accueil</Link>
				</div>
				<ul className="cart-list-container">
					<li className="cart-list-entete">
						<h3>Panier</h3>
						<div>Prix</div>
					</li>
					{achats.length < 0 ? (
						<Loading></Loading>
					) : (
						PanierResult.map((x, index) => (
							<li id="liste" data-id={x.id} data-color={x.couleur} key={index}>
								<div className="cart-image">
									<img src={x.image} alt={x.nom} title={x.nom}></img>
									<Link to={`/product/` + x.id}>
										<h6 className="cart-name-name">Retour sur le détail</h6>
									</Link>
								</div>
								<div className="cart-name">
									<div className="carte-name-name-bis">{x.nom}</div>
									<br />
									<div>{x.couleur}</div>
									<br />
									<div>
										Qty:{" "}
										<input
											className="itemQuantity"
											type="number"
											min="1"
											max={x.max}
											defaultValue={x.quantiter}
											onChange={e => ecouteChangementQuantiter(e.target.value)}
										/>
									</div>

									<br />
									<button
										className="deleteItem"
										onClick={() => handleDelete(x.id, x.couleur)}
									>
										Supprimer
									</button>
								</div>

								<div className="cart-price">{x.prix * x.quantiter} €</div>
							</li>
						))
					)}
				</ul>
			</div>
			<div className="cart-action">
				<h3>
					<p>
						Total (<span>{quantiter}</span> articles) : <span>{achats}</span> €
					</p>
				</h3>
				<br />
				<button onClick={checkoutHandler} className="valideItem">
					Procéder au paiement
				</button>
			</div>
		</div>
	);
};

export default Panier;
