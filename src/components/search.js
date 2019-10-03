//Imports
import React, { Component } from 'react';

//This class displays a search bar where the user 
//can search for a city or a country.
class Select extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchTerm: ""
		};
	}


	//////////////////////////////////////////////
	//Event functions.
	//////////////////////////////////////////////

	//This function is called everytime anything is written i the search box.
	handleChange = (e) =>{
		// Updates searchTerm when user writes something in the search box.
		this.setState({searchTerm: e.target.value});
	}

	render(){
		//Defining constants
		const searchTerm 		 = this.state.searchTerm;
		const searchBy 			 = this.props.searchBy;
		const submitHandler  = this.props.submitHandler;

		//Return different components depending on the constants above. 
		return(
			<form onSubmit={(SearchTerm) => submitHandler(searchTerm)}>
	 	  	<h3>Search By {searchBy}</h3>
	       	<input type="text" placeholder={"Enter a " + searchBy} onChange = {this.handleChange}/>
	   			<input type="submit" value="Submit" />
	    </form>
		)
	}
}

export default Select;