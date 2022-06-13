import React from "react";
import { Link } from "react-router-dom";

const ProductsItem = ({ products }) => {
	return (
		<div>
			<ul className="products">
				{products && products.length ? (
					products.map((x, index) => (
						<li key={index}>
							<div className="product">
								<img className="product-image" src={x.image} alt={x.nom}></img>
								<div className="product-name">
									<Link to={`/product/` + x._id}>{x.nom}</Link>
								</div>
								<div className="product-brand">{x.marque}</div>
								<div className="product-price">€ {x.prix}</div>
								<div className="product-rating">
									{x.rating} Star(s) ({x.numReviews} reviews)
								</div>
							</div>
						</li>
					))
				) : (
					<h2>Chargement ....</h2>
				)}
			</ul>
		</div>
	);
};

export default ProductsItem;
