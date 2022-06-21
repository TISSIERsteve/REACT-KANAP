import React, { useState } from "react";
import Etape from "../components/Etape";
import { Navigate, useNavigate } from "react-router-dom";

const Paiement = () => {
	const navigate = useNavigate();
	const [carte, setCarte] = useState("");
	const [paypal, setPaypal] = useState("");
	const [virement, setVirement] = useState("");

	const checkboxHandler = e => {
		e.preventDefault();
		const CarteBancaire = document.getElementById("Carte Bancaire");
		const Paypal = document.getElementById("Paypal");
		const Virement = document.getElementById("Virement");
		const ErrorRadio = document.getElementById("ErrorRadio");
		const Carte = document.getElementById("Carte");
		const paypals = document.getElementById("paypals");
		const virements = document.getElementById("virements");

		ErrorRadio.innerHTML = "";
		Carte.innerHTML = "";
		paypals.innerHTML = "";
		virements.innerHTML = "";

		if (!CarteBancaire.checked && !Paypal.checked && !Virement.checked) {
			if (!CarteBancaire.checked) {
				ErrorRadio.innerHTML = "Veuillez choisir un moyen de paiement";
				ErrorRadio.style.color = "red";
				ErrorRadio.style.fontWeight = "bold";
			}
		} else if (CarteBancaire.checked) {
			Carte.innerHTML = "Vous avez choisis le paiement par carte Bancaire";
			Carte.style.color = "green";

			if (window.confirm("Votre moyen de paiement sera par carte")) {
				let modePaiement = [];
				modePaiement.push(carte);
				localStorage.setItem("ModePaiement", JSON.stringify(modePaiement));
				navigate("/passerCommande", { replace: true });
			}
		} else if (Paypal.checked) {
			paypals.innerHTML = "Vous avez choisis le paiement Paypal";
			paypals.style.color = "green";

			if (window.confirm("Votre de paiement sera par Paypal")) {
				let modePaiement = [];
				modePaiement.push(paypal);
				localStorage.setItem("ModePaiement", JSON.stringify(modePaiement));
				navigate("/passerCommande", { replace: true });
			}
		} else if (Virement.checked) {
			virements.innerHTML = "Vous avez choisis le paiement par Virement";
			virements.style.color = "green";

			if (window.confirm("Votre moyen de paiement sera par Virement")) {
				let modePaiement = [];
				modePaiement.push(virement);
				localStorage.setItem("ModePaiement", JSON.stringify(modePaiement));
				navigate("/passerCommande", { replace: true });
			}
		}
	};
	if (localStorage.bearer) {
		return (
			<div>
				<Etape step1 step2 step3 step4></Etape>
				<div className="forms">
					<form onSubmit={checkboxHandler}>
						<ul className="forms-container">
							<fieldset>
								<legend>Choississez un moyen de paiement:</legend>

								<div>
									<input
										className="carteBancaire"
										type="radio"
										id="Carte Bancaire"
										name="drone"
										value="Carte Bancaire"
										onChange={e => setCarte(e.target.value)}
									/>
									<label htmlFor="Carte Bancaire">Carte</label>
									<br />
									<div id="Carte"></div>
								</div>
								<br />
								<div>
									<input
										className="carteBancaire"
										type="radio"
										id="Paypal"
										name="drone"
										value="Paypal"
										onChange={e => setPaypal(e.target.value)}
									/>
									<label htmlFor="Paypal">Paypal</label>
									<br />
									<div id="paypals"></div>
								</div>
								<br />
								<div>
									<input
										className="carteBancaire"
										type="radio"
										id="Virement"
										name="drone"
										value="Virement"
										onChange={e => setVirement(e.target.value)}
									/>
									<label htmlFor="Virement">Virement</label>
									<br />
									<div id="virements"></div>
								</div>
								<br />
								<div id="ErrorRadio"></div>
							</fieldset>

							<li>
								<button type="submit" className="button-paiement primary">
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
export default Paiement;
