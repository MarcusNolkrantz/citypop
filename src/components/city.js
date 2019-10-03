import React, { Component } from 'react'


function City(props){
	return(
		<div>
		<h2>{props.name}</h2>
			<div>
				<p>Population</p>
				<p>{props.population}</p>
			</div>
		</div>
	)
}


export default City