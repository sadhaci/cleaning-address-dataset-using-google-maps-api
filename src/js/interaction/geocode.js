import { incrementProgressBar } from "./progress";

import { addressAsString } from "../utils/string";
import { retrieve } from "../utils/storage";

export const geocode = (callback) => {
    // console.log("geocode");
    const rawData = retrieve("data");
    const data = transform(rawData);
  
    let geocoder = new google.maps.Geocoder();
    let increment = (1 / data.length) * 100;

    let promises = [];
    data.forEach((d, i) => {
      // console.log(geocoder);
      // console.log(d);
      promises.push(geocoderPromise(geocoder, d, increment, i));
    });

    Promise.all(promises)
      .then((geocodedData) =>
        callback(
          null,
          geocodedData.filter((d) => d.latLng !== null)
        )
      )
      .catch((err) => callback(err, null));
};

const geocoderPromise = (geocoder, object, increment, seconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {      
        /* digunakan untuk geocode objek dari google maps api */
        geocoder.geocode({ address: object.addressString }, (results, status) => { 
          let o = Object.assign({}, object);          
          o.latLng = null;
  
          if (status === google.maps.GeocoderStatus.OK)
            o.latLng =
              results && results.length > 0 ? results[0].geometry.location : null;

          incrementProgressBar(increment);
          return resolve(o);
        });
      }, seconds * 1000);
    });
  };

const transform = (rawData) => {
    const config = retrieve("config");

    const geocodingFields = config.fields.geocoding;
    // const dataFields = config.fields.data;
  
    return rawData.map((d) => {
      let addressObject = {
        address: d[geocodingFields.address],
        districts: d[geocodingFields.districts],
        city: d[geocodingFields.city],
        province: d[geocodingFields.province],
        postalCode: d[geocodingFields.postalCode],
      };

      let addressString = addressAsString(addressObject);
  
      // let data = {};
      // console.log(dataFields);
      // dataFields.forEach((f) => (data[f] = d[f]));
  
      // console.log(data);

      return {
        addressObject,
        addressString,
        // data,
      };
    });
  };
  