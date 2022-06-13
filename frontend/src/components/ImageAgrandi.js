import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;
// import data from "../data";

const ImageAgrandi = () => {
	const { id } = useParams();
	const [image, setImage] = useState("");
	console.log(image);

	useEffect(() => {
		axios
			.get(`${REACT_APP_API_URL}api/products/${id}`)
			.then(res => {
				setImage(res.data[0]);
			})
			.catch(err => alert("Une erreur s'est produite"));
	}, [id]);

	return (
		<div className="container-image-agrandi">
			<h1 className="titre-image-agrandi">{image.nom}</h1>
			<div className="details-image-agrandi">
				<Link to={`/product/` + image._id}>X</Link>
				<img src={image.image} alt="product"></img>
			</div>
		</div>
	);
};

export default ImageAgrandi;
