export const addressAsString = ({
    address,
    districts,
    city,
    province,
    postalCode,
  }) => {
    return `${address}, ${districts}, ${city}, ${province}, ${postalCode} `;
  };
  
//   export const jsonAsText = (json) => {
//     let text = JSON.stringify(json, null, 1);
//     text = text.replace("\n", "");
//     text = text.replace("\r", "");
//     return text;
//   };
  