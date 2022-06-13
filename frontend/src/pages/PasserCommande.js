import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Etape from "../components/Etape";

const PasserCommande = () => {
	const [finalAchat, setFinalAchat] = useState("");

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

	return (
		<div>
			<Etape step1 step2 step3 step4></Etape>
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<h3>Expédition</h3>
						<div></div>
					</div>
					<div>
						<h3>Paiement</h3>
						<div>Paiement Methode: {JSON.parse(localStorage.ModePaiement)}</div>
					</div>
					<div>
						<ul className="cart-list-container">
							<li>
								<h3>Panier</h3>
								<div>Prix : €</div>
							</li>

							<li>
								<div className="cart-image">
									<img src="#" alt="product" />
								</div>
								<div className="cart-name">
									<div>
										<Link to="#">nom</Link>
									</div>
									<div>Qty: quantite</div>
								</div>
								<div className="cart-price">€</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="placeorder-action">
					<ul>
						<li>
							<button
								className="button primary full-width"
								onClick={placeOrderHandler}
							>
								Passer Commande
							</button>
						</li>
						<li>
							<h3>Récapitulatif de la commande</h3>
						</li>
						<li>
							<div>Elements</div>
							<div> </div>
						</li>
						<li>
							<div>Expédition</div>
							<div></div>
						</li>
						<li>
							<div>Taxe</div>
							<div></div>
						</li>
						<li>
							<div>Total de la commande</div>
							<div>{finalAchat} €</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default PasserCommande;
