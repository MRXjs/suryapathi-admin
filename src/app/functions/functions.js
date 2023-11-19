export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let yearsDiff = today.getFullYear() - birthDate.getFullYear();
  const monthsDiff = today.getMonth() - birthDate.getMonth();
  const daysDiff = today.getDate() - birthDate.getDate();

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    yearsDiff--;
  }

  return yearsDiff;
};

export const getOptionsValue = (array, index) => {
  const value = array.map((item, i) => (i === index ? item.value : null));
  return value;
};

export const isOlderThan16 = (birthYear) => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  if (age > 16) {
    return null;
  } else {
    return "ඔබට අවුරුදු 16 වඩා වැඩි විය යුතුයී.";
  }
};

export function dataURItoFile(dataURI, filename) {
  return new Promise((resolve, reject) => {
    // Split the data URI to get the MIME type and data
    const [dataType, data] = dataURI.split(",");

    // Extract the MIME type from the data URI
    const mimeMatch = dataType.match(/:(.*?);/);
    if (!mimeMatch || mimeMatch.length !== 2) {
      console.error("Invalid data URI");
      return null;
    }
    const mime = mimeMatch[1];

    // Convert the base64 data to a Blob
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mime });

    // Create a File object with the Blob
    resolve(new File([blob], filename, { type: mime }));
  });
}
