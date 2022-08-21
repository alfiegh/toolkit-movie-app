import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = (props) => {

	const token = document.cookie.split("token=").join("");
	return (
		token ? props.children : <Navigate to="/accounts/login" />
	)
}

// I will use the below comment as a reminder to maybe come back to this method later

// const PrivateRoute = (props) => {

// 	const [isLoading, setIsLoading] = useState(true);

// 	useEffect(() => {
// 		props.dispatch(verifyTokenRequest()); //dispatch my saga here
// 		setIsLoading(false)
// 	}, [])

// 	if (isLoading) {
// 		return (
// 		<div className="spinner-border text-success" role="status">
// 		</div>)
// 	}

// 	console.log('isLoggedinPROP', props.isLoggedIn)
// 	return (
// 		props.isLoggedIn ? props.children : <Navigate to="/accounts/login" />
// 	)
// }

// const mapStateToProps = (state) => {
// 	return {
// 		isLoggedIn: state.user.isLoggedIn,
// 	}

export default PrivateRoute;