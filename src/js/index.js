import $ from 'jquery';

import "bootstrap/dist/css/bootstrap.min.css";
import "../js/style.css";

import { store } from "./utils/storage";

import {
    goToImportSection,
    goToRouteSection,
  } from "../js/interaction/navigation";

import {
    handleCsvFileChange,
} from "../js/interaction/import";

import {
  populateGeocodingFields,
  populateDataFields,
  setGeocodingField,
  setFieldsDisabled,
} from "../js/interaction/fields";
  
import { geocode } from "../js/interaction/geocode";

import {
  createMap,
} from "../js/interaction/map";

$(() =>{
    $("#getStartedButton").click(() => {
        goToImportSection();
        $("#importButton").prop("disabled", true);
      });

      /*
   * Import Section
   */
  $("#csvFileInput").change((e) => {
    handleCsvFileChange(e.target.files, (err, filename, contents) => {
      if (err) return $("#csvFileLabel").text(err);

      store("data", contents.data);
      store("fields", contents.fields);

      $("#importButton").prop("disabled", false);

      $("#fileSummarySpan").html(
        `<b>${contents.data.length}</b> rows from <b>${filename}</b>`
      );
    });
  });

  /*
  proses import file csv
  */
  $("#importButton").click(() => {
    setFieldsDisabled(true);

    $("#csvFileInput").prop("disabled", true);
    $("#importButton").prop("disabled", false);

    const isCsv = $("#csvFileInput").val() ? true : false;

    if (isCsv) {
      // console.log("masuk");
      populateGeocodingFields();

      setGeocodingField($(this).attr("name"), $(this).val());

      populateDataFields();
      // ------------------------------------
      store("progress", 0);

      geocode((err, geocodedData) => {
        if (err || !geocodedData) return;

        store("data", geocodedData);
        createMap();
        goToRouteSection();
      });
    } 
    else {
        alert("Choose file, please!!!");
    }
  });
})
