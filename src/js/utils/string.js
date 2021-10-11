export const addressAsString = ({
    address,
    districts,
    city,
    province,
    postalCode,
  }) => {
    return `${address}, ${districts}, ${city}, ${province} ${postalCode} `;
  }
  
