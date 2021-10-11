import $ from "jquery";

export const createNearby = (latlng, map) => {
    console.log(map);
    map.setZoom(16);
    let servicePlace = new google.maps.places.PlacesService(map);
    servicePlace.nearbySearch({
        location: latlng,
        radius: 5000,
        type: ['restaurant']
    }, callback);

   
};


export const callback = (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
        }
    }
}

export const createMarker = (restaurant) => {
    let placeLoc = restaurant.geometry.location;
    let marker = new google.maps.Marker({
        map: map,
        position: restaurant.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(restaurant.name);
        infoWindow.open(map, this);
    });
}