//Imports
import React, { Component } from 'react';
import { IoIosSearch } from "react-icons/io"; 

//This class displays a search bar where the user 
//can search for a city or a country.
class Select extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchTerm: "",
			errorMessage: ""
		};
	}


	//////////////////////////////////////////////
	//Event functions.
	//////////////////////////////////////////////

	//This function is called everytime anything is written i the search box.
	handleChange = (e) =>{
		// Updates searchTerm when user writes something in the search box.
		this.setState({searchTerm: e.target.value, errorMessage: ""});
	}

	//This function is called when a search is submitted. 
	handleSubmit = (e) => {
		//Prevent default behaviour.
		e.preventDefault();
		//If input is a valid string
		if(this.validateInput()){
			this.props.submitHandler(this.state.searchTerm);
		}
		//If input is not a valid string
		else{
			//Clear search box.
			e.target.search.value = "";
		}
	}

	//This function validates input.
	//Returns true if valid, false if not.
	validateInput = () => {
		const input = this.state.searchTerm;

		//Check if input is less then two characters long.
		if(input.trim().length < 2){
			//Set error message
			this.setState({errorMessage: "Input needs to be at least two characters long."})
			return false;
		}
		
		//Loop through input string
		for (var i = 0; i < input.length; i++) {
			const code = input.charCodeAt([i]);
			//Check if character is a letter.
			if( (code < 65 && code !== 32) || (code > 90 && code < 97) || (code > 123)) {
				//Set error message
				this.setState({errorMessage: "Input should not contain numbers or symbols"})
				return false;
			}
		}
		return true;
	}

	render(){
		//Defining constants
		const searchBy = this.props.searchBy;
		const errorMessage = this.state.errorMessage;

		//Return different components depending on the constants above. 
		return(
			<div>
				<form className="searchForm" onSubmit = {this.handleSubmit}>
			 	  	<h4>Search By {searchBy}</h4>
		       	<input type="text" name="search" placeholder={"Enter a " + searchBy} onChange = {this.handleChange}/>
		       	<p>{errorMessage}</p>
		   			<button type="submit"><IoIosSearch/></button>
		    </form>
		   	 
	    </div>
		)
	}
}

export default Select;