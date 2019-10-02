//Imports
import React, { Component } from 'react';

class Select extends Component{
	render(){
		return(
			<div>
				<button className="selectButton" onClick = {(type) => this.props.buttonHandler("country")} >Select by Country</button>
				<button className="selectButton" onClick = {(type) => this.props.buttonHandler("city")} >Select by City</button>
			</div>
		)
	}
}

export default Select;