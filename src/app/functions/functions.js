import { AstrologyServices } from "@/DB/astrologyService";
import { toastError } from "./toast";

import {
  castes,
  districts,
  gender,
  maritalStatus,
  monthlyIncomes,
  nations,
  professions,
  religions,
} from "@/DB/selecterOptions";

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
  if (array[index]) {
    return array[index].value;
  }
  return null;
};

export const getAstrologyServicesValue = (id) => {
  const service = AstrologyServices.map((item) =>
    item.id == id ? item.title : ""
  );
  return service;
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

export const addLeadingZero = (number) => {
  return number < 10 ? "0" + number : number.toString();
};

export const copyToClipboard = (text) => {
  return new Promise((resolve, reject) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const downloadImage = (url, filename) => {
  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    toastError(error);
  }
};

export const removeCountryCode = (inputString) => {
  const stringWithoutZero = inputString.replace(/0/g, "");
  const stringWithoutPlus94 = stringWithoutZero.replace(/\+94/g, "");
  return stringWithoutPlus94;
};

export async function imageUrlToFile(imageUrl, fileName = "image.jpg") {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error("Error converting image URL to file:", error);
    return null;
  }
}

export function convertTo12HourFormat(time24) {
  if (time24) {
    // Split the time string into hours and minutes
    var [hours, minutes] = time24.split(":");

    // Convert hours to a number
    hours = parseInt(hours, 10);

    // Determine AM or PM
    var period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Format minutes to include leading zero if necessary
    minutes = parseInt(minutes, 10) < 10 ? "0" + minutes : minutes;

    // Construct the 12-hour time format
    var time12 = hours + ":" + minutes + " " + period;
    return time12;
  } else {
    return "Time not entered";
  }
}

export function extractVideoId(link) {
  if (link.includes("youtu.be")) {
    return link.split("/").pop();
  } else if (link.includes("youtube.com")) {
    return link.split("?v=")[1].split("&")[0];
  } else {
    return null;
  }
}

export const createProposalReqMsg = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      let text = "";
      data.forEach((member) => {
        text += `
        නම : ${member.full_name}
        උපන් දිනය : ${member.birthday}
        වයස : ${calculateAge(member.birthday)}
        ස්ත්‍රී/පුරුෂ බාවය : ${getOptionsValue(gender, member.gender)}
        උස : අඩි ${member.feet} අඟල් ${member.inches}
        විවාහක තත්ත්වය : ${getOptionsValue(
          maritalStatus,
          member.married_status
        )}
        ජාතිය : ${getOptionsValue(nations, member.nation)}
        ආගම : ${getOptionsValue(religions, member.religion)}
        කුලය : ${getOptionsValue(castes, member.caste)}
        රැකියාව : ${getOptionsValue(professions, member.job)}
        මාසික ආදායම : ${getOptionsValue(monthlyIncomes, member.salary)}
        දිස්ත්‍රීකය : ${getOptionsValue(districts, member.district)}
        ලිපිනය : ${member.address}
        දුරකථන අංකය : ${member.phone}
        පින්තුර: ${member.profile_image_url}
        
        `;
      });
      resolve(text);
    } catch (error) {
      reject(error);
    }
  });
};

export function formatDateTime(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-indexed
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  return {
    formattedDate,
    formattedTime,
  };
}

export function convertTo12HourFormatWithoutSeconds(time24) {
  // Split the time into hours, minutes, and seconds
  const [hours24, minutes] = time24.split(":").map(Number);

  // Convert hours to 12-hour format
  let hours12 = hours24 % 12 || 12; // Handle midnight (0) as 12

  // Determine if it's AM or PM
  const period = hours24 < 12 ? "AM" : "PM";

  // Format the time in 12-hour format without seconds
  const time12 = `${hours12 < 10 ? "0" + hours12 : hours12}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${period}`;

  return time12;
}
