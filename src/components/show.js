//Imports.
import React, { Component } from 'react';
import lookup from 'country-code-info';
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner'

//Component imports.
import City from "./city.js";


//This class fetches data from api's and displays the result.
class Show extends Component{
	constructor(props){
		super(props);
		//Init states
		this.state = {
			display: "country",
			loading: false,
			cities: null,
			error: null,
			cityPopulation: 0,
			placeName: this.props.searchTerm
		};
	};


	//Function is called before the component renders for the first time.
	//Seperates country search from city search and calls corresponding api function.
	componentDidMount(){
		//Update loading so loading icon appears.
		this.setState({loading: true});
		
		//If user wants to search for a country.
		if(this.props.searchBy === "country"){
			//Lookup country code from searchterm.
			const countryCode = lookup.findCountry({'name': this.state.placeName});
			//Country not found.
			if(!countryCode){
				//Hide loading icon and set error message.
				this.setState({loading: false, error: "The country could not be found"});
			}
			else{
				this.countryApiCall(countryCode.a2, countryCode.name);
			}
		}	
		//If user wants to search for a city.
		else{
			this.cityApiCall();
		}
	}

	//This function update states depending on if 
	// the searchterm is equal to the suggested name or not.
	validateSearch = (searchTerm, suggestion) =>{
		//Check if the searchterm is equal to the suggested name.
		if(searchTerm.toLowerCase() !== suggestion.toLowerCase()){
			//Update display state.
			this.setState({display: "confirm"});
		}
		//Update palceName state.
		this.setState({placeName: suggestion});
	}


	//Function fetches data about the ten most populated
	//cities in a country,
	//sorting by population
	countryApiCall = (countryCode, country) =>{
		const url = "http://api.geonames.org/search?type=json&q=" + country + 
								"&country=" + countryCode + "&orderby=population&featureClass=P&maxRows=3&username=weknowit";
		
		//Fetch data from api.	
		fetch(url)
			//If a response was sent.
			.then(response => {
				//Check for errors.
				if(!response.ok){
					//Show loading icon.
					this.setState({loading: false});	
					//Throw an error.
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => response.json())
			.then(data => {
				//Check if response is empty.
				if(!data.geonames[0]){
					//Hide loading icon and set error message.
					this.setState({error: "The country " + country + "could not be found", loading: false});
				}
				//If response contains data.
				else{
					this.mapData(data.geonames);
					this.validateSearch(this.state.placeName, country);
				}
			})
			//Catch any errors that might have been thrown.
			.catch(error => this.setState({error: error}));		
	}


	//Function fetches data about a city.
	cityApiCall = () => {
		const city = this.state.placeName;
		const url  = "http://api.geonames.org/search?type=json&name_equals=" + city + 
									"&cities=cities15000&featureCode=P&username=weknowit";
		//Fetch data from api.						
		fetch(url)
		//If response.
			.then(response => {
				//Check for errors.
				if(!response.ok){
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => response.json())
			.then(data => {
				
				const foundCity = data.geonames[0];

				//Check if response is empty.
				if(!foundCity){
					//Hide loading icon and set error message.
					this.setState({error: "The city could not be found", loading: false});
				}
				//If response contains data.
				else{
					//Hide loading icon, update city- name and population, display only one city.
					this.setState({
						loading: false,
						cityPopulation: foundCity.population,
						display: "city"
					});
					this.validateSearch(this.state.placeName, foundCity.name);
				}
			})	
			//Catch any errors that might have been thrown.	
			.catch(error => this.setState({error: error}));
	}

	
	//Function loops through a given list and creates a button.
	//for each element in the list.
	mapData = (data) => {
		//Maps every listelemt to a button.
		const listelems = data.map(city => {				
			return (
				<button key={city.name} onClick={(name, population) => this.handleClick(city.name, city.population)}>
					{city.name}
				</button>
			)				
		});
	
		//Add created buttons to the list with cities and hide loading icon.
		this.setState({cities: listelems, loading: false});
	}


	//////////////////////////////////////////////
	//Event functions
	//////////////////////////////////////////////

	//Function is called when a city is clicked in the list of cities
	//after a country search.
	handleClick = (name, population) =>{
		//Change the diplay data to only one city, update city- name and population.
		this.setState({display: "city", placeName: name, cityPopulation: population})
	}



	render(){
			//Defining constants.
			const cities 					=  this.state.cities;
			const isLoading 			=  this.state.loading;
			const display					=  this.state.display;
			const placeName				=  this.state.placeName;
			const cityPopulation	=  <NumberFormat value={this.state.cityPopulation} 
																displayType={'text'} thousandSeparator=" " />
			const error   				=  this.state.error;
			const searchBy				=  this.props.searchBy;
			const searchTerm      =  this.props.searchTerm;
		//Return different components depending on the constants above. 
		return(
			<div className="cityList">
				{isLoading && <Loader />}
				{!error && !isLoading && display === "country" && <div> <h2>{placeName}</h2> {cities} </div>}
				{!error && !isLoading && display === "city" && <City name = {placeName} population = {cityPopulation} />}
				{!error && !isLoading && display === "confirm" && <p>{searchTerm} can not be found. Do you want to search for </p>}
				{!error && !isLoading && display === "confirm" && <button onClick = {() => this.setState({display: searchBy})}>
				{this.state.placeName}</button>}
				{error && <p>{this.state.error}</p>}
			</div>
			
		)
	}
}

export default Show;