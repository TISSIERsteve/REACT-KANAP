import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Etape from "../components/Etape";

const PasserCommande = () => {
	const [finalAchat, setFinalAchat] = useState("");
	const passerCommande = JSON.parse(localStorage.achats);
	const expedition = JSON.parse(localStorage.expedition);

	useEffect(() => {
		let totalAchatsFinal = 0;
		const finalAchats = JSON.parse(localStorage.achats);
		let resultAchats = finalAchats.map(x => x.prix);
		for (let i = 0; i < finalAchats.length; i++) {
			setFinalAchat((totalAchatsFinal += resultAchats[i]));
		}
	}, []);

	// console.log(finalAchats);
	const placeOrderHandler = () => {
		console.log("e");
	};
	if (localStorage.bearer) {
		return (
			<div>
				<Etape step1 step2 step3 step4></Etape>
				<div className="retour-accueil">
					<Link to="/">Retour accueil</Link>
				</div>
				<div className="placeorder">
					<div className="placeorder-info">
						<div>
							<h3>Expédition</h3>
							<button>
								<Link to="/validationAchats">Modifier Adresse</Link>
							</button>
							{expedition.map((x, index) => (
								<ul key={index}>
									<ol>
										<ul>{x.adresse}</ul>
										<ul>{x.codePostale}</ul>
										<ul>{x.ville}</ul>
									</ol>
								</ul>
							))}
						</div>

						<div>
							<h3>Paiement</h3>
							<div>
								Paiement Methode:{" "}
								<span className="paiement-methode">
									{JSON.parse(localStorage.ModePaiement)}
								</span>
							</div>
							<button>
								<Link to="/paiement">Modifier Paiement</Link>
							</button>
						</div>
						<div>
							<h3>Transport</h3>
							<div></div>
							<button></button>
						</div>
						<div>
							<h3>Panier</h3>
							<br />
							<hr />
							<br />
							{passerCommande.map((x, index) => (
								<ul className="cart-list-container" key={index}>
									<article>
										<picture className="cart-image">
											<img src={x.image} alt={x.nom} title={x.nom} />
										</picture>
										<figcaption>
											<div className="cart-name">
												<p>{x.nom}</p>
												<p>Qty: {x.quantiter}</p>
												<p>Prix : {x.prix} €</p>
											</div>
										</figcaption>
									</article>
								</ul>
							))}
						</div>
					</div>
					<div className="placeorder-action">
						<ul>
							<li> </li>
							<li>
								<h3>Récapitulatif de la commande</h3>
							</li>

							<li>
								<div>Frais Transport</div>
								<div></div>
							</li>
							<li>
								<div>Total de la commande</div>
								<div>{finalAchat} €</div>
							</li>
						</ul>
						<div>
							<button onClick={placeOrderHandler}>Passer Commande</button>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <Navigate to="/"></Navigate>;
	}
};

export default PasserCommande;
