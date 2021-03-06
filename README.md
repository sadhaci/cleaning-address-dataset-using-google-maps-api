# cleaning address dataset using google maps api
A single-page app to clean up address dataset and find nearby places google by using Google Maps API.

## Prerequisites & What you Learn
* Basic knowledge of HTML, CSS, and JavaScript
* API Key Google Maps (Geocoding API, Maps Javascript API, Nearby Search, Places Details)
* HTML5 Web Storage
* Webpack

## Development Tools and Libraries
* [npm package](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Webpack](https://webpack.js.org/guides/getting-started/#using-a-configuration)
* [Babel](https://babeljs.io/setup#installation)
* [jQuery](https://jquery.com/)
* [Bootstrap 4](https://getbootstrap.com/)
* [Google Maps JavaScript API](https://developers.google.com/maps/gmp-get-started)

### Module 1
1. Provide an example of an address CSV dataset
2. Convert address csv data to point coordinates using Geocoding
3. Show the progress bar of the address conversion process
4. Show convert geocoding location result on the Google Map

### Module 2
1. Find places Nearby google maps around the selected location point
2. Showing 60 places results using pageToken
3. Show the places details of the selected point of interest

## Getting Started
* Clone the repo and open the project.
* Run `npm install` to install dependencies.
* Create file di root folder`.env`
* Add parameter `API_KEY` and Add your Google Maps Platform API key.

## Running App
Run `npm run dev` to run the project using webpack-dev-server.

## Future Work
Although the current version of this package adds substantial value, there are other improvements i'd like to implement in the future. The following list is not necessarily exhaustive:
* Reverse Geocoding: allows for coordinate point to be converted to addresses
* Alternate Outputs: CSV, PDF, GeoJSON
* Route Plan: Using Directions API
* Sort nearest location using Distance Matrix
