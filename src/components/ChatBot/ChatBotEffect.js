import axios from "axios";
import { useState } from "react";
import { API_KEY, pythonServerURL, serverURL } from "../../config";

import {
  getChangeLanguage,
  getDateTimeFormat,
  getQuerySelector,
  isEmpty,
  makeStandardString,
} from "../../utils";

import ChatBotImg from "../../assets/images/chatbot/chatbot.png";
import ChatUserImg from "../../assets/images/chatbot/chatuser.png";
import { toastr } from "../../utils/toastr";
import Filter from "bad-words";
import { davinci } from "./OpenAi/davinci";

var loadInterval;
// Icons made by Freepik from www.flaticon.com
let BOT_IMG = ChatBotImg;
let PERSON_IMG = ChatUserImg;

let BOT_NAME = "";
let PERSON_NAME = "";

export const ChatBotEffect = () => {
  var fileInput = document.getElementById("file-input-audio");
  const msgerForm = getQuerySelector(".msger-inputarea");
  const msgerInput = getQuerySelector(".msger-input");
  const msgerChat = getQuerySelector(".msger-chat");
  const mloading = getQuerySelector(".chatbotloading");


  //audio file upload
  document
    .getElementById("file-input-audio")
    .addEventListener("change", async () => {
      console.log("value change");
      fileInput = document.getElementById("file-input-audio");
      var file = fileInput.files[0];
      var filename = "audio.mp3";
      console.log("filename", filename);
      console.log("-----fileupload", file);
      var formData = new FormData();
      formData.append("file", file);
      formData.append("filename", filename);
      inputStart();
      // send request to server
      audioUploadFunction(formData, setTextMessage);
    });

  //type text
  msgerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const msgText = msgerInput.value;
    if (!msgText) return;
    console.log("====msgText", msgText);
    setTextMessage(msgText);
  });

  function inputInit() {
    fileInput.value = "";
    msgerInput.value = "";
    removeElement(msgerChat, "loadingmsg")
    // clearInterval(loadInterval);
  }
  
  function inputStart() {
    msgerInput.value = "";
    setTimeout(() => {
      loadingAppend();
    }, 1200);
  }

  function appendMessage(name, img, side, text) {
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg chat-fade-in">
      <div class="msg-content ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
        
        <div class="msg-bubble">
        <div class="msg-info">
        <div class="msg-info-name">${name}</div>
        <div class="msg-info-time">${getDateTimeFormat()}</div>
        </div>
        
        <div class="msg-text">${text}</div>
        </div>
      </div>
    </div>
    `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 1500;
    inputInit();
    setTimeout(() => {
      const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
      messageContainers.forEach((container) => {
        container.classList.add("show");
      });
    }, 100);
  }


  function setTextMessage(msgText) {
    const mlanguage = getQuerySelector(".languageclass").value;
    if (mlanguage === "Yoruba") {
      BOT_NAME = "ChatBot";
      PERSON_NAME = "Iwọ";
    } else {
      BOT_NAME = "ChatBot";
      PERSON_NAME = "You";
    }

    console.log("bot_name", BOT_NAME, PERSON_NAME);
    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    inputStart();
    setBotTextMessage(msgText);
  }

  function setBotTextMessage(msgText) {
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    const filter = new Filter();
    const cleanPrompt = filter.isProfane(msgText)
      ? filter.clean(msgText)
      : msgText;
    const newMsg = cleanPrompt;
    if (mlanguage === "English") {
      botResponse(newMsg);
    } else {
      efbotResponse(newMsg);
    }
  }

  async function botResponse(newMsg) {
    // const response = await davinci(newMsg, API_KEY); // Call the davinci function
    let response = await getPythonRequest(newMsg);
    console.log("reponse", response);
    appendMessage(BOT_NAME, BOT_IMG, "left", response);
  }

  async function efbotResponse(newMsg) {
    // const response = await davinci(newMsg, API_KEY); // Call the davinci function
    // let tempStr = `Let's translate this into Yoruba Language "${response}"`;
    // const response1 = await davinci(tempStr, API_KEY);
    const mlanguage = getQuerySelector(".languageclass").value;
    let response = await getPythonRequest(newMsg);
    console.log("reponse", response);
    let tempStr = `Let's translate this into ${mlanguage} Language "${response}"`;
    const response1 = await davinci(tempStr, API_KEY);
    appendMessage(BOT_NAME, BOT_IMG, "left", response1);
  }
};

export const loadingAppend = () => {
  const msgerChat = getQuerySelector(".msger-chat");
  const msgHTML = `
  <div class="msg loadingmsg">
    <div class="msg-content left-msg">
    <div class="msg-img" style="background-image: url(${BOT_IMG})"></div>
    <div class="loadingdiv">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 1500;
}

export const removeElement = (msgerChat, classname) => {
  let elements = msgerChat.querySelectorAll(`.${classname}`);
  console.log("loadingmsg", elements)
  elements.forEach(function(element) {
    element.remove();
  })
} 

export const audioUploadFunction = (formData, setTextMessage) => {
  console.log("audio uploaddata");
  axios.post(serverURL + "/api/ai/upload", formData).then((result) => {
    const data = result.data;
    if (data.status === 0) {
      setTextMessage(data.message);
    } else {
      toastr.info(data.message);
    }
  }).catch(err => {
    console.log("error", err);
  })
};

export const getPythonRequest = ( data ) => {
  return new Promise((resolve, reject) => {
    let jsonData = {request: data}
    axios.post(pythonServerURL + '/ai/answer', jsonData).then((result) => {
      console.log("getpython request result:", result);
      if(result.data && result.data.response){
        let str = makeStandardString(result.data.response)
        resolve(str)
      }
    }).catch(err => {
      console.log('error', err)
    })

  })
}

export const onSpeechText = (setSpeechChange) => {
  const mlanguage = getQuerySelector(".languageclass").value;
  const { speechLanguage } = getChangeLanguage(mlanguage);
  console.log("onSpeechTextLanguages", speechLanguage)
  let speechText = lastTwoTextFromMsgText();
  if(speechText === "false") {
    setSpeechChange(true);
    return;
  }
  if ('speechSynthesis' in window) {
    var speech = new SpeechSynthesisUtterance();
    // speech.lang = "en-US";
    // speech.lang = "yo-NG";
    speech.lang = speechLanguage
    // speech.text = "What program can I use to read the text aloud?";
    // speech.text = "Eto wo ni MO le lo lati ka ọrọ naa ni ariwo?";
    speech.text = speechText;
    speech.rate = 0.9; // Set the speech rate
    speech.onend = function() {
      setSpeechChange(true);
      // Add your code or function call here for handling the end of speech synthesis
    };
    window.speechSynthesis.speak(speech);
  }
}

export const lastTwoTextFromMsgText = () => {
  // Select all elements with the class name "msg-text"
  const msgTextElements = document.getElementsByClassName("msg-text");

  if (msgTextElements.length === 0) {
    console.log("No elements with class found.");
    return "false"
  } else if (msgTextElements.length === 1) {
    let onlyElementContent = msgTextElements[0].innerText;
    let text_without_emoticon = onlyElementContent.replace(/[\uD800-\uDFFF]./g, "");
    return text_without_emoticon;
  } else if (msgTextElements.length >= 2) {
    let secondLastElement = msgTextElements[msgTextElements.length - 2];
    let lastElement = msgTextElements[msgTextElements.length - 1];

    let secondLastElementContent = secondLastElement.innerText;
    let lastElementContent = lastElement.innerText;
    let text_without_emoticon = lastElementContent.replace(/[\uD800-\uDFFF]./g, "");
    // return secondLastElementContent + " "  +lastElementContent
    return text_without_emoticon;
  }
}