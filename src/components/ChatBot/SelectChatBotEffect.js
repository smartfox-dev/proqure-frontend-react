import axios from "axios";
import { useState } from "react";
import { API_KEY, pythonServerURL, serverURL } from "../../config";
import {
  getChangeLanguage,
  getDateTimeFormat,
  getQuerySelector,
  isEmpty,
  isNumber,
  addDotToNumber,
} from "../../utils";

import ChatBotImg from "../../assets/images/chatbot/chatbot.png";
import ChatUserImg from "../../assets/images/chatbot/chatuser.png";
import MainChatSayImg from "../../assets/images/chatbot/mainchatbotsay.gif";
import MainSecondChatImg from "../../assets/images/chatbot/mainchatbot.gif";
import Filter from "bad-words";
import { davinci } from "./OpenAi/davinci";

export let extCategoryList = [];
export let extProductList = [];
export let extProductChangeList = [];
export let extFaqsList = [];
export let extFaqsChangeList = [];
export let extCPFlag = 0;
export let extAudioResult = '';
export let extStep = 0;
export let extProductItem = '';

export const SelectChatBotEffect = (selectParams, onSelectChange, audioData, chatbotflag = false ) => {
  // text
  if(chatbotflag === true){
    if(extStep > 2){
      extCPFlag = 2;
    }else{
      extCPFlag = 1;
    }
  }
  var fileInput = document.getElementById("file-input-audio");
  const msgerInput = getQuerySelector(".msger-input");
  const msgerChat = getQuerySelector(".msger-chat");
  let emoticonArray = ["🍰","🍬","🦪","🥫" ,"🥗","🧖", "🍩" ,"🧆", "👩‍🍳", "🍝", "🥟", "🌽", "🍞", "🥑", "🍣", "🍋", "🧆", "🍖", "🍨", "🚒", "🍊", "🌜", "🍊", "🍲", "🥠", "🥃", "🍋","🍰","🍬","🦪","🥫" ,"🥗","🧖", "🍩" ,"🧆", "👩‍🍳", "🍝", "🥟", "🌽", "🍞", "🥑", "🍣", "🍋", "🧆", "🍖", "🍨", "🚒", "🍊", "🌜", "🍊", "🍲", "🥠", "🥃", "🍋"];
  // var loadInterval;
  // Icons made by Freepik from www.flaticon.com
  let BOT_IMG = ChatBotImg;
  let PERSON_IMG = ChatUserImg;

  let BOT_NAME = "";
  let PERSON_NAME = "";

  //audio recording
  //type text
  inputInit();
  loadingAppend();
  setTimeout(async () => {
    if (selectParams === "language") {
      setFirstBotTextMessage();
    }
    if (selectParams === "sel_second") {
      setSecondBotTextMessage();
    }
    if (selectParams === "recording"){
      console.log("The audioUploadFunction is called.");
      extAudioResult = await audioUploadFunction(audioData, setTextMessage);
      console.log("audio_result: " + extAudioResult);
      inputInit();
      // if(extCPFlag === 0){
      //   // common proqure(If you have question about purchasing, click yes, otherwise click no)
      //   setCPTextMessage();
      // }
      let firstSelectFlag = extAudioResult.toLowerCase().includes("pro");
      let secondSelectFalg = extAudioResult.toLowerCase().includes("faq") || extAudioResult.toLowerCase().includes("freq");
      console.log("===========pre_secondSelectFalg:", secondSelectFalg);
      let thirdSelectFlag = extAudioResult.toLowerCase().includes("abou");
      console.log("=======extCPFlag:", extCPFlag);
      if(extCPFlag === 0){
        if(firstSelectFlag){
          extCPFlag = 2;
        }
        else if(secondSelectFalg){
          extCPFlag = 1;
          setSecItemTow();
          secondSelectFalg = false;
        }
        else if(thirdSelectFlag){
          extCPFlag = 1;
          setTimeout(() => {
            setAboutThirdBotTextMessage();
          }, 2000);
        }
        else{
          extCPFlag = 0;
          setTextMessage(extAudioResult);
        }
      }
      console.log("secondSelectFalg:", secondSelectFalg);
      if(extCPFlag === 1){
        //common question 
        setTextMessage(extAudioResult);
      }
      else if(extCPFlag === 2){
        //purchasing question
        appendPurchasingYouTextMessage(extAudioResult, false);
      }
    }
  }, 1000);

  function inputInit() {
    fileInput.value = "";
    msgerInput.value = "";
    removeElement(msgerChat, "loadingmsg")
  }
  
  function inputStart() {
    msgerInput.value = "";
    setTimeout(() => {
      loadingAppend();
    }, 1000);
  }

  function setCPTextMessage() {
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter,six_button1, six_button2, purchasing_question } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    
    let msgText = purchasing_question;
    console.log("bot_name", BOT_NAME, PERSON_NAME);
    appendCPMessage( BOT_NAME, BOT_IMG, "left", msgText, six_button1, six_button2);
  }
  
  function appendCPMessage(name, img, side, text, six_button1, six_button2,) {
     // remove previous element
     removeElement(msgerChat, "purchasing-select-id")

    //   Simple solution for small apps
    const spinHtml = `
    <div class="d-flex purchasingbuttongroup">
      <button class="purchasingbutton negbutton" id="purchasingnegbutton">💁${six_button1}</button>
      <button class="purchasingbutton posbutton" id="purchasingposbutton">🛒${six_button2}</button>
    </div>
    `;

    const msgHTML = `
    <div class="msg chat-fade-in purchasing-select-id">
      <div class="msg-content ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${getDateTimeFormat()}</div>
          </div>

          <div class="msg-text">${text}👇</div>
        </div>
      </div>
      ${spinHtml}
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 1500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    const purchasingnegbutton = document.getElementById('purchasingnegbutton');
    const purchasingposbutton = document.getElementById('purchasingposbutton');
    purchasingnegbutton.addEventListener('click', (e) => {
      extCPFlag = 1;
      // appendMessage(PERSON_NAME, PERSON_IMG, "right", purchasingnegbutton.textContent + "👈");
      setTextMessage(extAudioResult)
    })
    purchasingposbutton.addEventListener('click', (e) => {
      extCPFlag = 2;
      // appendMessage(PERSON_NAME, PERSON_IMG, "right", purchasingposbutton.textContent + "🚀");
      appendPurchasingYouTextMessage(extAudioResult, true);
    })
  }

  async function appendPurchasingYouTextMessage(extAudioResult, firstPurFlag = false) {
    console.log("-----------------****-------firPurFlag", firstPurFlag);
    const mlanguage = getQuerySelector(".languageclass").value;
    if (mlanguage === "Yoruba") {
      BOT_NAME = "ChatBot";
      PERSON_NAME = "Iwọ";
    } else {
      BOT_NAME = "ChatBot";
      PERSON_NAME = "You";
    }
    if(extStep === 1){
      inputStart();
      removeElement(msgerChat, "first-select-id");
      setTimeout(() => {
        setFirstBotTextMessage();
      }, 1500);
      return;
    }
    appendMessage(PERSON_NAME, PERSON_IMG, "right", extAudioResult);
    console.log("=======extStep:", extStep);
    if(extStep === 2){
      inputStart();
      let firstFlag = await getFirstFlagFromString(extAudioResult)
      if(firstFlag === 1){
        let categoryList = await getCategoryList();
        console.log("categoryList: ", categoryList);
        if (categoryList.status === 0) {
          extCategoryList = categoryList.list;
          let ct_array = getArrayFromList(categoryList.list, "name");
          console.log("array: ", ct_array);
          console.log("mlanguage: ", mlanguage);
          let changeArray = "";
          let delay = 0;
          if (mlanguage === "English") {
            delay = 3000;
            changeArray = ct_array;
          }else{
            changeArray = await getChangeLanguageFromArray(ct_array, mlanguage);
          }
          setTimeout(() => {
            setThirdBotTextMessage(changeArray);
          }, delay);
        }
      }
      else if(firstFlag === 2){
        let newMsg = "Let's show me 6 most common questions for proqure as an array";
        let response = await getPythonRequest(mlanguage, newMsg);
        console.log("faqthirdresult:", response)
        extFaqsList = getArrayFromNumber(response);
        setFaqsThirdBotTextMessage(extFaqsList);
      }
      else if(firstFlag === 3){
        setAboutThirdBotTextMessage();
      }
      else if(firstPurFlag === false){
        appendNoUnderstand();
      }
    }
    if(extStep === 3){
      inputStart();
      console.log("msgtext:", extAudioResult)
      console.log("extProductList:", extCategoryList);
      let itemIndex = getArrayAttrIndex(extAudioResult, extCategoryList);
      if(!isEmpty(extCategoryList[itemIndex])){
        let item = extCategoryList[itemIndex];
        console.log("======extItemIndexCategory",item)
        const sel_third_item = item.id
        console.log("sel_third_item", sel_third_item);
        let productList = await getProductList(sel_third_item);
        console.log("productList", productList);
        if(productList.status === 0){
          extProductList = productList.list;
          let pt_array = getArrayFromList(productList.list, "name");
          console.log("-----------ptarray", pt_array)
          const mlanguage = getQuerySelector(".languageclass").value;
          let changeArray = "";
          console.log("mlanguage", mlanguage);
          let delay = 0;
          if(mlanguage === "English"){
            changeArray = pt_array;
            delay = 3000;
          }else{
            changeArray = await getChangeLanguageFromArray(pt_array, mlanguage)
          }
          setTimeout(() => {
            setFourBotTextMessage(changeArray)
          }, delay);
        }
        
      }
      else if(firstPurFlag === false){
        appendNoUnderstand();
      }
    }
    if(extStep === 4){
      inputStart();
      console.log("msgtext:", extAudioResult)
      console.log("extProductList:", extProductChangeList);
      let itemIndex = getArrayIndex(extAudioResult, extProductChangeList);
      if(!isEmpty(extProductList[itemIndex])){
        let item = extProductList[itemIndex];
        console.log("======extItemIndex", extProductList[itemIndex])
        setFiveBotTextMessage(item.name, item);
      } 
      else if(firstPurFlag === false){
        appendNoUnderstand();
      }
    }
    else if(extStep === 5){
      inputStart();
      let number = await getNumberFromString(extAudioResult)
      console.log("number:", number);
      if(isNumber(number) && !isEmpty(extProductItem)){
        console.log("extproductitem", extProductItem);
        let total_value = Number(number) * Number(extProductItem.price)
        setSixBotTextMessage(extProductItem.name, number, total_value, extProductItem);
      }
      else if(firstPurFlag === false){
        appendNoUnderstand();
      }
    }
    else if(extStep === 6){
      inputInit();
      let boolFlag = await getBoolFromString(extAudioResult); 
      console.log(boolFlag)
      if(boolFlag === "true") {
        setSevenBotTextMessage();
      }
      else if(boolFlag === "false"){
        setFourBotTextMessage(extProductChangeList);
      }
      else if(firstPurFlag === false){
        appendNoUnderstand();
      }
    }
   
  }
  function appendNoUnderstand(){
    const mlanguage = getQuerySelector(".languageclass").value;
    let { noUnderstand, back_only_language } = getChangeLanguage(mlanguage);
    setTimeout(() => {
      noUnderstandMessage(BOT_NAME, BOT_IMG, 'left', noUnderstand, mlanguage, back_only_language)
    }, 1500);
  }
  function noUnderstandMessage(name, img, side, noUnderstand, mlanguage, back_only_language) {
    // remove previous element
    removeElement(msgerChat, "no-select-id")
    //   Simple solution for small apps


    const spinHtml = `
      <div class="nobuttongroup">
          <button class="nobackmessagebutton aiselectbutton">👈${back_only_language}</button>
      </div>
    `;

    const msgHTML = `
    <div class="msg chat-fade-in no-select-id">
      <div class="msg-content ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${getDateTimeFormat()}</div>
          </div>
          <div class="msg-text">${noUnderstand}</div>
        </div>
      </div>
      ${spinHtml}
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 1500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    // Attach click event listeners to the buttons
    const backbutton = getQuerySelector('.nobackmessagebutton');
    backbutton.addEventListener("click", () => {
      removeElement(msgerChat, "first-select-id");
      setTimeout(() => {
        setFirstBotTextMessage();
      }, 1000);
    }) 
  }

  function setFirstBotTextMessage() {
    extCPFlag = 0;
    extStep = 1;
    console.log("=======extCPFlag:", extCPFlag);
    console.log("=======extStep:", extStep);
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter, subcontentLetter } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    let msgText = subcontentLetter + "👋";
    console.log("bot_name", BOT_NAME, PERSON_NAME);
    appendFirstMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }

  function appendFirstMessage(name, img, side, text) {
    // remove previous element
    let exist_flag = existConfirm(msgerChat, "first-select-id");
    if(exist_flag) return;
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg chat-fade-in first-select-id">
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
      <div class="topchatsayimg">
        <img src=${MainChatSayImg} alt="chatsay" class="chatsayimg" />
      </div>
      <div class="firstbuttongroup">
        <button class="firstmessagebutton aiselectbutton" data-lang="Yoruba"><span class="chatbutton-text">🧞‍♂️Yoruba</span></button>
        <button class="firstmessagebutton aiselectbutton" data-lang="Hausa"><span class="button-text">🧞‍♀️Hausa</span></button>
        <button class="firstmessagebutton aiselectbutton" data-lang="Lbo"><span class="button-text">👨‍🔬Lbo</span></button>
        <button class="firstmessagebutton aiselectbutton" data-lang="English"><span class="button-text">🧚‍♂️English</span></button>
      </div>
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 1500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // Loading Initalization
    inputInit();
    // Attach click event listeners to the buttons
    const buttons = document.querySelectorAll(".firstmessagebutton");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const language = button.getAttribute("data-lang");
        // user add
        const languageContent = button.textContent;
        console.log("languageContent", languageContent);
        appendMessage(PERSON_NAME, PERSON_IMG, "right", languageContent);
        setTimeout(() => {
          onSelectChange(language);
        }, 1000);
      });
    });
  }

  function setSecondBotTextMessage() {
    extStep = 2;
    console.log("=======extStep:", extStep);
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter, sec_content, sec_select1, sec_select2, sec_select3 } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    let msgText = sec_content + "😄";
    console.log("bot_name", BOT_NAME, PERSON_NAME);
    appendSecondMessage( BOT_NAME, BOT_IMG, "left", msgText, sec_select1, sec_select2, sec_select3 );
  }

  function appendSecondMessage(name, img, side, text, select1, select2, select3) {
    // remove previous element
    removeElement(msgerChat, "second-select-id")
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg chat-fade-in second-select-id">
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
      <div class="topchatsayimg">
        <img src=${MainSecondChatImg} alt="chatsay" class="chatsayimg" />
      </div>
      <div class="secondbuttongroup">
        <button class="secondmessagebutton aiselectbutton" data-sec-item="sec_item1"><span class="chatbutton-text">🧑‍💻${select1}</span></button>
        <button class="secondmessagebutton aiselectbutton" data-sec-item="sec_item2"><span class="button-text">💁${select2}</span></button>
        <button class="secondmessagebutton aiselectbutton" data-sec-item="sec_item3"><span class="button-text">💡${select3}</span></button>
      </div>
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 4000;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    // Attach click event listeners to the buttons
    const buttons = document.querySelectorAll(".secondmessagebutton");
    buttons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const mlanguage = getQuerySelector(".languageclass").value;
        const sel_sec_item = button.getAttribute("data-sec-item");
        // user add
        const sel_sec_Content = button.textContent;
        appendMessage(PERSON_NAME, PERSON_IMG, "right", sel_sec_Content);
        inputStart();

        console.log("sel_sec_item: ", sel_sec_item);
        if (sel_sec_item === "sec_item1") {
          let categoryList = await getCategoryList();
          console.log("categoryList: ", categoryList);
          if (categoryList.status === 0) {
            extCategoryList = categoryList.list;
            let ct_array = getArrayFromList(categoryList.list, "name");
            console.log("array: ", ct_array);
            console.log("mlanguage: ", mlanguage);
            let changeArray = "";
            let delay = 0;
            if (mlanguage === "English") {
              delay = 3000;
              changeArray = ct_array;
            }else{
              changeArray = await getChangeLanguageFromArray(ct_array, mlanguage);
            }
            setTimeout(() => {
              setThirdBotTextMessage(changeArray);
            }, delay);
          }
        }
        else if(sel_sec_item === "sec_item2"){
          setSecItemTow();
        }
        else if(sel_sec_item === "sec_item3"){
          console.log("About Proqure");
          setTimeout(() => {
            setAboutThirdBotTextMessage();
          }, 2000);
        }
      });
    });
  }

  async function setSecItemTow () {
    const mlanguage = getQuerySelector(".languageclass").value;
    let newMsg = "Let's show me 6 most common questions for proqure as an array";
    let response = await getPythonRequest(mlanguage, newMsg);
    console.log("faqthirdresult:", response)
    extFaqsList = getArrayFromNumber(response);
    setFaqsThirdBotTextMessage(extFaqsList);
  }
  // product append start
  function setThirdBotTextMessage(changeArray) {
    extStep = 3;
    extCPFlag = 2;
    console.log("=======extStep:", extStep);
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter, third_content1, third_content2 } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    let tempText = changeArray.join(", ");
    let msgText = third_content1 + tempText+ "." + "🤗" + "\n" + third_content2;
    console.log("bot_name", BOT_NAME, PERSON_NAME);
    appendThirdMessage( BOT_NAME, BOT_IMG, "left", msgText, changeArray );
  }

  function appendThirdMessage(name, img, side, text, changeArray) {
     // remove previous element
     removeElement(msgerChat, "third-select-id")
    //   Simple solution for small apps
    console.log("thirdChangeArray: ", changeArray);
    console.log("thirdCategoryList:", extCategoryList);
    let buttonHTML;
    try{
      buttonHTML = changeArray.map((item, index) => `<button class="thirdmessagebutton aiselectbutton" data-third-item="${extCategoryList[index].id}"><span class="button-text">${emoticonArray[index]}${setUpperCaseSpace(item)}</span></button>`)
      .join("");
    }
    catch(err) {
      console.log("thirderror", err)
    }
    const msgHTML = `
    <div class="msg chat-fade-in third-select-id">
      <div class="msg-content ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${getDateTimeFormat()}</div>
          </div>

          <div class="msg-text">${text}🤙</div>
        </div>
      </div>
      <div class="thirdbuttongroup">
        ${buttonHTML}
      </div>
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 1500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    // Attach click event listeners to the buttons
    const buttons = document.querySelectorAll(".thirdmessagebutton");
    buttons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const sel_third_item = button.getAttribute("data-third-item");
        //user add
        const sel_third_Content = button.textContent;
        appendMessage(PERSON_NAME, PERSON_IMG, "right", sel_third_Content);
        inputStart();

        console.log("sel_third_item", sel_third_item);
        let productList = await getProductList(sel_third_item);
        console.log("productList", productList);
        if(productList.status === 0){
          extProductList = productList.list;
          let pt_array = getArrayFromList(productList.list, "name");
          console.log("-----------ptarray", pt_array)
          const mlanguage = getQuerySelector(".languageclass").value;
          let changeArray = "";
          console.log("mlanguage", mlanguage);
          let delay = 0;
          if(mlanguage === "English"){
            changeArray = pt_array;
            delay = 3000;
          }else{
            changeArray = await getChangeLanguageFromArray(pt_array, mlanguage)
          }
          setTimeout(() => {
            setFourBotTextMessage(changeArray)
          }, delay);
        }
      });
    });
  }

  function setFourBotTextMessage(changeArray) {
    extStep = 4;
    console.log("=======extStep:", extStep);
    extProductChangeList = changeArray;
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter, four_content1, four_content2, four_content3, four_content4 } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    let tempText = changeArray.join(", ");
    // eslint-disable-next-line no-useless-concat
    let msgText = four_content1 + tempText+ "." + "🖐️" + four_content2 + "<br/>" + four_content4;
    console.log("bot_name", BOT_NAME, PERSON_NAME);
    appendFourMessage( BOT_NAME, BOT_IMG, "left", msgText, changeArray, four_content3);
  }

  function appendFourMessage(name, img, side, text, changeArray, four_content3) {
     // remove previous element
     removeElement(msgerChat, "four-select-id")
    //   Simple solution for small apps
    console.log("fourChangeArray: ", changeArray);
    console.log("fourCategoryList:", extCategoryList);
    const buttonHTML = changeArray.map((item, index) => `<button class="fourmessagebutton aiselectbutton" data-four-item="${extProductList[index].id}"><span class="button-text">${emoticonArray[index+7]}${setUpperCaseSpace(item)}</span></button>`)
    .join("");
    const msgHTML = `
    <div class="msg chat-fade-in four-select-id">
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
      <div class="fourbuttongroup">
        ${buttonHTML}
      </div>
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 1500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    // Attach click event listeners to the buttons
    const buttons = document.querySelectorAll(".fourmessagebutton");
    buttons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const sel_four_item = button.getAttribute("data-four-item");
        //user add
        const sel_four_Content = button.textContent;
        let tempStr = four_content3 + sel_four_Content + ".💝" 
        appendMessage(PERSON_NAME, PERSON_IMG, "right", tempStr);
        inputStart();
        console.log("sel_four_item", sel_four_item, extProductList);
        const itemWithSameId = extProductList.filter((item) => item.id == sel_four_item)
        console.log("itemWithSameId", itemWithSameId[0]);
        setFiveBotTextMessage(sel_four_Content, itemWithSameId[0])
      });
    });
  }

  function setFiveBotTextMessage(title, item) {
    console.log("============fiveItem");
    extStep = 5;
    console.log("=======extStep:", extStep);
    extProductItem = item;
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter, five_detail1, five_detail2, five_detail3, five_content1, five_content2, five_content3, five_button, five_content4, five_content5, five_content6, back_only_language } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    let msgText = five_content1 + title + five_content2 + five_content3 + "<br/>" + five_content6 ;
    console.log("bot_name", BOT_NAME, PERSON_NAME);
    setTimeout(() => {
      appendFiveMessage( BOT_NAME, BOT_IMG, "left", msgText, title, five_detail1, five_detail2, five_detail3, five_button, five_content4, five_content5, extProductItem, mlanguage,back_only_language);
    }, 3000);
  }

  function appendFiveMessage(name, img, side, text, title,five_detail1, five_detail2, five_detail3,five_button, five_content4, five_content5, extProductItem, mlanguage, back_only_language) {
    // remove previous element
    removeElement(msgerChat, "five-select-id")
    //   Simple solution for small apps

    console.log("fiveItem: ", extProductItem);
    console.log("fiveTitle:", title);
    const imgHtml = `
    <div class="d-flex fiveproduct mb-3">
      <img class="fiveproductimg five-spin" src=${serverURL + extProductItem.image} alt="pimg1"/>
      <div class="fiveproductcontent">
        <div class="d-flex">
          <span class="fivetitle">${five_detail1}</span>: <span class="fivespanvalue">${title}</span>
        </div>
        <div class="d-flex">
          <span class="fiveprice">${five_detail2}</span>: <span class="fivespanvalue">${addDotToNumber(extProductItem.price)}₦</span>
        </div>
        <div class="d-flex">
          <span class="fivesize">${five_detail3}</span>: <span class="fivespanvalue fivespanvalueweight">${extProductItem.size}</span>
        </div>
      </div>
    </div>
    `;

    const spinHtml = `
    <div class="d-flex fivespingroup">
      <div class="five-spin-button">
        <input class="five-spin-input" type="number" value="1" min="1" max="100" step="1">
      </div>
      <button class="fivepurchase">♀️${five_button}</button>
    </div>
    <div class="fivebuttongroup">
        <button class="fivebackmessagebutton aiselectbutton">👈${back_only_language}</button>
    </div>
    `;

    const msgHTML = `
    <div class="msg chat-fade-in five-select-id">
      ${imgHtml}
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
      ${spinHtml}
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 1500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    // Attach click event listeners to the buttons
    const buttons = document.querySelectorAll(".fivepurchase");
    const backbutton = getQuerySelector('.fivebackmessagebutton');
    
    backbutton.addEventListener("click", () => {
      inputStart();
      setTimeout(() => {
        setFourBotTextMessage(extProductChangeList);
      }, 2000);
    })  

    buttons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        let five_spin_input = getQuerySelector(".five-spin-input").value;
        let five_total_value = Number(five_spin_input) * Number(extProductItem.price);
        console.log("five_total_value", five_total_value);
        let delay = 3000;
        if(mlanguage === "English" && Number(five_spin_input) === 1){
          five_content5 = " bag of ";
        }
        else if(mlanguage === "English"){
          five_content5 = " bags of ";
        }
        let fiveMsg = five_content4 + five_spin_input + five_content5 + title;
        //user add
        appendMessage(PERSON_NAME, PERSON_IMG, "right", fiveMsg);
        inputStart();
        setTimeout(() => {
          setSixBotTextMessage(title, five_spin_input, five_total_value, extProductItem)
        }, delay);
      });
    });
  }

  function setSixBotTextMessage(title, five_spin_input, five_total_value, extProductItem) {
      console.log('title :>> ', title);
      console.log('five_spin_input :>> ', five_spin_input);
      console.log('five_total_value :>> ', five_total_value);
      console.log('item :>> ', extProductItem);
      extStep = 6;
      console.log("=======extStep:", extStep);
      const mlanguage = getQuerySelector(".languageclass").value;
      let { submanheaderLetter, subbotheaderLetter, six_content1, six_content2, six_content3, six_content4, six_button1, six_button2 } = getChangeLanguage(mlanguage);
      BOT_NAME = subbotheaderLetter;
      PERSON_NAME = submanheaderLetter;
      if(mlanguage === "English" && Number(five_spin_input) === 1){
        six_content2 = " bag of ";
      }
      else if(mlanguage === "English"){
        six_content2 = " bags of ";
      }
      let msgText = six_content1 + five_spin_input + six_content2 + title + ". " + six_content3 + addDotToNumber(five_total_value) + ". " + six_content4;
      console.log("bot_name", BOT_NAME, PERSON_NAME);
      appendSixMessage( BOT_NAME, BOT_IMG, "left", msgText, six_button1, six_button2, extProductItem );
  }

  function appendSixMessage(name, img, side, text, six_button1, six_button2, extProductItem) {
    console.log("=======extStep:", extStep);
     // remove previous element
     removeElement(msgerChat, "six-select-id")

    //   Simple solution for small apps
    const spinHtml = `
    <div class="d-flex sixbuttongroup">
      <button class="sixbutton negbutton" id="sixnegbutton">😪${six_button1}</button>
      <button class="sixbutton posbutton" id="sixposbutton">😄${six_button2}</button>
    </div>
    `;

    const msgHTML = `
    <div class="msg chat-fade-in six-select-id">
      <div class="msg-content ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${getDateTimeFormat()}</div>
          </div>

          <div class="msg-text">${text}👇</div>
        </div>
      </div>
      ${spinHtml}
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 1500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    const sixnegbutton = document.getElementById('sixnegbutton');
    const sixposbutton = document.getElementById('sixposbutton');
    sixnegbutton.addEventListener('click', (e) => {
      appendMessage(PERSON_NAME, PERSON_IMG, "right", sixnegbutton.textContent + "👈");
      inputStart();
      if(!isEmpty(extProductChangeList)){
        setTimeout(() => {
          setFourBotTextMessage(extProductChangeList);
        }, 2000);
      }
    })
    sixposbutton.addEventListener('click', (e) => {
      appendMessage(PERSON_NAME, PERSON_IMG, "right", sixposbutton.textContent + "🚀");
      inputStart();
      setTimeout(() => {
        setSevenBotTextMessage();
      }, 2000);
    })
  }

  function setSevenBotTextMessage() {
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter, seven_content1, back_language } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    let msgText  = seven_content1;
    appendSevenMessage( BOT_NAME, BOT_IMG, "left", msgText, back_language);
  }

  function appendSevenMessage(name, img, side, text, back_language) {
     // remove previous element
     removeElement(msgerChat, "seven-select-id")

    //   Simple solution for small apps
    const spinHtml = `
    <div class="d-flex sevenbuttongroup">
      <button class="sevenbutton negbutton" id="sevennegbutton">👈${back_language}</button>
    </div>
    `;

    const msgHTML = `
    <div class="msg chat-fade-in seven-select-id">
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
      ${spinHtml}
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 1500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    const sevennegbutton = document.getElementById('sevennegbutton');
    sevennegbutton.addEventListener('click', (e) => {
      appendMessage(PERSON_NAME, PERSON_IMG, "right", sevennegbutton.textContent + "👈");
      inputStart();
      if(!isEmpty(extProductChangeList)){
        setTimeout(() => {
          setSecondBotTextMessage();
        }, 2000);
      }
    })
  }
  // product append end

  //FAPs append start
  function setFaqsThirdBotTextMessage(newArray) {
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter, thirdfaqs_content1 } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    console.log("bot_name", BOT_NAME, PERSON_NAME);
    appendFaqsThirdMessage( BOT_NAME, BOT_IMG, "left", newArray, thirdfaqs_content1, mlanguage );
  }

  function appendFaqsThirdMessage(name, img, side, newArray, thirdfaqs_content1, mlanguage) {
    extFaqsChangeList = newArray;
    // remove previous element
    console.log("newArray",newArray)
    removeElement(msgerChat, "faqs-third-select-id")
    let text = thirdfaqs_content1;
    let newHtml = '';
    newArray.forEach((item, index) => {
      newHtml += `<button class="faqsthirdmessagebutton aiselectbutton" data-sec-item="sec_item1">${emoticonArray[index]}${item}</button>`
    })
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg chat-fade-in faqs-third-select-id">
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
      <div class="faqsthirdbuttongroup">
        ${newHtml}
      </div>
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 2500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    // Attach click event listeners to the buttons
    const buttons = document.querySelectorAll(".faqsthirdmessagebutton");
    buttons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        // user add
        const sel_sec_Content = button.textContent;
        console.log("sel_sec_Content: ", sel_sec_Content);
        appendMessage(PERSON_NAME, PERSON_IMG, "right", sel_sec_Content);
        inputStart();
        let response = await getPythonRequest( mlanguage, sel_sec_Content);
        console.log("response: " , response);
        setFaqsFourBotTextMessage(response)
      });
    });
  }

  function setFaqsFourBotTextMessage(newMsg) {
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter, back_only_language } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    console.log("bot_name", BOT_NAME, PERSON_NAME);
    appendFaqsFourMessage( BOT_NAME, BOT_IMG, "left", newMsg, back_only_language);
  }

  function appendFaqsFourMessage(name, img, side, newMsg, back_only_language) {
    // remove previous element
    console.log("newArray",newMsg)
    removeElement(msgerChat, "faqs-four-select-id")
 
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg chat-fade-in faqs-four-select-id">
      <div class="msg-content ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${getDateTimeFormat()}</div>
          </div>

          <div class="msg-text">${newMsg}</div>
        </div>
      </div>
      <div class="faqsfourbuttongroup">
        <button class="faqsfourmessagebutton aiselectbutton">👈${back_only_language}</button>
      </div>
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 2500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    // Attach click event listeners to the buttons
    const buttons = document.querySelectorAll(".faqsfourmessagebutton");
    buttons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        // user add
        const sel_sec_Content = button.textContent;
        appendMessage(PERSON_NAME, PERSON_IMG, "right", sel_sec_Content);
        inputStart();
        if(!isEmpty(extFaqsChangeList)){
          setTimeout(() => {
            setFaqsThirdBotTextMessage(extFaqsChangeList);
          }, 2000);
        }
      });
    });
  }
  
  function setAboutThirdBotTextMessage() {
    const mlanguage = getQuerySelector(".languageclass").value;
    let { submanheaderLetter, subbotheaderLetter, back_language, thirdabout_content1 } = getChangeLanguage(mlanguage);
    BOT_NAME = subbotheaderLetter;
    PERSON_NAME = submanheaderLetter;
    console.log("bot_name", BOT_NAME, PERSON_NAME);
    appendAboutThirdMessage( BOT_NAME, BOT_IMG, "left", thirdabout_content1, back_language);
  }

  function appendAboutThirdMessage(name, img, side, thirdabout_content1, back_language) {
    // remove previous element
    console.log("newArray",thirdabout_content1)
    removeElement(msgerChat, "faqs-four-select-id")
 
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg chat-fade-in faqs-four-select-id">
      <div class="msg-content ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${getDateTimeFormat()}</div>
          </div>

          <div class="msg-text">${thirdabout_content1}</div>
        </div>
      </div>
      <div class="faqsfourbuttongroup">
        <button class="aboutthirdmessagebutton aiselectbutton">👈${back_language}</button>
      </div>
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 2500;
    const messageContainers = document.querySelectorAll(".msg.chat-fade-in");
    messageContainers.forEach((container) => {
      container.classList.add("show");
    });
    // loading Initialization
    inputInit();
    // Attach click event listeners to the buttons
    const buttons = document.querySelectorAll(".aboutthirdmessagebutton");
    buttons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        // user add
        const sel_sec_Content = button.textContent;
        appendMessage(PERSON_NAME, PERSON_IMG, "right", sel_sec_Content);
        inputStart();
        setTimeout(() => {
          setSecondBotTextMessage();
        }, 2000);
      });
    });
  }

  // FAQs append end 
  function loadingAppend() {
    //   Simple solution for small apps
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
  function appendMessage(name, img, side, text) {
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg-content msg ${side}-msg chat-fade-in">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${getDateTimeFormat()}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
    inputInit();
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 3000;
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
    const mlanguage = getQuerySelector(".languageclass").value;
    let response = await getPythonRequest(mlanguage, newMsg);
    console.log("reponse", response);
    appendMessage(BOT_NAME, BOT_IMG, "left", response);
  }

  async function efbotResponse(newMsg) {
    // const response = await davinci(newMsg, API_KEY); // Call the davinci function
    // let tempStr = `Let's translate this into Yoruba Language "${response}"`;
    // const response1 = await davinci(tempStr, API_KEY);
    const mlanguage = getQuerySelector(".languageclass").value;
    let response = await getPythonRequest(mlanguage, newMsg);
    console.log("reponse", response);
    let tempStr = `Let's translate this into ${mlanguage} Language "${response}"`;
    const response1 = await davinci(tempStr, API_KEY);
    appendMessage(BOT_NAME, BOT_IMG, "left", response1);
  }
};

export const audioUploadFunction = (formData, setTextMessage) => {
  console.log("audio uploaddata");
  return new Promise((resolve, reject) => {
    axios.post(serverURL + "/api/ai/upload", formData).then((result) => {
      const data = result.data;
      if (data.status === 0) {
        console.log("audio_uploadresult", data.message);
        let msgStr = data.message;
        // if(isEmpty(msgStr)){
        //   msgStr = "I wanna buy mama gold"
        // }
        // else{
        //   msgStr = data.message
        // }
        // msgStr = "I wanna buy mama gold";
        // msgStr = "I want to buy eleven bags of Mama Gold";
        // msgStr = "Yes, I agree"
        // msgStr = "No"
        // msgStr = "Flour"
        // msgStr = "Product"
        // msgStr =  "FAQS"
        // msgStr = "aboutproqure"
        resolve(msgStr)
      } 
    }).catch(err => {
      console.log("error", err);
    })
  })
};

export const existConfirm = (msgerChat, classname) => {
  let elements = msgerChat.querySelectorAll(`.${classname}`);
  console.log("loadingmsg", elements)
  let flag = false;
  elements.forEach(function(element) {
    if(element) flag = true;
  })
  return flag;
} 

export const removeElement = (msgerChat, classname) => {
  let elements = msgerChat.querySelectorAll(`.${classname}`);
  console.log("loadingmsg", elements)
  elements.forEach(function(element) {
    element.remove();
  })
} 

export const getCategoryList = () => {
  return new Promise((resolve, reject) => {
    axios.post(serverURL + "/api/ai/categorylist").then((result) => {
      const data = result.data;
      resolve(data);
    }).catch(err => {
      console.log("categorylist error: ", err);
    })
  });
};

export const getProductList = (cat_id) => {
  return new Promise((resolve, reject) => {
    axios.post(serverURL + "/api/ai/productlist", {cat_id: cat_id}).then((result) => {
      const data = result.data;
      resolve(data);
    }).catch(err => {
      console.log("productListdata", err)
    })
  })
}

export const getArrayFromList = (list, attr) => {
  let array = [];
  list.forEach((item) => {
    array.push(item[attr]);
  });
  return array;
};

export const getChangeLanguageFromArray = (list, language) => {
  return new Promise(async (resolve, reject) => {
    const prompt = `Translate the following words into ${language}:\n${list.map(word => word.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '')).join('\n')}.No introduction text is needed from you`;
    console.log("changeArraytempStr", prompt);
  
    try {
      const response = await davinci(prompt, API_KEY);
      const translationString = response;
      // Split the translation string by line breaks
      const lines = translationString.split('\n');
  
      // Extract translations using a regular expression to match word pairs
      const translations = lines.map(line => {
        const matches = line.match(/- (.+)/);
        return matches ? matches[1].trim() : '';
      });
  
      resolve(translations);
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
};

export const getPythonRequest = (mlanguage ,data ) => {
  return new Promise((resolve, reject) => {
    let jsonData = {request: data}
    axios.post(pythonServerURL + '/ai/answer', jsonData).then(async (result) => {
      if(result.data && result.data.response){
        let standardStr = makeStandardString(result.data.response)
        if(mlanguage === "English"){
            resolve(standardStr)
        } else {
          let tempStr = `Let's translate this into ${mlanguage} Language "${standardStr}"`;
          console.log("---------------------------------------11111111111111111111111", tempStr)
          let response1 = await davinci(tempStr, API_KEY);
          console.log("----------11111111111------------response1", response1);
          response1 = getStringInsideDquotes(response1);
          console.log("----------22222222222222------", response1)
          resolve(response1)
        }
      }
    }).catch(err => {
      console.log('error', err)
    })

  })
}

export const makeStandardString = (chunkString) => {
  // Capitalize the first letter of the chunk string
  let standardString = chunkString.charAt(0).toUpperCase() + chunkString.slice(1);
  // Remove any leading or trailing whitespace
  standardString = standardString.trim();
  return standardString;
}

export const getArrayFromNumber = (string) => {
  var regex = /\d+\. (.+)/g;
  var matches;
  var array = [];
  while ((matches = regex.exec(string)) !== null) {
    array.push(matches[1]);
  }
  return array;
}

export const setUpperCaseSpace = (string) => {
  let result = string.replace(/([A-Z])/g, ' $1').trim();
  return result
}

export const getArrayIndex = ( tempStr, tempArray) => {
  // let tempStr = "I wanna buy Honeywell";
  // let tempArray = ['Mama Gold', 'Eagle', 'Honeywell', 'Diamond', 'Bua'];
  
  tempStr = tempStr.toLowerCase().replaceAll(' ', '')
  console.log("---------------------------------------", tempStr)
  for(let i=0; i<tempArray.length; i++) {
    let temp = tempArray[i].toLowerCase().replaceAll(' ', '');
    if (tempStr.includes(temp)){
      return i
    }
  }
}

export const getArrayAttrIndex = ( tempStr, tempArray) => {
  // let tempStr = "I wanna buy Honeywell";
  // let tempArray = ['Mama Gold', 'Eagle', 'Honeywell', 'Diamond', 'Bua'];
  tempStr = tempStr.toLowerCase().replaceAll(' ', '')
  console.log("---------------------------------------", tempStr)
  for(let i=0; i<tempArray.length; i++) {
    let temp = tempArray[i].name.toLowerCase().replaceAll(' ', '');
    if (tempStr.includes(temp)){
      return i
    }
  }
}

export const getNumberFromString = (extAudioResult) => {
  return new Promise( async (resolve, reject) => {
    let newMsg = `In the sentence below, please give me only number how many he wants to buy. Remember, only arabic number is necessary! No introduction text is needed from you! "${extAudioResult}"`;
    const mlanguage = getQuerySelector(".languageclass").value;
    let response = await getPythonRequest(mlanguage, newMsg);
    console.log("======reponse", response);
    resolve(response)
  })
}

export const getBoolFromString = (str) => {
  return new Promise( async (resolve, reject) => {
    let newMsg = `In this sentence below,Please give "true" for “Yes, I agree or Yes” and "false" for “No or Not”.Remember, only other string is necessary!.No introduction text is needed from you! "${str}"`;
    const mlanguage = getQuerySelector(".languageclass").value;
    let response = await getPythonRequest(mlanguage, newMsg);
    console.log("======reponse", response.toLowerCase());
    resolve(response.toLowerCase());
  })
}

export const getFirstFlagFromString = (str) => {
  return new Promise( async (resolve, reject) => {
    let newMsg = `In this sentence below,Please give "1" for “Product" or "I want to see product”,"2" for “FAQs" or "I want to see "FAQs", "Question”, and "3" for “Proqure" or "About Proqure" or "I want to see Proqure”.Remember, only other string is necessary!.No introduction text is needed from you! :"${str}"`;
    const mlanguage = getQuerySelector(".languageclass").value;
    let response = await getPythonRequest(mlanguage, newMsg);
    console.log("======reponse", response.toLowerCase());
    resolve(Number(response));
  })
}

export const getStringInsideDquotes = (string) => {
  const regex = /"(.*?)"/;
  const match = string.match(regex);

  if (match) {
    const extractedString = match[1];
    return extractedString
  } else {
    return string
  }
} 