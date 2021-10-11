import $ from "jquery";

import { retrieve, store } from "../utils/storage";

let map; 
let infoWindow = new google.maps.InfoWindow();

export const createMap = () => {
    const data = retrieve("data");
    
    let mapOptions = {
      mapTypeControl: false,
      rotateControl: false,
      zoom: 11,
    };
    
    let markers = [];
    let bounds = new google.maps.LatLngBounds();
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    data.forEach((d, i) => {
        let m = new google.maps.Marker({
          map: map,
          title: d.addressString,
          position: d.latLng,
          icon: 'https://storage.googleapis.com/terra_web/images/marker_50.png'
        });
  
      m.addListener("mouseover", () => {
        $("#locationPre").text(JSON.stringify(d.addressObject, null, 2));
        $("#dataPre").text(JSON.stringify(d.addressObject, null, 2));
        $("#dataPre").text(JSON.stringify(d.latLng, null, 2));
      });

      m.addListener("mouseout", () => {
        $("#locationPre").text("No location to show.");
        $("#dataPre").text("No data to show.");
      });

      
      m.addListener("click", () => {
        let latlng = d.latLng;        
        createNearby(latlng);
      });
  
      markers.push(m);
      bounds.extend(d.latLng);
    });
    map.fitBounds(bounds);
    return map;
  };


export const createNearby = (latlng) => {
    let servicePlace = new google.maps.places.PlacesService(map);
    map.setCenter(latlng);
    map.setZoom(15);
    servicePlace.nearbySearch({
        location: latlng,
        radius: 5000,
        // type: ['restaurant']
    }, callback);

    
    var circleOption = {
      center: latlng,
      fillColor: '#3878c7',
      fillOpacity: 0.2,
      map: map,
      radius: 5000,
      strokeColor: '#3878c7',
      strokeOpacity: 1,
      strokeWeight: 0.5
    };
    var circle = new google.maps.Circle(circleOption);
};


export const callback = (results, status, pagination) => {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    return;
  } else {
    createMarkers(results);

    if (pagination.hasNextPage) {
      let moreButton = document.getElementById('more');

      moreButton.disabled = false;

      moreButton.addEventListener('click', function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }
  }
}

export const createMarkers = (places) => {
  console.log(places);
  let bounds = new google.maps.LatLngBounds();
  let placesList = document.getElementById('places');

  for (let i = 0, place; place = places[i]; i++) {

    const icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    let poi = new google.maps.Marker({
      map: map,
      title: place.name,
      position: place.geometry.location,
      icon: icon
    });

    placesList.innerHTML += '<li>' + place.name + '</li>';

    bounds.extend(place.geometry.location);

    const contentString = '<b>name: </b>' + place.name + '</br>' +
    '<b>business_status: </b>' + place.business_status + '</br>' +
    '<b>place_id: </b>' + place.place_id + '</br>' +
    '<b>types: </b>' + place.types + '</br>' +
    '<b>rating: </b>' + place.rating + '</br>' +
    '';
    
    google.maps.event.addListener(poi, 'click', function() {
      infoWindow.setContent(contentString);
      infoWindow.open(map, this);
    });
  }
  map.fitBounds(bounds);
}