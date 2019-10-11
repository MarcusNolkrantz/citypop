//Imports.
import React, { Component } from 'react'
import './App.css';


//Component imports.
import Select from "./components/select.js";
import Search from "./components/search.js";
import Show 	from "./components/show.js";

//This class is the main component.
//Here is logic for switching between components defined.
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "select",
			searchBy: "",
			searchTerm: ""	
		};
	}


	//////////////////////////////////////////////
	//Event functions.
	//////////////////////////////////////////////
 	
 	//This function is called when a "select country or city" button is pressed.
	buttonHandler = (type) => {
		//Set searchBy to what user wants to search for and display search component.
		this.setState({searchBy: type, page: "search"});
	}

	//This function is called when the search icon is clicked.
	submitHandler = (searchTerm) => {
		//Set searchBy to users input and display show component. 
		this.setState({searchTerm: searchTerm, page: "show"});
		
	}

	//This function is called when user wants to make a new search.
	//Reset states to default values.
	reset = () =>{
		this.setState({
			searchTerm: "",
			searchBy: "",
			page: "select"
		});
	}

	
	render() {
		//Defining constants.
		const page 			= this.state.page;
		const searchBy 		= this.state.searchBy;
		const searchTerm 	= this.state.searchTerm;

		//Return different components depending on the constants above. 
		return (
			<div>
				<h1>CityPop</h1>  
				{page === "select" && <Select buttonHandler = {this.buttonHandler} />}
				{page === "search" && <Search submitHandler = {this.submitHandler} searchBy = {searchBy} />}
				{page === "show"   && <Show searchTerm = {searchTerm} searchBy = {searchBy} />}
				{page !== "select"  && <button onClick = {this.reset}>New search</button>}
			</div>
		)
	}
}

export default App