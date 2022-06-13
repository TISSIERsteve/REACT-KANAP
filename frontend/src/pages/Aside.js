import React from "react";
import { Link } from "react-router-dom";

const Aside = () => {
	return (
		<div className="modal">
			<h3>Shopping Categories</h3>

			<ul>
				<li>
					<Link to="#">Pants</Link>
					<Link to="#">Shirts</Link>
				</li>
			</ul>
		</div>
	);
};

export default Aside;
