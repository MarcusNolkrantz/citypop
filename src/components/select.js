//Imports.
import React, { Component } from 'react';

//This function displays two buttons where the user can choose
//to either search by country or by city.
function Select(props){
	return(
		<div>
			<button className="selectButton" onClick = {(type) => props.buttonHandler("country")} >Select by Country</button>
			<button className="selectButton" onClick = {(type) => props.buttonHandler("city")} >Select by City</button>
		</div>
	)
}

export default Select;