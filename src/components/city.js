//Imports
import React from 'react'

//This function returns a city component from given name and population.
function City(props){
	return(
		<div>
		
		<h2>{props.name}</h2>
			
			<div className="cityInfo">
				<button>Population <span className="numbers">{props.population}</span></button>
			</div>

		</div>
	)
}

export default City