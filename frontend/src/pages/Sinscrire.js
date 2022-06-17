import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
const { REACT_APP_API_URL } = process.env;

const Sinscrire = props => {
	const navigate = useNavigate();
	const [nom, setNom] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");

	// Test regex
	const nomRegex = /(.*[A-Za-z]){3,30}/;
	let mailRegex =
		/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
	let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

	// Function enregister
	const handleSubmit = e => {
		e.preventDefault();
		const terms = document.getElementById("terms");
		const termsError = document.getElementById("terms error");
		const passwordConfirm = document.getElementById("span4");
		const emailErrors = document.getElementById("span2");
		const passwordError = document.getElementById("span3");

		passwordConfirm.innerHTML = "";
		termsError.innerHTML = "";
		if (password !== rePassword || !terms.checked) {
			if (password !== rePassword) {
				passwordConfirm.innerHTML = "Les mots de passe ne correspondent pas";
				passwordConfirm.style.color = "red";
				passwordConfirm.style.fontWeight = "bold";
			}
			if (!terms.checked) {
				termsError.innerHTML = "Veuillez valider les conditions génèrales";
				termsError.style.color = "red";
				termsError.style.fontWeight = "bold";
			}
		} else if (
			password == rePassword &&
			terms.checked &&
			nomRegex.test(nom) &&
			passwordRegex.test(password) &&
			mailRegex.test(email)
		) {
			axios
				.post(`${REACT_APP_API_URL}api/auth/signup`, {
					nom,
					email,
					password,
				})
				.then(res => {
					if (res.data.errors) {
						emailErrors.innerHTML = res.data.errors.email;
						passwordError.innerHTML = res.data.errors.password;
					} else {
						if (
							window.confirm(
								`${nom} voulez vous vous vraiment vous inscrire sur Kanap`,
							)
						) {
							alert(`Bravo ${nom} tu viens de t'inscrire sur Kanap`);
							navigate("/connexion", { replace: true });
						} else {
							window.location.reload();
						}
					}
				})
				.catch(err => {
					try {
						if (err.response.data.error.errors.name.value === nom);
						alert("Ce nom est déjà utiliser");
					} catch {
						if (err.response.data.error.errors.email.value === email) {
							alert("Cette adresse email est déjà utiliser");
						}
					}
				});
		} else {
			alert("Une erreur s'est produite, veuillez réessayez");
		}
	};

	return (
		<div className="form">
			<form onSubmit={handleSubmit}>
				<ul className="form-container">
					<li>
						<h2>Inscription</h2>
					</li>
					<li>
						<label htmlFor="name">Nom</label>
						<input
							required
							type="name"
							name="name"
							id="name"
							onChange={e => {
								if (nomRegex.test(e.target.value)) {
									setNom(e.target.value);
									document.getElementById("span1").style.color = "green";
									document.getElementById("span1").innerHTML = "Prénom Valide";
								} else {
									document.getElementById("span1").style.fontWeight = "bold";
									document.getElementById("span1").style.color = "red";
									document.getElementById("span1").innerHTML =
										"Veuillez renseigner minimun 3 caractères";
								}
							}}
						/>
						<span id="span1" />
					</li>
					<li>
						<label htmlFor="email">Email</label>
						<input
							required
							type="email"
							name="email"
							id="email"
							onChange={e => {
								if (mailRegex.test(e.target.value)) {
									setEmail(e.target.value);
									document.getElementById("span2").style.color = "green";
									document.getElementById("span2").innerHTML = "Email Valide";
								} else {
									document.getElementById("span2").style.fontWeight = "bold";
									document.getElementById("span2").style.color = "red";
									document.getElementById("span2").innerHTML =
										"Veuillez renseigner une adresse e-mail valide";
								}
							}}
						/>
						<span id="span2" />
					</li>
					<li className="password">
						<label htmlFor="password">Mot de passe</label>
						<input
							required
							type="password"
							// type={password ? "password" : "text"}
							id="password"
							name="password"
							onChange={e => {
								if (passwordRegex.test(e.target.value)) {
									setPassword(e.target.value);
									document.getElementById("span3").style.color = "green";
									document.getElementById("span3").innerHTML =
										"Mot de passe valide";
								} else {
									document.getElementById("span3").style.fontWeight = "bold";
									document.getElementById("span3").style.color = "red";
									document.getElementById("span3").innerHTML =
										"Veuillez renseigner au moins une majuscule et minuscule avec 1 lettre";
								}
							}}
						/>
						{/* <button className="eyes" onClick={() => setPassword(password)}>
							{password ? <FaRegEyeSlash /> : <FaEye />}
						</button> */}

						<span id="span3" />
					</li>
					<li>
						<label htmlFor="rePassword">Confirmez mot de passe</label>
						<input
							required
							type="password"
							id="rePassword"
							name="rePassword"
							onChange={e => setRePassword(e.target.value)}
						/>
						<span id="span4" />
					</li>

					<div className="form-check">
						<input type="checkbox" id="terms"></input>
						<label htmlFor="terms">
							{""} J'ai lu et j'accepte les{" "}
							<a href="#" target="_blank" rel="noopener noreferrer">
								conditions génèrales
							</a>{" "}
						</label>
						<div id="terms error"></div>
					</div>
					<br />
					<div>
						<button type="submit">Valider</button>
						<button type="reset">Annuler</button>
					</div>
					<Link to="/connexion">
						<li>Déjà client ?</li>
					</Link>
				</ul>
			</form>
		</div>
	);
};

export default Sinscrire;
