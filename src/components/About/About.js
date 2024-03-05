import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TabTitle } from "../../utils/General";
import { Slide } from 'react-slideshow-image';
import { isEmpty } from "../../utils";
import ReactLoading from 'react-loading';

import './About.css';
import slider1 from '../../assets/images/about/1.png'
import LeftImg from '../../assets/images/about/left.png';
import RightImg from '../../assets/images/about/right.png';
import BottomImg from '../../assets/images/about/bottom.jpg';
import MapImg from '../../assets/images/about/map.png';
import OneSVG from '../../components/Electron/about/1.svg';
import TwoSVG from '../../components/Electron/about/2.svg';
import ThreeSVG from '../../components/Electron/about/3.svg';
import FourSVG from '../../components/Electron/about/4.svg';
import FiveSVG from '../../components/Electron/about/5.svg';

import ManImg1 from '../../assets/images/about/man/1.png';
import ManImg2 from '../../assets/images/about/man/2.png';
import ManImg3 from '../../assets/images/about/man/3.png';
import ManImg4 from '../../assets/images/about/man/4.png';
import ManImg5 from '../../assets/images/about/man/5.png';
import ManImg6 from '../../assets/images/about/man/6.png';
import AtmosphereImg from '../../assets/images/about/man/atmosphere.png';

import { LinkedSVG } from '../../components/Electron/SVG';
import { FadeInSection } from "../FadeInSection/FadeInSection";
import Footer from "../Footer/Footer";
const About = () => {

    TabTitle("ABOUT - PROQURE");
    const [fadeIn, setFadeIn] = useState(false);
    const [loading, setLoading ] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
                setFadeIn(true);
                // window.scrollTo(0, 0);    
            }, 500);
          }, 1500);
    },[]);

    const slideImages = [slider1];
    // const slideImages = [temp, temp];
    const slideProperties = {
        duration: 5000,
        transitionDuration: 1000,
        infinite: true,
        // indicators: true,
        // arrows: true,
        autoplay: true, // Set autoplay to true
        interval: 3000, // Set the interval between slides to 5000ms (5 seconds)
    };
    return (
      <>
        {loading ? (
          <ReactLoading type="balls" className="m-auto entire-loading" />
        ) : (
          <>
            <div className={`fade-in ${fadeIn ? "active" : ""}`} id="partbody">
              <div
                className="about_banner"
                style={{ backgroundImage: `url(${slider1})` }}
              ></div>
              <FadeInSection>
                <div className="aboutcontainer">
                  <div className="abut_beginning">
                    <div className="col_left">
                      <span className="we_R">We Are</span>
                      <h1 className="heading">ProQure</h1>
                    </div>
                    <div className="col_right">
                      <span className="abut_beginning_p">
                        ProQure provides a unified B2B distribution platform
                        powered by technology.
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection>
                <div className="aboutcontainer">
                  <div className="abt_heading_warp">
                    <h2>Our solution is a growth engine</h2>
                    <div className="subcontent">
                      Proqure was founded in 2021 by a team of experienced
                      entrepreneurs and financial experts. We are passionate
                      about helping small businesses in Africa grow and succeed.
                    </div>
                  </div>
                  <div className="platform_row">
                    <div className="col_left">
                      <div className="plat_option">
                        <img className="BBB leftimg" src={LeftImg} alt="BBB" />
                        <span className="title AAA">Brands</span>
                      </div>
                    </div>
                    <div className="omnibiz_platform">
                      <div className="title">
                        <img className="icon" src={OneSVG} alt="onesvg" />
                        <h4>The ProQure Platform</h4>
                      </div>
                      <div className="platform_toppy">
                        <div className="rotation_content">
                          Crowdsourced <br /> Fulfilment Platform
                        </div>
                        <div className="item">
                          <div className="item_icon">
                            <img src={TwoSVG} alt="twosvg" />
                          </div>
                          <div className="describe">
                            <h5>Access to supplie</h5>
                            <span>
                              We have a wide network of suppliers, so you can
                              find the products you need at competitive prices.
                            </span>
                          </div>
                        </div>
                        {/* <div className="item">
                          <div className="item_icon">
                            <img src={ThreeSVG} alt="threesvg" />
                          </div>
                          <div className="describe">
                            <h5>Crowdsourced Logistics</h5>
                            <span>
                              Utilize the capacity of regional logistics
                              companies on demand
                            </span>
                          </div>
                        </div> */}
                      </div>
                      <div className="platform_toppy">
                        <div className="item">
                          <div className="item_icon">
                            <img src={FourSVG} alt="foursvg" />
                          </div>
                          <div className="describe">
                            <h5>Access to finance</h5>
                            <span>
                              We offer a variety of financing options, including
                              Buy-now-Pay-Later and Business Expansion Finance.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="platform_toppy">
                        <div className="item">
                          <div className="item_icon">
                            <img src={FiveSVG} alt="fivesvg" />
                          </div>
                          <div className="describe">
                            <h5>Business support</h5>
                            <span>
                              We offer business support services, including
                              advisory services and business management tools..
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col_right">
                      <div className="plat_option mt-5-mb">
                        <img
                          className="BBB rightimg"
                          src={RightImg}
                          alt="rightimg"
                        />
                        <span className="title AAA">Retailers</span>
                      </div>
                    </div>
                  </div>
                  <div className="abt_white">
                    <div className="container">
                      <div className="mvsion_row">
                        <div className="mvsion_grid">
                          <div className="mvsion_warp">
                            <h3 className="heading">Our Vision</h3>
                            <span className="descibe">
                              Our team has a wealth of experience in the logistics and supply chain, financial services and technology industries. We believe that our unique combination of expertise and experience puts us in a prime position to help small businesses in Africa.
                            </span>
                            <hr
                              color="#D0D0D0"
                              style={{ margin: "30px 0px" }}
                            />
                            <h3 className="heading">Our Mission</h3>
                            <span className="descibe">
                              Our mission is to provide small businesses in Africa with the resources they need to grow and succeed. We believe that by doing so, we can help to create a more prosperous and equitable Africa.
                            </span>
                          </div>
                        </div>
                        <div className="mvsion_grid">
                          <img
                            className="mvsion_img"
                            src={BottomImg}
                            alt=""
                            data-xblocker="passed"
                            style={{ visibility: "visible" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="bottom_option mt-5-mb">
                                    <img className="BBB" src={BottomImg} alt="rightimg" />
                                    <span className="title AAA">Retailers</span>
                                </div> */}
                </div>
              </FadeInSection>
              <FadeInSection>
                <div className="sec_space team_sec">
                  <div className="container">
                    <div className="abt_heading_warp">
                      <h2 style={{ marginBottom: "20px" }}>OmniBiz Team</h2>
                    </div>
                    <div className="team_card">
                      <div className="team_row">
                        <div>
                          <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                            className="team"
                          >
                            <div className="img_link">
                              <img
                                src={ManImg1}
                                alt=""
                                data-xblocker="passed"
                                style={{ visibility: "visible" }}
                              />
                              <i className="linkedin" target="_blank">
                                <LinkedSVG />
                              </i>
                            </div>
                            <span className="name">Ify Iyadi</span>
                            <span className="designation">
                              Head of People &amp; Culture
                            </span>
                          </a>
                        </div>
                        <div>
                          <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                            className="team"
                          >
                            <div className="img_link">
                              <img
                                src={ManImg2}
                                alt=""
                                data-xblocker="passed"
                                style={{ visibility: "visible" }}
                              />
                              <i className="linkedin" target="_blank">
                                <LinkedSVG />
                              </i>
                            </div>
                            <span className="name">Ify Iyadi</span>
                            <span className="designation">
                              Head of People &amp; Culture
                            </span>
                          </a>
                        </div>
                        <div>
                          <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                            className="team"
                          >
                            <div className="img_link">
                              <img
                                src={ManImg3}
                                alt=""
                                data-xblocker="passed"
                                style={{ visibility: "visible" }}
                              />
                              <i className="linkedin" target="_blank">
                                <LinkedSVG />
                              </i>
                            </div>
                            <span className="name">Ify Iyadi</span>
                            <span className="designation">
                              Head of People &amp; Culture
                            </span>
                          </a>
                        </div>
                        <div>
                          <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                            className="team"
                          >
                            <div className="img_link">
                              <img
                                src={ManImg4}
                                alt=""
                                data-xblocker="passed"
                                style={{ visibility: "visible" }}
                              />
                              <i className="linkedin" target="_blank">
                                <LinkedSVG />
                              </i>
                            </div>
                            <span className="name">Ify Iyadi</span>
                            <span className="designation">
                              Head of People &amp; Culture
                            </span>
                          </a>
                        </div>
                        <div>
                          <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                            className="team"
                          >
                            <div className="img_link">
                              <img
                                src={ManImg5}
                                alt=""
                                data-xblocker="passed"
                                style={{ visibility: "visible" }}
                              />
                              <i className="linkedin" target="_blank">
                                <LinkedSVG />
                              </i>
                            </div>
                            <span className="name">Ify Iyadi</span>
                            <span className="designation">
                              Head of People &amp; Culture
                            </span>
                          </a>
                        </div>
                        <div>
                          <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                            className="team"
                          >
                            <div className="img_link">
                              <img
                                src={ManImg6}
                                alt=""
                                data-xblocker="passed"
                                style={{ visibility: "visible" }}
                              />
                              <i className="linkedin" target="_blank">
                                <LinkedSVG />
                              </i>
                            </div>
                            <span className="name">Ify Iyadi</span>
                            <span className="designation">
                              Head of People &amp; Culture
                            </span>
                          </a>
                        </div>
                        <div>
                          <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                            className="team"
                          >
                            <div className="img_link">
                              <img
                                src={AtmosphereImg}
                                alt=""
                                data-xblocker="passed"
                                style={{ visibility: "visible" }}
                              />
                              <i className="linkedin" target="_blank">
                                <LinkedSVG />
                              </i>
                            </div>
                            <span className="name">Ify Iyadi</span>
                            <span className="designation">
                              Head of People &amp; Culture
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection>
                <div className="traction_sec">
                  <div className="traction_plate">
                    <span className="tag">TRACTION</span>
                  </div>
                  <div className="traction_plate_mb">
                    <span className="tag">TRACTION</span>
                  </div>
                  <div className="container">
                    <div className="traction_row">
                      <div className="col_left">
                        <div className="traction_grid">
                          <span className="count">120,000+</span>
                          <span className="describe">
                            Retailers doing business the smarter way
                          </span>
                        </div>
                        <div className="traction_grid">
                          <span className="count">1,500+</span>
                          <span className="describe">
                            Field Agents across Nigeria
                          </span>
                        </div>
                        <div className="traction_grid">
                          <span className="count">135+</span>
                          <span className="describe">
                            Local government areas covered across Nigeria and
                            Ghana
                          </span>
                        </div>
                      </div>
                      <div className="col_right">
                        <img className="map" src={MapImg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
            <Footer />
          </>
        )}
      </>
    );
}

export default About;