import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { REACT_APP_API_URL } = process.env;

const Search = () => {
	const [products, setProducts] = useState([]);
	const [name, setName] = useState("");

	useEffect(() => {
		axios.get(`${REACT_APP_API_URL}api/products/`).then(res => {
			setProducts(res.data);
		});
	}, []);

	const hanldeSearch = e => {
		let value = e.target.value;
		setName(value);
	};

	const handleRefresh = () => {
		window.location.reload();
	};

	return (
		<div className="searchBar">
			<form className="search">
				<input
					type="text"
					name="searchBar"
					id="searchBar"
					placeholder="Tapez votre recherche"
					onChange={hanldeSearch}
				></input>
				<button onClick={handleRefresh} type="reset">
					X
				</button>
			</form>
			<div className="search-results">
				{name &&
					products
						.filter(x => {
							return x.nom.toLowerCase().includes(name.toLowerCase());
						})
						.map((x, index) => {
							return (
								<div className="search-result" key={index}>
									<ul>
										<article>
											<p>
												<Link to={`/product/` + x._id}>{x.nom}</Link>
											</p>
											<picture>
												<img src={x.image} alt={x.nom} title={x.nom} />
											</picture>
										</article>
									</ul>
								</div>
							);
						})}
			</div>
		</div>
	);
};

export default Search;
