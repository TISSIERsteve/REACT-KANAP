import React from "react";
import ProductsItem from "../components/ProductsItem";

const Products = ({ products }) => {
	return (
		<div className="content">
			<ProductsItem products={products}></ProductsItem>
		</div>
	);
};

export default Products;
