//Imports
import React, { Component } from 'react'
import './App.css';

//Component imports
import Select from "./components/select.js";
import Search from "./components/search.js";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "select",
			searchBy: ""
		};
	}


	//////////////////////////////////////////////
	//Event functions
	//////////////////////////////////////////////

	//Update searchBy state, country or city
	//change page state to search
	buttonHandler = (type) => {
		this.setState({searchBy: type, page: "search"});
	}

	//Update searchTerm state to users input
	//change page state to show
	submitHandler = (searchTerm) => {
		this.setState({searchTerm: searchTerm, page: "show"});
	}


	


	render() {
		return (
			<div>
				<h1>CityPop</h1>  
				{this.state.page === "select" && <Select buttonHandler = {this.buttonHandler}/>}
				{this.state.page === "search" && <Search submitHandler = {this.submitHandler} searchBy = {this.state.searchBy}/>}
			</div>
		)
	}
}

export default App