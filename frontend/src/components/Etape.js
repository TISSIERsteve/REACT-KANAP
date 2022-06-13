import React from "react";
import { Link } from "react-router-dom";

const Etape = props => {
	return (
		<div className="checkout-steps">
			<div className={props.step1 ? "active" : ""}>S'inscrire</div>
			<div className={props.step2 ? "active" : ""}>Adresse Expédition</div>
			<div className={props.step3 ? "active" : ""}>Paiement</div>
			<div className={props.step4 ? "active" : ""}>Passer commande</div>
		</div>
	);
};

export default Etape;
