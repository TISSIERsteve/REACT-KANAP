import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Etape from "../components/Etape";

const PasserCommande = () => {
	const [finalAchat, setFinalAchat] = useState("");
	const passerCommande = JSON.parse(localStorage.achats);
	const [expedition, setExpedition] = useState(
		JSON.parse(localStorage.expedition),
	);

	const [livraison, setLivraison] = useState(
		JSON.parse(localStorage.ModeLivraison),
	);
	const [paiement, setPaiement] = useState(
		JSON.parse(localStorage.ModePaiement),
	);
	const nom = localStorage.nom;

	useEffect(() => {
		let totalAchatsFinal = 0;
		const finalAchats = JSON.parse(localStorage.achats);
		finalAchats.filter(x => {
			totalAchatsFinal += parseInt(x.prix * x.quantiter);
			setFinalAchat(totalAchatsFinal);
		});
	}, []);

	const placeOrderHandler = () => {
		console.log(
			`CLIEN ${nom} HAMEAU ${expedition[0].adresse} COMMUNE ${expedition[0].ville} CODE POSTALE ${expedition[0].codePostale} PAYS ${expedition[0].pays} LIVRAISON PAR ${livraison} PAIEMENT ${paiement} NUMERO IDENTIFIANT ${passerCommande[0].id} QUANTITER ${passerCommande[0].quantiter}`,
		);
	};

	if (localStorage.bearer) {
		return (
			<div>
				<Etape step1 step2 step3 step4 step5></Etape>
				<br />
				<br />
				<div className="placeorder">
					<div className="placeorder-info nav">
						<div className="nav1">
							<h3>Récapitulatif de la commande</h3>
						</div>
						<div className="nav2">
							<h3>Expédition</h3>
							<div className="expedition-methode ">
								{expedition.map((x, index) => (
									<ul key={index}>
										<ul>{x.adresse}</ul>
										<ul>{x.codePostale}</ul>
										<ul>{x.ville}</ul>
									</ul>
								))}
							</div>
							<button>
								<Link to="/validationAchats">Modifier Adresse</Link>
							</button>
						</div>
						<div className="nav4">
							<h3>Transport</h3>
							<div className="livraison-methode">{livraison}</div>
							<button>
								<Link to="/livraison">Modifier Livraison</Link>
							</button>
						</div>
						<div className="nav5">
							<h3>Paiement</h3>
							<div className="paiement-methode">{paiement}</div>
							<button>
								<Link to="/paiement">Modifier Paiement</Link>
							</button>
						</div>

						<div className="nav6">
							<h3>Panier</h3>
							<br />
							<hr />
							<br />
							<div>
								{passerCommande.map((x, index) => (
									<ul className="cart-list-container " key={index}>
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
					</div>
					<div className="placeorder-action">
						<ul>
							<li> </li>
							<li>
								<h3>Monsieur, Madame {nom} voici le</h3>
							</li>
							<br />

							<li>
								<div>Total de votre commande</div>
								<div>{finalAchat} €</div>
							</li>
						</ul>
						<div>
							<button
								className="button-passer-commande"
								onClick={placeOrderHandler}
							>
								Passer Commande
							</button>
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
