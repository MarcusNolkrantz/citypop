//Imports
import React, { Component } from 'react';
import City from "./city.js";
import lookup from 'country-code-info';

class Show extends Component{
	constructor(props){
		super(props);
		this.state = {
			display: "list",
			loading: false,
			cities: null,
			error: null,
			cityName: "",
			cityPopulation: 0
		};
	}



	//Function is called before the component renders for the first time
	componentDidMount(){
		this.setState({loading: true, display: this.props.searchBy});

		if(this.props.searchBy === "country"){
			const countryCode = lookup.findCountry({'name': this.props.searchTerm}, true);
			if(!countryCode){
				this.setState({loading: false});
				this.setState({error: "The country could not be found"});
			}
			else{
				this.CountryApiCall(countryCode.a2);
			}
		}	
		else{
			this.cityApiCall();
		}
	}



	//////////////////////////////////////////////
	//Event functions
	//////////////////////////////////////////////

	// 
	handleClick = (name, population) =>{
		this.setState({display: "city", cityName: name, cityPopulation: population})
	}

	CountryApiCall = (countryCode) =>{
		const country = this.props.searchTerm;
		const url = "http://api.geonames.org/search?type=json&q=" + country + 
								"&country=" + countryCode + "&orderby=population&featureClass=P&maxRows=5&username=weknowit";
		
		//Fetch data from api.	
		fetch(url)
			.then(response => {
				if(!response.ok){
					this.setState({loading: false});	
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => response.json())
			.then(data => this.mapData(data))
			.catch(error => this.setState({error: error}));
				
	}

	cityApiCall = () => {
		const city = this.props.searchTerm;
		const url  = "http://api.geonames.org/search?type=json&name_equals=" + city + 
									"&cities=cities15000&featureCode=P&username=weknowit";

		fetch(url)
			.then(response => {
				if(!response.ok){
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => response.json())
			.then(data => {
				const foundCity = data.geonames[0];
				if(!foundCity){
					this.setState({error: "The city could not be found", loading: false});
				}
				else{
					this.setState({
						loading: false,
						cityName: foundCity.name,
						cityPopulation: foundCity.population,
						display: "city"
					});
				}
			})		
			.catch(error => this.setState({error: error}));
	}

	
	mapData = (data) => {
		const listelems = data.geonames.map(city => {
 							
			return (
				<button key={city.name} onClick={(name, population) => this.handleClick(city.name, city.population)}>
					{city.name}
				</button>
				)				
			});

			this.setState({cities: listelems, loading: false});
	}



	
	


	render(){
			const cities 					=  this.state.cities;
			const isLoading 			=  this.state.loading;
			const display					=  this.state.display;
			const cityName				=  this.state.cityName;
			const cityPopulation	=  this.state.cityPopulation;
			const searchBy				=  this.props.searchBy;
			const searchTerm			=  this.props.searchTerm;


		
		return(
			<div>
				{isLoading && <p>Loading...</p>}
				{!this.state.error && !isLoading && display === "country" && cities}
				{!this.state.error && !isLoading && display === "city" && <City name = {cityName} population = {cityPopulation} />}
				{this.state.error && <p>{this.state.error}</p>}
		
			</div>
			
		)
	}
}


export default Show;