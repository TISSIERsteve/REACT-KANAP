import React from "react";
import { Link } from "react-router-dom";

// Components
import Rating from "./Rating";
import Loading from "./Loading";

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
									<Rating rating={x.rating} numReviews={x.numReviews}></Rating>
								</div>
							</div>
						</li>
					))
				) : (
					<Loading></Loading>
				)}
			</ul>
		</div>
	);
};

export default ProductsItem;
