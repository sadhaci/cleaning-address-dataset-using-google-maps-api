import $ from "jquery";

import { store, retrieve } from "../utils/storage";

export const populateGeocodingFields = () => {
    const fields = retrieve("fields");
  
    store("config", {
      fields: {
        geocoding: {
          address: fields[0],
          districts: fields[1],
          city: fields[2],
          province: fields[3],
          postalCode: fields[4],
        },
        data: []
      },
    });
};

export const setGeocodingField = (name, fieldName) => {
    let config = retrieve("config");
    config.fields.geocoding[name] = fieldName;
    store("config", config);
  };


export const populateDataFields = () => {
    const fields = retrieve("fields");
    const config = retrieve("config");
  
    let dataFields = [...fields];
    let geocodingFields = Object.values(config.fields.geocoding);
    
    geocodingFields.forEach((v) => {
      let index = dataFields.findIndex((f) => f === v);
      if (index !== -1) dataFields.splice(index, 1);
    });
  
    config.fields.data = dataFields;
    store("config", config);
  };

export const setFieldsDisabled = (disabled) => {
    $("#importReturnButton").prop("disabled", disabled);
    $("#importButton").prop("disabled", disabled);
};