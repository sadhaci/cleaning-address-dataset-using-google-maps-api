// import $ from "jquery";

import { parseCsv } from "../utils/file";

/*
 * callback(err, filename, contents)
 */
export const handleCsvFileChange = (files, callback) => {
    if (files.length < 1) 
      return callback("Choose CSV file...", null, null);
  
    const file = files[0];
  
    if (file.type !== "text/csv" && !file.name.includes(".csv"))
      return callback("Invalid file type, must be a CSV file.", null, null);
  
    let fileReader = new FileReader();
    fileReader.onload = (e) =>
      callback(null, file.name, parseCsv(e.target.result));
    fileReader.onerror = (err) => callback(err, null, null);
    fileReader.readAsText(file);
  };