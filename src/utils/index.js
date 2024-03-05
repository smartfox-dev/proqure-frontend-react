import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export const jsonRequestFormat = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const isEmpty = (value) => {
  if (value === undefined || value === null) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "string") return value.trim().length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

export const emoticonArray = ["💬","📨","💌","🗨️" ,"🗨️","🧖", "🗯️" ,"📟", "👩‍🍳", "📢", "📱", "👌", "🍞", "📮", "💬","📨","💌","🗨️" ,"🗨️","🧖", "🗯️" ,"📟", "👩‍🍳", "📢", "📱", "👌", "🍞", "📮",];
  
export const addDotToNumber = (value) => {
  const formattedNumber = value.toLocaleString("en-US");
  return formattedNumber;
};
export const diffWeekFromDays = (date) => {
  const predate = new Date(date);
  const curdate = new Date();
  const diffInMilliseconds = Math.abs(curdate - predate);
  const diffDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  if (diffDays < 7) {
    return "this week";
  } else {
    return parseInt(diffDays / 7) + " weeks ago";
  }
};

export const isNumber = (letter) => {
  return !isNaN(parseInt(letter));
};

export const isValidEmail = (email) => {
  if (email) {
    // Use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  } else {
    return true;
  }
};

export const setLogOut = async () => {
  window.localStorage.setItem("token", "");
};

export const shuffleArray = (array) => {
  array = Object.assign([], array); // Create a new copy of the array
  Object.preventExtensions(array); // Make the array extensible
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateRandomNumbers = (n, count) => {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * n) + 1;
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
};

export const localStorageUserInfo = () => {
  let user_id = window.localStorage.getItem("user_id");
  let user_name = window.localStorage.getItem("user_name");
  let user_email = window.localStorage.getItem("user_email");
  let token = window.localStorage.getItem("token");
  let localUserInfo = {
    user_id: user_id,
    user_name: user_name,
    user_email: user_email,
    token: token,
  };
  return localUserInfo;
};

export const getDealOfTime = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const checkItemInList = (array, item) => {
  return array.includes(item);
}

export const getDateTimeFormat = () => {
  let date = new Date();
  let formattedDate = moment(date).format("YYYY-MM-DD");
  let formattedTime = moment(date).format("HH:mm:ss");
  return formattedDate + " " + formattedTime;
};
export const updateDateTimeFormat = (date) => {
  let formattedDate = moment(date).format("YYYY-MM-DD");
  let formattedTime = moment(date).format("HH:mm:ss");
  return formattedDate + " " + formattedTime;
};

export const getDateFormat = (date) => {
  let formattedDate = moment(date).format("YYYY-MM-DD");
  return formattedDate;
};

export const getQuerySelector = (selector, root = document) => {
  return root.querySelector(selector);
};

export const formatDate = (date) => {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
};

export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const makeStandardString = (chunkString) => {
  // Capitalize the first letter of the chunk string
  let standardString =
    chunkString.charAt(0).toUpperCase() + chunkString.slice(1);
  // Remove any leading or trailing whitespace
  standardString = standardString.trim();
  return standardString;
};

export const getChangeLanguage = (params) => {
  // menu language
  let speechLanguage = "";
  let back_language = "",
    back_only_language = "";
  let purchasing_question = "";
  let noUnderstand = "";
  let headerLetter = "",
    submanheaderLetter,
    subbotheaderLetter = "",
    subcontentLetter = "",
    inputPlaceHolder = "";
  //second select
  let sec_content, sec_select1, sec_select2, sec_select3;
  // third select
  let third_content1, third_content2;
  // four select
  let four_content1, four_content2, four_content3, four_content4;
  // five select
  let five_detail1,
    five_detail2,
    five_detail3,
    five_content1,
    five_content2,
    five_content3,
    five_button,
    five_content4,
    five_content5,
    five_content6;
  // six select
  let six_content1,
    six_content2,
    six_content3,
    six_content4,
    six_button1,
    six_button2;
  // seven select
  let seven_content1;

  // faqs start
  let thirdfaqs_content1;

  // about proqure
  let thirdabout_content1;
  if (params === "Yoruba") {
    speechLanguage = "yo-NG";
    noUnderstand =
      "Emi ko le loye ohun rẹ. Jọwọ lọ si FAQs tabi gbiyanju lẹẹkansi.😟";
    purchasing_question =
      "Ti o ba ni ibeere eyikeyi nipa rira, tẹ bẹẹni, bibẹẹkọ tẹ rara.👨‍💻";
    back_language = "pada si akojọ aṣayan";
    back_only_language = "Pada";
    headerLetter = "Atilẹyin";
    submanheaderLetter = "Iwọ";
    subbotheaderLetter = "ChatBot";
    subcontentLetter = "Kaabo, kaabọ si Proqure😎 Jọwọ yan ede kan?";
    inputPlaceHolder = "Tẹ ifiranṣẹ rẹ sii ...";

    //second select
    sec_content =
      "E seun. “Grace” ni oruko mi. bawo ni mo se le ran yin l’owo l’oni?";
    sec_select1 = "Oja";
    sec_select2 = "Awon ibeere ti o w’opo";
    sec_select3 = "Nipa Proqure";
    //third select
    third_content1 = "A ni ";
    third_content2 = "Ewo ni e fe nibe?";
    //four select
    four_content1 = "A ni ";
    four_content2 = " Ewo ni e fe ri ninu won?";
    four_content3 = "Mo fe ri ";
    four_content4 = `apẹẹrẹ:👀Lati ri [Mama Gold],🗣️sọ [Mo fẹ ri Mama Gold] tabi 🖱️ tẹ bọtini naa`;
    // five select
    five_detail1 = "Titel";
    five_detail2 = "Prys";
    five_detail3 = "Beskikbaar";
    five_content1 = "Se e fe ra ";
    five_content2 = "?";
    five_content3 = "Se e fe ra Mama Gold? Ti ba je “bee ni”, melo ni e fe ra?";
    five_button = "Ra";
    five_content4 = "Mo fe ra baagi ";
    five_content5 = " ti ";
    five_content6 = `apẹẹrẹ:🛒Lati ra [Mama Gold],🗣️sọ [Ek wil 2 sakke Mama Gold koop.] tabi 🖱️ tẹ bọtini naa`;
    // six selelect
    six_content1 = "O dara. E fe ra apo meji ";
    six_content2 = "";
    six_content3 = "Gbogbo owo oja yin je ₦";
    six_content4 = "Nje e gba lati ra oja yi?";
    six_button1 = "Beeni";
    six_button2 = "Ja";
    // seven select
    seven_content1 =
      "Ibere re ti wa ni ifijišẹ. Jọwọ duro fun ìmúdájú ti ibere re.😁";
    // Faqs Start
    // third faqs
    thirdfaqs_content1 = `Kaabo! A ti ṣe akojọpọ atokọ ti awọn ibeere igbagbogbo fun irọrun rẹ. Wo isalẹ ki o wa awọn idahun si awọn ibeere ti o wọpọ julọ. Ti o ba ni awọn ibeere afikun tabi nilo iranlọwọ siwaju, jọwọ ma ṣe ṣiyemeji lati kan si wa. A wa nibi lati ṣe iranlọwọ ati pese iriri ti o dara julọ ti o ṣeeṣe. Kan si wa nigbakugba, ati pe inu wa yoo dun lati ran ọ lọwọ!🧑‍💻👈`;

    // About Proqure Start
    // third proqure
    thirdabout_content1 = `Proqure jẹ ẹya aaye ọja Proqure ti n pese awọn alabara aṣayan lati yan ọpọlọpọ awọn aṣayan isanwo ti a pese nipasẹ awọn alabaṣiṣẹpọ olupese iṣẹ isanwo ti Proqure ti iwe-aṣẹ.
    Nigbati o ba forukọsilẹ pẹlu wa, o kan nilo nọmba alagbeka rẹ ati adirẹsi imeeli lati bẹrẹ. Nẹtiwọọki wa yoo jẹ ki o ṣe awọn rira lori ayelujara lailewu laisi ṣiṣafihan awọn alaye isanwo rẹ. Gbogbo data rẹ ati awọn iṣowo wa ni aabo 100% nipasẹ ẹgbẹ ti o ni iriri ti o lodi si jegudujera, ati awọn igbese aabo wa faramọ aabo ati awọn iṣedede aabo ti o ga julọ.
    A tun ṣẹda Proqure fun awọn iṣowo, nfunni awọn aṣayan isanwo rọ si awọn alabara rẹ lati mu idagbasoke dagba. Awọn ikanni isanwo ti agbegbe Naijiria, pẹlu kaadi kirẹditi/debiti ati Debit Taara fun awọn olumulo Banki Intanẹẹti, wa mejeeji lori awọn ẹrọ alagbeka ati ori ayelujara lati jẹ ki o pese iriri isanwo ailopin. A ngbiyanju lati pade awọn iwulo iṣowo ojoojumọ rẹ pẹlu awọn ero idiyele ati ifarada, ilana isọpọ ọkan ti o rọrun ati awọn isanwo ojoojumọ, nitorinaa o le dojukọ ohun ti o ṣe pataki.`;
  } else if (params === "Lbo") {
    speechLanguage = "yo-NG";
    noUnderstand =
      "Emi ko le loye ohun rẹ. Jọwọ lọ si FAQs tabi gbiyanju lẹẹkansi.😟";
    noUnderstand = "Emi ko le loye ohun rẹ. Jọwọ gbiyanju lẹẹkansi nigbamii.😟";
    purchasing_question =
      "Ti o ba ni ibeere eyikeyi nipa rira, tẹ bẹẹni, bibẹẹkọ tẹ rara.👨‍💻";
    back_language = "pada si akojọ aṣayan";
    back_only_language = "Pada";
    headerLetter = "Taimako";
    submanheaderLetter = "Vos";
    subbotheaderLetter = "ChatBot";
    subcontentLetter = "Salve, salve Proqure😎 Quaeso eligere linguam?";
    inputPlaceHolder = "Typus nuntium tuum.";

    //second select
    sec_content =
      "E seun. “Grace” ni oruko mi. bawo ni mo se le ran yin l’owo l’oni?";
    sec_select1 = "Oja";
    sec_select2 = "Awon ibeere ti o w’opo";
    sec_select3 = "Nipa Proqure";
    //third select
    third_content1 = "A ni ";
    third_content2 = "Ewo ni e fe nibe?";
    //four select
    four_content1 = "A ni ";
    four_content2 = " Ewo ni e fe ri ninu won?";
    four_content3 = "Mo fe ri ";
    four_content4 = `Example:👀Lati ri [Mama Gold],🗣️sọ [Mo fẹ ri Mama Gold] tabi 🖱️ tẹ bọtini naa`;
    // five select
    five_detail1 = "Titel";
    five_detail2 = "Prys";
    five_detail3 = "Beskikbaar";
    five_content1 = "Se e fe ra ";
    five_content2 = "?";
    five_content3 = "Se e fe ra Mama Gold? Ti ba je “bee ni”, melo ni e fe ra?";
    five_button = "Ra";
    five_content4 = "Mo fe ra baagi ";
    five_content5 = " ti ";
    five_content6 = `Example:🛒Lati ra [Mama Gold],🗣️sọ [Ek wil 2 sakke Mama Gold koop.] tabi 🖱️ tẹ bọtini naa`;
    // six selelect
    six_content1 = "O dara. E fe ra apo meji ";
    six_content2 = "";
    six_content3 = "Gbogbo owo oja yin je ₦";
    six_content4 = "Nje e gba lati ra oja yi?";
    six_button1 = "Beeni";
    six_button2 = "Ja";

    // seven select
    seven_content1 =
      "Ibere re ti wa ni ifijišẹ. Jọwọ duro fun ìmúdájú ti ibere re.😁";
    // Faqs Start
    // third faqs
    thirdfaqs_content1 = `Kaabo! A ti ṣe akojọpọ atokọ ti awọn ibeere igbagbogbo fun irọrun rẹ. Wo isalẹ ki o wa awọn idahun si awọn ibeere ti o wọpọ julọ. Ti o ba ni awọn ibeere afikun tabi nilo iranlọwọ siwaju, jọwọ ma ṣe ṣiyemeji lati kan si wa. A wa nibi lati ṣe iranlọwọ ati pese iriri ti o dara julọ ti o ṣeeṣe. Kan si wa nigbakugba, ati pe inu wa yoo dun lati ran ọ lọwọ!🧑‍💻👈`;

    // About Proqure Start
    // third proqure
    thirdabout_content1 = `Proqure jẹ ẹya aaye ọja Proqure ti n pese awọn alabara aṣayan lati yan ọpọlọpọ awọn aṣayan isanwo ti a pese nipasẹ awọn alabaṣiṣẹpọ olupese iṣẹ isanwo ti Proqure ti iwe-aṣẹ.
    Nigbati o ba forukọsilẹ pẹlu wa, o kan nilo nọmba alagbeka rẹ ati adirẹsi imeeli lati bẹrẹ. Nẹtiwọọki wa yoo jẹ ki o ṣe awọn rira lori ayelujara lailewu laisi ṣiṣafihan awọn alaye isanwo rẹ. Gbogbo data rẹ ati awọn iṣowo wa ni aabo 100% nipasẹ ẹgbẹ ti o ni iriri ti o lodi si jegudujera, ati awọn igbese aabo wa faramọ aabo ati awọn iṣedede aabo ti o ga julọ.
    A tun ṣẹda Proqure fun awọn iṣowo, nfunni awọn aṣayan isanwo rọ si awọn alabara rẹ lati mu idagbasoke dagba. Awọn ikanni isanwo ti agbegbe Naijiria, pẹlu kaadi kirẹditi/debiti ati Debit Taara fun awọn olumulo Banki Intanẹẹti, wa mejeeji lori awọn ẹrọ alagbeka ati ori ayelujara lati jẹ ki o pese iriri isanwo ailopin. A ngbiyanju lati pade awọn iwulo iṣowo ojoojumọ rẹ pẹlu awọn ero idiyele ati ifarada, ilana isọpọ ọkan ti o rọrun ati awọn isanwo ojoojumọ, nitorinaa o le dojukọ ohun ti o ṣe pataki.`;
  } else if (params === "Hausa") {
    speechLanguage = "ha-NG";
    noUnderstand =
      "Emi ko le loye ohun rẹ. Jọwọ lọ si FAQs tabi gbiyanju lẹẹkansi.😟";
    noUnderstand = "Emi ko le loye ohun rẹ. Jọwọ gbiyanju lẹẹkansi nigbamii.😟";
    purchasing_question =
      "Ti o ba ni ibeere eyikeyi nipa rira, tẹ bẹẹni, bibẹẹkọ tẹ rara.👨‍💻";
    back_language = "pada si akojọ aṣayan";
    back_only_language = "Pada";
    headerLetter = "Taimako";
    submanheaderLetter = "Kai";
    subbotheaderLetter = "ChatBot";
    subcontentLetter =
      "Sannu, barka da zuwa Proqure😎 Da fatan za a zaɓi harshe?";
    inputPlaceHolder = "Buga sakon ku...";

    //second select
    sec_content =
      "E seun. “Grace” ni oruko mi. bawo ni mo se le ran yin l’owo l’oni?";
    sec_select1 = "Oja";
    sec_select2 = "Awon ibeere ti o w’opo";
    sec_select3 = "Nipa Proqure";
    //third select
    third_content1 = "A ni ";
    third_content2 = "Ewo ni e fe nibe?";
    //four select
    four_content1 = "A ni ";
    four_content2 = " Ewo ni e fe ri ninu won?";
    four_content3 = "Mo fe ri ";
    four_content4 = `Example:👀Lati ri [Mama Gold],🗣️sọ [Mo fẹ ri Mama Gold] tabi 🖱️ tẹ bọtini naa`;
    // five select
    five_detail1 = "Titel";
    five_detail2 = "Prys";
    five_detail3 = "Beskikbaar";
    five_content1 = "Se e fe ra ";
    five_content2 = "?";
    five_content3 = "Se e fe ra Mama Gold? Ti ba je “bee ni”, melo ni e fe ra?";
    five_button = "Ra";
    five_content4 = "Mo fe ra baagi ";
    five_content5 = " ti ";
    five_content6 = `Example:🛒Lati ra [Mama Gold],🗣️sọ [Ek wil 2 sakke Mama Gold koop.] tabi 🖱️ tẹ bọtini naa`;
    // six selelect
    six_content1 = "O dara. E fe ra apo meji ";
    six_content2 = "";
    six_content3 = "Gbogbo owo oja yin je ₦";
    six_content4 = "Nje e gba lati ra oja yi?";
    six_button1 = "Beeni";
    six_button2 = "Ja";
    // seven select
    seven_content1 =
      "Ibere re ti wa ni ifijišẹ. Jọwọ duro fun ìmúdájú ti ibere re.😁";
    // Faqs Start
    // third faqs
    thirdfaqs_content1 = `Kaabo! A ti ṣe akojọpọ atokọ ti awọn ibeere igbagbogbo fun irọrun rẹ. Wo isalẹ ki o wa awọn idahun si awọn ibeere ti o wọpọ julọ. Ti o ba ni awọn ibeere afikun tabi nilo iranlọwọ siwaju, jọwọ ma ṣe ṣiyemeji lati kan si wa. A wa nibi lati ṣe iranlọwọ ati pese iriri ti o dara julọ ti o ṣeeṣe. Kan si wa nigbakugba, ati pe inu wa yoo dun lati ran ọ lọwọ!🧑‍💻👈`;

    // About Proqure Start
    // third proqure
    thirdabout_content1 = `Proqure jẹ ẹya aaye ọja Proqure ti n pese awọn alabara aṣayan lati yan ọpọlọpọ awọn aṣayan isanwo ti a pese nipasẹ awọn alabaṣiṣẹpọ olupese iṣẹ isanwo ti Proqure ti iwe-aṣẹ.
    Nigbati o ba forukọsilẹ pẹlu wa, o kan nilo nọmba alagbeka rẹ ati adirẹsi imeeli lati bẹrẹ. Nẹtiwọọki wa yoo jẹ ki o ṣe awọn rira lori ayelujara lailewu laisi ṣiṣafihan awọn alaye isanwo rẹ. Gbogbo data rẹ ati awọn iṣowo wa ni aabo 100% nipasẹ ẹgbẹ ti o ni iriri ti o lodi si jegudujera, ati awọn igbese aabo wa faramọ aabo ati awọn iṣedede aabo ti o ga julọ.
    A tun ṣẹda Proqure fun awọn iṣowo, nfunni awọn aṣayan isanwo rọ si awọn alabara rẹ lati mu idagbasoke dagba. Awọn ikanni isanwo ti agbegbe Naijiria, pẹlu kaadi kirẹditi/debiti ati Debit Taara fun awọn olumulo Banki Intanẹẹti, wa mejeeji lori awọn ẹrọ alagbeka ati ori ayelujara lati jẹ ki o pese iriri isanwo ailopin. A ngbiyanju lati pade awọn iwulo iṣowo ojoojumọ rẹ pẹlu awọn ero idiyele ati ifarada, ilana isọpọ ọkan ti o rọrun ati awọn isanwo ojoojumọ, nitorinaa o le dojukọ ohun ti o ṣe pataki.`;
  } else if (params === "English") {
    speechLanguage = "en-US";
    noUnderstand =
      "I can't understand your voice. Please go to FAQs or try again.😟";
    purchasing_question =
      "If you have question about purchasing, click yes, otherwise click no.👨‍💻";
    back_language = "Back to menu";
    back_only_language = "Back";
    headerLetter = "Support";
    submanheaderLetter = "You";
    subbotheaderLetter = "ChatBot";
    subcontentLetter = "Hello, welcome to Proqure😎 Please select a language?";
    inputPlaceHolder = "Type your message...";

    //second select
    sec_content = "Thank you, My name is “Grace”. How may I help you today?";
    sec_select1 = "Product";
    sec_select2 = "FAQs";
    sec_select3 = "About Proqure";
    //third select
    third_content1 = "We have ";
    third_content2 = "What do you want?";
    //four select
    four_content1 = "We have ";
    four_content2 = "What do you want see?";
    four_content3 = "I want to see ";
    four_content4 = `Example:👀To see [Mama Gold],🗣️say [I want to see Mama Gold] or 🖱️click the button`;
    // five select
    five_detail1 = "Title";
    five_detail2 = "Price";
    five_detail3 = "Available";
    five_content1 = "Do you want to buy ";
    five_content2 = "?";
    five_content3 = " If yes, how many of them do you want?";
    five_button = "Purchase";
    five_content4 = "I want to buy ";
    five_content5 = "";
    five_content6 = `Example:🛒To buy [Mama Gold],🗣️say [I want to buy 2 bags of Mama Gold] or 🖱️click the button`;
    // six selelect
    six_content1 = "Okay. You want to buy ";
    six_content2 = "";
    six_content3 = "The total price is ₦";
    six_content4 = "Do you agree to buy?";
    six_button1 = "No";
    six_button2 = "Yes";
    // seven select
    seven_content1 =
      "Your order has been successfully delivered. Please wait for confirmation of your order.😁";

    // Faqs Start
    // third faqs
    thirdfaqs_content1 =
      "Welcome! We've compiled a list of frequently asked questions for your convenience. Take a look below and find answers to the most common inquiries. If you have any additional questions or need further assistance, please don't hesitate to reach out to us. We're here to help and provide you with the best experience possible. Contact us anytime, and we'll be delighted to assist you!🧑‍💻👈";

    // About Proqure Start
    // third proqure
    thirdabout_content1 = `Proqure is a Proqure marketplace feature providing customers the option to select various payment options provided by Proqure's licensed payment service provider partners.
    When you register with us, you just need your mobile number and email address to get started. Our network will then enable you to safely make online purchases without revealing your payment details. All your data and transactions are kept 100% secure by our experienced anti-fraud team, and our security measures adhere to the highest safety and security standards.
    Proqure was also created for businesses, offering flexible payment options to your customers to accelerate growth. A range of local Nigerian payment channels, including credit/debit card and Direct Debit for Internet Bank users, is available both on mobile and online devices to enable you to provide a seamless checkout experience. We strive to meet your daily business needs with transparent and affordable price plans, a simple one-step integration process and daily payouts, so you can focus on what matters.`;
  }
  return {
    speechLanguage: speechLanguage,
    noUnderstand: noUnderstand,
    purchasing_question: purchasing_question,
    thirdfaqs_content1: thirdfaqs_content1,
    thirdabout_content1: thirdabout_content1,
    back_language: back_language,
    back_only_language: back_only_language,
    headerLetter: headerLetter,
    submanheaderLetter: submanheaderLetter,
    subbotheaderLetter: subbotheaderLetter,
    subcontentLetter: subcontentLetter,
    inputPlaceHolder: inputPlaceHolder,
    sec_content: sec_content,
    sec_select1: sec_select1,
    sec_select2: sec_select2,
    sec_select3: sec_select3,
    third_content1: third_content1,
    third_content2: third_content2,
    four_content1: four_content1,
    four_content2: four_content2,
    four_content3: four_content3,
    four_content4: four_content4,
    five_detail1: five_detail1,
    five_detail2: five_detail2,
    five_detail3: five_detail3,
    five_content1: five_content1,
    five_content2: five_content2,
    five_content3: five_content3,
    five_button: five_button,
    five_content4: five_content4,
    five_content5: five_content5,
    five_content6: five_content6,
    six_content1: six_content1,
    six_content2: six_content2,
    six_content3: six_content3,
    six_content4: six_content4,
    six_button1: six_button1,
    six_button2: six_button2,
    seven_content1: seven_content1,
  };
};
