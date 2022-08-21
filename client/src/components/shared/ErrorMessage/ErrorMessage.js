import React from 'react'

const ErrorMessage = (props) => {
	return (
		<div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: "30rem" }} >
			<strong>Holy guacamole!</strong> {props.text}
			<button
				type="button"
				className="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
			/>
		</div>

	)
}

export default ErrorMessage