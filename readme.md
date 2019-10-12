# CityPop

Citypop is a react application that shows the population of a given city or the top three cities of a given country.

## Description

The application provides a interface were you can choose to search by city or by country. If you want to search by city
the application will fetch data from a API, depending on the search term. If the search term and the name of the city returned from the API is the same, the city name and population will display on the screen. Otherwise the application will ask you to search for the returned city instead.

If you want to search by country the application will lookup the country code and the country name from a lookup table. The lookup table does not look for a perfect match of the search term and will return the name of the country even if misspelled. If the returned country and the search term is not equal, the application will ask you to search for the returned country instead. It then fetches data from a API and displays a list of the three most populated city, sorted to population. The list elements are clickable and shows the population for that city when clicked.

In the buttom section of the screen there is a "new search" button that appears when you have started a search.

## Installation

1. Make sure that NPM is installed on your machine. Otherwise you can download it [here](https://www.npmjs.com/get-npm).
2. If you are on a Windows machine make sure git is installed otherwise you can download it [here](https://gitforwindows.org/).
3. Clone this repository, by ssh or http, by clicking the "clone" button in the top right corner of this page and copy the URL. 
4. Open the terminal (git bash on windows) and navigate to the desired project location.
5. Enter this command to clone the project to your machine.

```bash
git clone copied_project_URL
```

6. A new folder will be created with the name of the project. Navigate into it.
7. Run this command to install necessary dependencies.

```bash
npm install
```

8. The project is now setup on your machine. Run this command to start the server on port 3000.

```bash
npm start
```

## Code style
The application does not use routes to toogle between components. Instead a parent component handles that by setting a state and by using conditional rendering it renders different child components depending on the state. To send information from a child component to a parent component a function that update states is declared in the parent and is sent to the child as a prop.