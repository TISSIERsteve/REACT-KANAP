import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const SeConnecter = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState();

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await axios.post(`${REACT_APP_API_URL}api/auth/login`, {
				email,
				password,
			});

			if (response.data.errors) {
				console.log("erreur");
			} else {
				axios.defaults.headers.common.Authorization = response.data.token;

				// localStorage.setItem("id", JSON.stringify(response.data.user.id));
				localStorage.setItem("bearer", response.data.token);
				localStorage.setItem("nom", response.data.nom);
				navigate("/", { replace: true });
				window.location.reload();
			}
		} catch (err) {
			alert("E-mail ou mot de passe incorrect");
			window.location.reload();
		}
	};

	return (
		<div className="form">
			<form>
				<ul className="form-container">
					<li>
						<h2>Se connecter</h2>
					</li>

					<li>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							onChange={e => setEmail(e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="password">Mot de passe</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={e => setPassword(e.target.value)}
						/>
					</li>

					<li>
						<button
							type="submit"
							className="button primary"
							onClick={handleSubmit}
						>
							Connexion
						</button>
					</li>
					<Link to="/sinscrire">
						<li>Nouveau client ?</li>
					</Link>
				</ul>
			</form>
		</div>
	);
};

export default SeConnecter;
