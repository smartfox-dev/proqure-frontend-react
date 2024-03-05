import { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TabTitle } from "../../utils/General";
import ReactLoading from 'react-loading';
import { isEmpty } from "../../config";
import './Contact.css';

import { ArrowRightSVG, FaceBookSVG, TwitterSVG, RoomSVG, LinkedSVG, PlaySVG } from "../Electron/SVG";
import Footer from "../Footer/Footer";
const Contact = () => {
    TabTitle("CONTACT - PROQURE");
    const [fadeIn, setFadeIn] = useState(false);
    const [loading, setLoading ] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
                setFadeIn(true);
                window.scrollTo(0, 0);    
            }, 500);
          }, 1500);
    },[]);

    return (
      <>
        {loading ? (
          <ReactLoading type="spokes" className="m-auto entire-loading" />
        ) : (
          <>
            <div
              className={`contactcontainer fade-in ${fadeIn ? "active" : ""}`}
            >
              <div className="contactus_sec" id="partbody">
                <div className="container">
                  <div className="contact_wrapper">
                    <div className="col_left">
                      <div className="heading">
                        <h1>Get in touch with us</h1>
                        <h3>
                          Do you want to sign up or ask a question or make
                          enquiry? Please drop a message for us and we will be
                          in touch with you.
                        </h3>
                      </div>
                      <form
                        className="contact_form"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="form_droup">
                          <input
                            type="text"
                            placeholder="Full name"
                            name="fullName"
                          />
                        </div>
                        <div className="form_droup">
                          <input
                            className="left_input"
                            type="text"
                            placeholder="Email Address"
                            name="emailAddress"
                          />
                          <input
                            className="right_input"
                            type="text"
                            placeholder="Phone number"
                            name="phoneNumber"
                          />
                        </div>
                        <div className="form_droup">
                          <input
                            type="text"
                            placeholder="Company Name"
                            name="companyName"
                          />
                        </div>
                        <div className="form_droup">
                          <textarea
                            type="text"
                            placeholder="Message"
                            name="message"
                          ></textarea>
                        </div>
                        <div className="form_droup">
                          <button className="sendmessage d-flex" type="submit">
                            Send Message
                            <span>
                              <ArrowRightSVG />
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col_right">
                      <div className="contect_slot">
                        <h4>Office Address</h4>
                        <span>
                          PROQURE RETAIL NETWORK LTD,
                          <br />
                          951A ADMIRAL ODUWAYE CRESCENT,
                          <br />
                          OMOLE GRA 2 (OTEDOLA),
                          <br />
                          Ikeja, Lagos
                        </span>
                      </div>
                      <div className="contect_slot">
                        <h4>Email Address</h4>
                        <span>info@proqureng.com</span>
                      </div>
                      <div className="contect_slot">
                        <h4>Phone/Whatsapp</h4>
                        <span>+234 806 166 0945</span>
                      </div>
                      <div className="contect_slot">
                        <h4>We’re social</h4>
                        <div className="social_links">
                          <a href="" target="_blank" rel="noreferrer">
                            <FaceBookSVG />
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <TwitterSVG />
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <RoomSVG />
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <LinkedSVG />
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <PlaySVG />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        )}
      </>
    );
}

export default Contact;