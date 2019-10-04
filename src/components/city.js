//Imports
import React from 'react'

//This function returns a city component from given name and population.
function City(props){
	return(
		<div>
		
		<h2>{props.name}</h2>
			
			<div className="cityInfo">
				<p>Population <span className="numbers">{props.population}</span></p>
			</div>

		</div>
	)
}

export default City