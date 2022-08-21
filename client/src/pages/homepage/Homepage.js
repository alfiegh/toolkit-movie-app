import React from 'react'
import "./Homepage.css"
import { RiTwitterLine, RiInstagramLine, RiFacebookBoxLine } from "react-icons/ri";
import { Link } from 'react-router-dom';


const Homepage = () => {
	return (
		<div className='homepage'>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md homepage-column'>
						<h1 className='homepage-title'>Your favorite movies and TV shows gathered in one place.</h1>

						<h4 className='homepage-sub-title'>Enjoy hundrees of your favourite movies, TV shows, documentaries and cartoons provided by the MovieDB API and carefuly designed and curated by me. </h4>

						<div className='homepage-socials'>
							<Link to="#" className='homepage-socials-icons'>
								<RiTwitterLine
									size={35}
								/>
							</Link>
							<Link to='#' className='homepage-socials-icons'>
								<RiInstagramLine
									size={35}
								/>
							</Link>
							<Link to='#' className='homepage-socials-icons'>
								<RiFacebookBoxLine
									size={35}
								/>
							</Link>
						</div>

						<div className='homepage-call-to-action'>
							<button className='watchlist-button'>My Watchlist</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Homepage