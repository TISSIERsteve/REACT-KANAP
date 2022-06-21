import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Etape from "../components/Etape";

const ValidationAchats = () => {
	const navigate = useNavigate();
	const [adresse, setAdresse] = useState("");
	const [ville, setVille] = useState("");
	const [codePostale, setCodePostale] = useState("");
	const [pays, setPays] = useState("");

	// Text regex
	let codePostaleRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
	let codeAdresseRegex = /(.*[A-Za-z]){5,30}/;
	let codeVilleRegex = /(.*[A-Za-z]){5,30}/;
	let codePaysRegex = /(.*[A-Za-z]){5,30}/;

	const submitHandler = e => {
		e.preventDefault();
		if (
			codeAdresseRegex.test(adresse) &&
			codePostaleRegex.test(codePostale) &&
			codeVilleRegex.test(ville) &&
			codePaysRegex.test(pays)
		)
			if (window.confirm(`Voulez vous poursuivre`)) {
				const expedition = {
					adresse,
					ville,
					codePostale,
					pays,
				};
				let arrayExpedition = [];
				const storageCartExpedition = JSON.parse(
					localStorage.getItem("expedition"),
				);

				arrayExpedition.push(expedition);
				localStorage.setItem("expedition", JSON.stringify(arrayExpedition));
				if (localStorage.ModeLivraison && localStorage.ModePaiement) {
					navigate("/passercommande", { replace: true });
				} else {
					navigate("/livraison", { replace: true });
				}
			} else {
				navigate("/panier", { replace: true });
			}
	};

	if (localStorage.bearer) {
		return (
			<div>
				<Etape step1 step2></Etape>
				<div className="form-validationAchat">
					<form onSubmit={submitHandler}>
						<ul className="form-container-validationAchats">
							<li>
								<h2>Expédition</h2>
							</li>

							<li>
								<label htmlFor="adresse">Adresse</label>
								<input
									required
									type="text"
									name="adresse"
									id="adresse"
									onChange={e => {
										if (codeAdresseRegex.test(e.target.value)) {
											setAdresse(e.target.value);
											document.getElementById("spanAdresse").style.color =
												"green";
											document.getElementById("spanAdresse").innerHTML =
												"Adresse valide";
										} else {
											document.getElementById("spanAdresse").style.fontWeight =
												"bold";
											document.getElementById("spanAdresse").style.color =
												"red";
											document.getElementById("spanAdresse").innerHTML =
												"Veuillez renseigner une Adresse valide";
										}
									}}
								></input>
								<span id="spanAdresse"></span>
							</li>
							<li>
								<label htmlFor="ville">Ville</label>
								<input
									required
									type="text"
									name="ville"
									id="city"
									onChange={e => {
										if (codeVilleRegex.test(e.target.value)) {
											setVille(e.target.value);
											document.getElementById("spanVille").style.color =
												"green";
											document.getElementById("spanVille").innerHTML =
												"Ville valide";
										} else {
											document.getElementById("spanVille").style.fontWeight =
												"bold";
											document.getElementById("spanVille").style.color = "red";
											document.getElementById("spanVille").innerHTML =
												"Veuillez renseigner une Ville valide";
										}
									}}
								></input>
								<span id="spanVille"></span>
							</li>
							<li>
								<label htmlFor="CodePostale">Code Postal</label>
								<input
									required
									type="text"
									name="CodePostale"
									id="CodePostale"
									onChange={e => {
										if (codePostaleRegex.test(e.target.value)) {
											setCodePostale(e.target.value);
											document.getElementById("spanCode").style.color = "green";
											document.getElementById("spanCode").innerHTML =
												"Code Postale valide";
										} else {
											document.getElementById("spanCode").style.fontWeight =
												"bold";
											document.getElementById("spanCode").style.color = "red";
											document.getElementById("spanCode").innerHTML =
												"Veuillez renseigner un Code Postale valide";
										}
									}}
								></input>
								<span id="spanCode" />
							</li>
							<li>
								<label htmlFor="pays">Pays</label>
								<input
									required
									type="text"
									name="pays"
									id="pays"
									onChange={e => {
										if (codePaysRegex.test(e.target.value)) {
											setPays(e.target.value);
											document.getElementById("spanPays").style.color = "green";
											document.getElementById("spanPays").innerHTML =
												"Pays valide";
										} else {
											document.getElementById("spanPays").style.fontWeight =
												"bold";
											document.getElementById("spanPays").style.color = "red";
											document.getElementById("spanPays").innerHTML =
												"Veuillez renseigner un Paysvalide";
										}
									}}
								></input>
								<span id="spanPays"></span>
							</li>

							<li>
								<button
									type="submit"
									className="button primary-validationAchats"
								>
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

export default ValidationAchats;
