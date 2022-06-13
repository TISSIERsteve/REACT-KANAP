import React from "react";
// import data from "../data";
import { Link, useNavigate, useParams } from "react-router-dom";

const ImageAgrandi = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	// const product = data.products.find(x => x._id === id);
	// console.log(product._id);

	return (
		<div className="container-image-agrandi">
			{/* <h1 className="titre-image-agrandi">{product.nom}</h1>
			<div className="details-image-agrandi">
				<Link to={`/product/` + product._id}>X</Link>
				<img src={product.image} alt="product"></img>
			</div> */}
		</div>
	);
};

export default ImageAgrandi;
