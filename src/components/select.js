//Imports.
import React from 'react';

//This function displays two buttons where the user can choose
//to either search by country or by city.
function Select(props){
	return(
		<div className="selectButtons">
			<button onClick = {(type) => props.buttonHandler("country")} >Search by Country</button>
			<button onClick = {(type) => props.buttonHandler("city")} >Search by City</button>
		</div>
	)
}

export default Select;