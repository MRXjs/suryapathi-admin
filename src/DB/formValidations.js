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
      yearMessage: "උපන් අවුරුද්ද ඇතුලත් කල යුතුයී.",
      monthMessage: "උපන් මාසය ඇතුලත් කල යුතුයී.",
      dayMessage: "උපන් දවස ඇතුලත් කල යුතුයී.",
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
  birthTime: {
    required: {
      HourMessage: "උපන් පැය  ඇතුලත්කල යුතුයී.",
      MinuteMessage: "උපන් විනාඩිය ඇතුලත්කල යුතුයී.",
    },
  },
  email: {
    required: { message: "ඔබේ විද්‍යුත් තැපැල් ලිපිනය ඇතුළත් කළ යුතුය." },
  },
  videoTitle: {
    required: { message: "වීඩියෝවේ මාතෘකාව ඇතුළත් කරන්න." },
  },
  videoURL: {
    required: { message: "වීඩියෝවේ URL එක ඇතුළත් කරන්න." },
    pattern: {
      stringPattern:
        /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/,
      message: "වලංගු URL එකක් නොවේ.",
    },
  },
};
