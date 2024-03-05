import { useEffect, useState } from "react";
import {
  ChatArrowDown,
  ChatBotActiveSendSVG,
  ChatBotUnactiveSendSVG,
  ChatMessageSVG,
} from "../Electron/SVG";
import "./ChatBot.css";
import ChatbotImg from "../../assets/images/chatbot/chatbot.png";
import ChatuserImg from "../../assets/images/chatbot/chatuser.png";
import RecordImg from "../../assets/images/chatbot/recording.gif";
import AttachmentImg from "../../assets/images/chatbot/attachment.png";
import { ChatBotEffect, onSpeechText } from "./ChatBotEffect";
import VolumeUpSharpIcon from "@mui/icons-material/VolumeUpSharp";
import VolumeOffSharpIcon from "@mui/icons-material/VolumeOffSharp";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StopCircleIcon from "@mui/icons-material/StopCircle";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { isEmpty, getChangeLanguage } from "../../utils";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import ReactLoading from "react-loading";
import { toastr } from "../../utils/toastr";
import { SelectChatBotEffect } from "./SelectChatBotEffect";
let chunks = [];
let mediaRecorder;

const ChatBot = () => {
  const [imageChange, setImageChange] = useState(true);
  const [audioChange, setAudioChange] = useState(true);
  const [speechChange, setSpeechChange] = useState(true);
  const [selectedLanguage, setLanguage] = useState("English");
  const [headerLetter, setHeaderLetter] = useState("Suppose");
  const [inputPlaceHolder, setInputPlaceHolder] = useState(
    "Type your message..."
  );
  // const [selectedLanguage, setLanguage] = useState("Yoruba");
  // const [headerLetter, setHeaderLetter] = useState("Atilẹyin");
  // const [inputPlaceHolder, setInputPlaceHolder] = useState("Tẹ ifiranṣẹ rẹ sii ...");

  const handleClick = () => {
    const chatbody = document.querySelector(".chatbody");
    chatbody.classList.toggle("opaticy-1");
    if (imageChange) {
      SelectChatBotEffect("language", changeLanguage, null, true);
    }
    setImageChange(!imageChange);
  };

  const speechClick = () => {
    console.log("speechChange:", speechChange);
    if (speechChange) {
      onSpeechText(setSpeechChange);
    }
    setSpeechChange(!speechChange);
  };

  const audioClick = () => {
    try{
      if (audioChange === true) {
        chunks = [];
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.addEventListener("dataavailable", (event) =>
              chunks.push(event.data)
            );
            mediaRecorder.start();
          })
          .catch((err) => {
            if (err.name === 'NotAllowedError') {
              console.log('Permission to access the microphone was denied.');
              toastr.warning("Permission to access the microphone was denied", 0);
            } else if (err.name === 'NotFoundError' || err.name === 'NotSupportedError') {
              console.log('The microphone was not found or is not supported by the browser.');
              toastr.warning("The microphone was not found or is not supported by the browser", 0);
            } else {
              console.log('An error occurred while accessing the microphone:', err);
              toastr.warning("An error occurred while accessing the microphone", 0);
            }
          });
      } else {
        try {
          mediaRecorder.stop();
          mediaRecorder.addEventListener("stop", () => {
            const blob = new Blob(chunks, { type: "audio/mpeg" });
            var formData = new FormData();
            formData.append("filename", "audio.mp3");
            formData.append("file", blob, "audio.mpeg");
            SelectChatBotEffect("recording", changeLanguage, formData);
          });
        } catch (err) {
          console.log("audio error", err);
          toastr.info("The microphone is not found", 0);
        }
      }
    }
    catch(err){
      console.log("audio_click:", err);
      toastr.info("The microphone is not found", 0);
    }

    setAudioChange(!audioChange);
  };

  const changeLanguage = (params) => {
    setLanguage(params);

    let { headerLetter, inputPlaceHolder } = getChangeLanguage(params);
    setHeaderLetter(headerLetter);
    setInputPlaceHolder(inputPlaceHolder);
    console.log("------------------");
    SelectChatBotEffect("sel_second", changeLanguage, null);
  };

  const recordingToastr = () => {
    toastr.info("Recording", 0);
  };

  useEffect(() => {
    ChatBotEffect();
  }, []);

  return (
    <div>
      <div className={`chatbody ${imageChange ? "" : "active"}`}>
        {true ? (
          ""
        ) : (
          <img
            src={RecordImg}
            alt="recording"
            className="recordingclass"
            onClick={(e) => {
              e.preventDefault();
              audioClick();
            }}
          />
        )}
        <ReactLoading
          type="bars"
          color="rgb(4 170 109)"
          height={65}
          width={65}
          className="m-auto chatbotloading"
        />
        <section className="msger">
          <header className="msger-header">
            <div className="d-flex">
              <div className="msger-header-title">
                <img className="chatbotImg" src={ChatbotImg} alt="chatbotimg" />
              </div>
              <div className="ml-1 msger-header">
                <span>{headerLetter}</span>
              </div>
            </div>
            <div className="msger-header-options">
              <select
                className="languageclass"
                value={selectedLanguage}
                onChange={(e) => {
                  e.preventDefault();
                  changeLanguage(e.target.value);
                }}
              >
                <option value="Yoruba">Yoruba</option>
                {/* <option value="Hausa">Hausa</option>
                <option value="Lbo">Lbo</option> */}
                <option value="English">English</option>
              </select>
            </div>
          </header>
          <main className="msger-chat"></main>
          <form className="msger-inputarea">
            <div className="msg-bottomfullimgclass">
              <div onClick={audioClick} className="chataudioclass">
                {audioChange ? (
                  <MicNoneIcon style={{ fill: "#04AA6D" }} />
                ) : (
                  <SettingsVoiceIcon style={{ fill: "#04AA6D" }} />
                )}
              </div>
              <div className="attachfull">
                <label className="attachlabel" htmlFor="file-input-audio">
                  <img
                    className="attachmentclass"
                    src={AttachmentImg}
                    alt="attachmentImg"
                  />
                </label>
                <input
                  type="file"
                  name="audio"
                  id="file-input-audio"
                  accept=".mp3"
                  style={{ display: "none" }}
                  onClick={(e) => {
                    if (audioChange === false) {
                      e.preventDefault();
                      recordingToastr();
                    }
                  }}
                />
              </div>
              <div
                className="speechfull"
                onClick={(e) => {
                  if (audioChange === false) {
                    e.preventDefault();
                    recordingToastr();
                  } else {
                    speechClick();
                  }
                }}
              >
                {speechChange ? (
                  <VolumeUpIcon
                    style={{
                      fill: "rgb(4, 170, 109)",
                      width: "27px",
                      height: "27px",
                    }}
                  />
                ) : (
                  <StopCircleIcon
                    style={{
                      fill: "rgb(4, 170, 109)",
                      width: "27px",
                      height: "27px",
                    }}
                  />
                )}
              </div>
            </div>
            <input
              type="text"
              className="msger-input"
              placeholder={inputPlaceHolder}
              height="10"
            />
            <button
              type="submit"
              className="msger-send-btn"
              onClick={(e) => {
                if (audioChange === false) {
                  e.preventDefault();
                  recordingToastr();
                }
              }}
            >
              <ChatBotActiveSendSVG />
            </button>
          </form>
        </section>
      </div>
      <button
        id="chat-box"
        className="chatbot show-scroll"
        onClick={handleClick}
      >
        {imageChange ? <ChatMessageSVG /> : <ChatArrowDown />}
      </button>
    </div>
  );
};

export default ChatBot;
