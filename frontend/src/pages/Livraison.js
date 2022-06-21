import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Components
import Etape from "../components/Etape";

const Livraison = () => {
	const navigate = useNavigate();
	const [poste, setPoste] = useState("");
	const [chronopost, setChronopost] = useState("");
	const [ups, setUps] = useState("");

	const checkboxHandler = e => {
		e.preventDefault();
		const Poste = document.getElementById("Poste");
		const Chronopost = document.getElementById("Chronopost");
		const Ups = document.getElementById("Ups");
		const ErrorRadio = document.getElementById("ErrorRadio");
		const livraisonPoste = document.getElementById("livraisonPoste");
		const livraisonChronopost = document.getElementById("livraisonChronopost");
		const livraisonUps = document.getElementById("livraisonUps");

		ErrorRadio.innerHTML = "";
		livraisonPoste.innerHTML = "";
		livraisonChronopost.innerHTML = "";
		livraisonUps.innerHTML = "";

		if (!Poste.checked && !Chronopost.checked && !Ups.checked) {
			if (!Poste.checked) {
				ErrorRadio.innerHTML = "Veuillez choisir un moyen de livraison";
				ErrorRadio.style.color = "red";
				ErrorRadio.style.fontWeight = "bold";
			}
		} else if (Poste.checked) {
			livraisonPoste.innerHTML = "Vous avez choisis la poste";
			livraisonPoste.style.color = "green";

			if (window.confirm("Votre moyen de livraison sera la Poste")) {
				let modeLivraison = [];
				modeLivraison.push(poste);
				localStorage.setItem("ModeLivraison", JSON.stringify(modeLivraison));
				if (localStorage.ModePaiement) {
					navigate("/passercommande", { replace: true });
				} else {
					navigate("/paiement", { replace: true });
				}
			}
		} else if (Chronopost.checked) {
			livraisonChronopost.innerHTML = "Vous avez choisis Chronopost";
			livraisonChronopost.style.color = "green";

			if (window.confirm("Votre moyen de livraison sera la Chronopost")) {
				let modeLivraison = [];
				modeLivraison.push(chronopost);
				localStorage.setItem("ModeLivraison", JSON.stringify(modeLivraison));

				if (localStorage.ModePaiement) {
					navigate("/passercommande", { replace: true });
				} else {
					navigate("/paiement", { replace: true });
				}
			}
		} else if (Ups.checked) {
			livraisonUps.innerHTML = "Vous avez choisis Ups";
			livraisonUps.style.color = "green";

			if (window.confirm("Votre moyen de livraison sera la Ups")) {
				let modeLivraison = [];
				modeLivraison.push(ups);
				localStorage.setItem("ModeLivraison", JSON.stringify(modeLivraison));

				if (localStorage.ModePaiement) {
					navigate("/passercommande", { replace: true });
				} else {
					navigate("/paiement", { replace: true });
				}
			}
		}
	};
	if (localStorage.bearer) {
		return (
			<div>
				<Etape step1 step2 step3></Etape>
				<div className="forms-livraison">
					<form onSubmit={checkboxHandler}>
						<ul className="forms-container-livraison">
							<fieldset>
								<legend>Choississez un moyen de livraison:</legend>

								<div>
									<input
										className="input"
										type="radio"
										id="Poste"
										name="drone"
										value="Poste"
										onChange={e => setPoste(e.target.value)}
									/>
									<label htmlFor="Poste">Poste</label>
									<br />
									<div id="livraisonPoste"></div>
								</div>
								<br />
								<div>
									<input
										className="input"
										type="radio"
										id="Chronopost"
										name="drone"
										value="Chronopost"
										onChange={e => setChronopost(e.target.value)}
									/>
									<label htmlFor="Chronopost">Chronopost</label>
									<br />
									<div id="livraisonChronopost"></div>
								</div>
								<br />
								<div>
									<input
										className="input"
										type="radio"
										id="Ups"
										name="drone"
										value="Ups"
										onChange={e => setUps(e.target.value)}
									/>
									<label htmlFor="Ups">UPS</label>
									<br />
									<div id="livraisonUps"></div>
								</div>
								<br />
								<div id="ErrorRadio"></div>
							</fieldset>

							<li>
								<button type="submit" className="button-livraison primary">
									Continuer
								</button>
							</li>
						</ul>
					</form>
				</div>
			</div>
		);
	} else {
		return <Navigate to="/"></Navigate>;
	}
};
export default Livraison;
