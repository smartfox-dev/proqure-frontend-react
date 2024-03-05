import React from 'react';
import './Bottom.css';
import { FadeInSection } from '../FadeInSection/FadeInSection';

import { ArrowRightSVG } from '../Electron/SVG';

import img1 from '../../assets/images/bottom/1.png';
import img2 from '../../assets/images/bottom/2.png';
import img3 from '../../assets/images/bottom/3.png';
import img4 from '../../assets/images/bottom/4.png';

const Bottom = () => {
    return (
        <FadeInSection>
            <div className="solutions_row">
                <div className="solutions_item4colom">
                    <div>
                        <main>
                            <a href="/blog">
                                <div className="solutions_item">
                                    <img className="solutions_img" src={img1} alt="" />
                                    <div className="solutions_description" style={{ background: 'rgba(231, 38, 53, 0.75)' }}>
                                        <div className="solutions_for">Proqure for</div>
                                        <h3 className="solution_title">Manufacturers</h3>
                                        <span className="solution_link">See Details
                                            <ArrowRightSVG />
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </main>
                    </div>
                </div>
                <div className="solutions_item4colom">
                    <div>
                        <main>
                            <a href="/blog">
                                <div className="solutions_item">
                                    <img className="solutions_img" src={img2} alt="" />
                                    <div className="solutions_description" style={{ background: 'rgb(1 16 80 / 80%)' }}>
                                        <div className="solutions_for">Proqure for</div>
                                        <h3 className="solution_title">Distributors</h3>
                                        <span className="solution_link">See Details
                                            <ArrowRightSVG />
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </main>
                    </div>
                </div>
                <div className="solutions_item4colom">
                    <div>
                        <main>
                            <a href="/blog">
                                <div className="solutions_item">
                                    <img className="solutions_img" src={img3} alt="" />
                                    <div className="solutions_description" style={{ background: 'rgb(109 29 96 / 80%)' }}>
                                        <div className="solutions_for">Proqure for</div>
                                        <h3 className="solution_title">Logistics</h3>
                                        <span className="solution_link">See Details
                                            <ArrowRightSVG />
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </main>
                    </div>
                </div>
                <div className="solutions_item4colom">
                    <div>
                        <main>
                            <a href="/blog">
                                <div className="solutions_item">
                                    <img className="solutions_img" src={img4} alt="" />
                                    <div className="solutions_description" style={{ background: 'rgba(18, 124, 66, 0.8)' }}>
                                        <div className="solutions_for">Proqure for</div>
                                        <h3 className="solution_title">Retailers</h3>
                                        <span className="solution_link">See Details
                                            <ArrowRightSVG />
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </main>
                    </div>
                </div>
            </div>
        </FadeInSection>
    )
};

export default Bottom;