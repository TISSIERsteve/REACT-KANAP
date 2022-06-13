import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Rating from "./Rating";
import Loading from "./Loading";

const ProductItem = ({ product }) => {
	// const [rangeValue, setRangeValue] = useState("");
	const [couleur, setCouleur] = useState("");
	const [stock, setStock] = useState("");

	const addStorage = (id, nom, image, prix, max) => {
		if (stock <= 0) {
			alert("Veuillez indiquer une quantité");
			return;
		} else if (couleur === "") {
			alert("Veuillez indiquer une couleur");
			return;
		} else {
			const details = {
				id: id,
				image: image,
				nom: nom,
				couleur: couleur,
				quantiter: parseInt(stock),
				prix: prix,
				max: max,
			};

			let array = [];
			const storageCart = JSON.parse(localStorage.getItem("achats"));

			// S'il il y a déjà quelque chose dans le localStorage
			if (storageCart && storageCart.length) {
				array = JSON.parse(localStorage.getItem("achats"));

				const filtre = array.filter(
					x => x.nom === nom && x.couleur === couleur,
				);
				if (
					filtre &&
					filtre.length &&
					filtre[0].quantiter + parseInt(stock) > max
				) {
					let sousTotalQuantite = max - filtre[0].quantiter;
					alert(
						`******************** STOCK EPUISER ********************\nIl ne reste plus que ${sousTotalQuantite} ${nom} de couleur ${couleur}.`,
					);
					window.location.reload();
					return;
				}
				if (filtre && filtre.length) {
					filtre[0].quantiter += parseInt(stock);
				} else {
					array.push(details);
				}

				localStorage.setItem("achats", JSON.stringify(array));
				alert(
					`Vous venez d'ajouter ${stock} ${nom} de couleur ${couleur} dans votre panier`,
				);
				window.location.reload();
				return;
			} else {
				// S' il y a rien dans le localStorage
				array.push(details);
				localStorage.setItem("achats", JSON.stringify(array));
				alert(
					`Pour votre premier achat vous venez d'ajouter ${stock} ${nom} de couleur ${couleur} dans votre panier`,
				);
				window.location.reload();
				return;
			}
		}
	};

	const addRemove = () => {
		window.location.reload();
	};

	return (
		<div>
			{product && product.length ? (
				product.map((product, index) => (
					<ul className="details" key={index}>
						<div className="details-image">
							<img
								src={product.image}
								alt={product.nom}
								title={product.nom}
							></img>
						</div>
						<div className="details-info">
							<ul>
								<li>
									<h4>{product.nom}</h4>
									Prix: <>€ {product.prix}</>
								</li>
								<li>
									Description:
									<div>{product.description}</div>
								</li>
								<Rating
									rating={product.rating}
									numReviews={product.numReviews}
								></Rating>
								<br />
								<Link to={`/imageAgrandi/` + product._id}>
									<button className="agrandirItem">Agrandir image</button>
								</Link>
							</ul>
						</div>
						<div className="details-action">
							<ul>
								<li>Prix Unitaire: {product.prix} €</li>
								<li>
									Stock:{" "}
									{product.stock > 0 ? (
										<span className="enStock">
											"En Stock {product.stock} unitée(s)"
										</span>
									) : (
										<span className="rupture">"Rupture de stock."</span>
									)}
								</li>
								<li>
									Couleur:
									<select onChange={e => setCouleur(e.target.value)}>
										<option>Choississez votre couleur</option>
										{product.couleur && product.couleur.length
											? product.couleur.map((x, index) => (
													<option key={index} value={x}>
														{x}
													</option>
											  ))
											: ""}
									</select>
								</li>
								<li>
									{product.stock > 0 ? (
										<form>
											<label htmlFor="quantity">Quantité: </label>
											<input
												placeholder="Indiquez la quantité"
												id="quantity"
												type="number"
												min="1"
												max={product.stock}
												onChange={e => setStock(e.target.value)}
											/>
										</form>
									) : (
										<span className="rupture">"Rupture de stock."</span>
									)}
								</li>
								<li>
									<button
										className="button primary"
										onClick={() =>
											addStorage(
												product._id,
												product.nom,
												product.image,
												product.prix,
												product.stock,
											)
										}
									>
										Ajouter au panier
									</button>
									<button
										className="button secondary"
										onClick={() => addRemove()}
									>
										Annuler
									</button>
								</li>
							</ul>
						</div>
					</ul>
				))
			) : (
				<Loading></Loading>
			)}
		</div>
	);
};

export default ProductItem;
