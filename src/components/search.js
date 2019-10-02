//Imports
import React, { Component } from 'react';

class Select extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchTerm: ""
		};
	}



	//////////////////////////////////////////////
	//Event functions
	//////////////////////////////////////////////

	// Updates searchterm state when user writes something in the textbox.
	handleChange = (e) =>{
		this.setState({searchTerm: e.target.value});
	}


	render(){
		return(
			<form onSubmit={(searchTerm) => this.props.submitHandler(this.state.searchTerm)}>
	 	  	<h3>Search By {this.props.searchBy}</h3>
	       	<input type="text" placeholder={"Enter a " + this.props.searchBy} onChange = {this.handleChange}/>
	   			<input type="submit" value="Submit" />
	    </form>
		)
	}
}


export default Select;