import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Etape from "../components/Etape";
const { REACT_APP_API_URL } = process.env;

const PasserCommande = () => {
	const navigate = useNavigate();
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

	const placeOrderHandler = e => {
		e.preventDefault();
		passerCommande.filter(x => {
			axios.post(`${REACT_APP_API_URL}api/validation`, {
				identifiantProduit: x.id,
				nameProduit: x.nom,
				quantiter: x.quantiter,
				couleur: x.couleur,

				paiementMode: `${paiement}`,
				livraisonMode: `${livraison}`,

				nom: `${nom}`,
				adresse: expedition[0].adresse,
				ville: expedition[0].ville,
				codePostale: expedition[0].codePostale,
				pays: expedition[0].pays,
			});
		});
		localStorage.clear();
		navigate("/", { replace: true });
		window.location.reload();
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
