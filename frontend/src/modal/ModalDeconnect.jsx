function ModalDeconnect({  onDialog, message }) {
	return (
	  <div
	    style={{
		position: "fixed",
		top: "0",
		left: "0",
		right: "0",
		bottom: "0",
		backgroundColor: "rgba(0,0,0,0.8)"
	    }}
	    onClick={() => onDialog(false)}
	  >
	    <div
		onClick={(e) => e.stopPropagation()}
		style={{
		  display: "flex",
		  flexDirection: "column",
		  alignItems: "center",
		  justifyContent: "center",
		  position: "absolute",
		  top: "50%",
		  left: "50%",
		  transform: "translate(-50%,-50%)",
		  background: "white",
		  padding: "50px",
		  borderRadius: "10px",
		}}
	    >
		<h1 style={{ color: "black", fontSize: "24px", marginBottom: "2rem", textAlign: "center", width: "35rem"}}>{message}</h1>
		<div style={{ display: "flex", alignItems: "center" }}>
		  <button
		    onClick={() => onDialog(true)}
		    style={{
			background: "red",
			borderRadius: "0.5rem",
			color: "white",
			fontWeight: "bold",
			width: "8rem",
			padding: "10px",
			marginRight: "8px",
			border: "none",
			cursor: "pointer"
		    }}
		  >
		    Oui
		  </button>
		  <button
		    onClick={() => onDialog(false)}
		    style={{
			background: "green",
			borderRadius: "0.5rem",
			color: "white",
			fontWeight: "bold",
			width: "8rem",
			padding: "10px",
			marginLeft: "8px",
			border: "none",
			cursor: "pointer"
		    }}
		  >
		    Non
		  </button>
		</div>
	    </div>
	  </div>
	);
    }
    export default ModalDeconnect;
    