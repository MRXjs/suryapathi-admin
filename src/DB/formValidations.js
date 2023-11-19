export const formValidations = {
  avatar: { required: { message: "ඡායාරූපයක් අවශ්ය වේ" } },
  name: {
    required: { message: "නම ඇතුලත් කල යුතුයී." },
    pattern: {
      stringPattern: /^\S*$/,
      message: "නම හිස්තැන් නොමැතිව ඇතුලත් කරන්න.",
    },
  },
  birthDay: {
    required: {
      yearMessage: "උපන් දිනය ඇතුලත් කල යුතුයී.",
      monthMessage: "උපන් දිනය ඇතුලත් කල යුතුයී.",
      dayMessage: "උපන් දිනය ඇතුලත් කල යුතුයී.",
    },
  },
  heightFeet: { required: { message: "උස ඇතුලත් කල යුතුයි." } },
  nicNo: {
    required: { message: "හැදුනුම්පත් අංකය ඇතුලත් කල යුතුයී." },
    pattern: {
      stringPattern: /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/,
      message: "‌වලංගු නොවන හැදුනුම්පත් අංකයක්.",
    },
  },
  phoneNo: {
    required: { message: "දුරකතන අංකය ඇතුලත් කල යුතුයී." },
    pattern: {
      stringPattern: /^(?:7|0|(?:\+94))[0-9]{9,10}$/,
      message: "‌වලංගු නොවන දුරකතන අංකයක්.",
    },
  },
  address: { required: { message: "ලිපිනය ඇතුලත් කල යුතුයී." } },
  birthTime: { required: { message: "උපන් වේලාව ඇතුලත්කල යුතුයී." } },
  email: {
    required: { message: "ඔබේ විද්‍යුත් තැපැල් ලිපිනය ඇතුළත් කළ යුතුය." },
  },
};
