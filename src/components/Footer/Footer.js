import './Footer.css'
import MailImg from '../../assets/images/footer/mail.png';
import PhoneImg from '../../assets/images/footer/phone.png';
import headerImg from '../../assets/images/header.png'
import { useParams } from 'react-router-dom';
import { isNumber } from '../../utils';
import { useEffect, useState } from 'react';

const Footer = () => {
    const param = useParams();
    const [flag, setFlag] = useState(true);
    
    useEffect(() => {
        if(isNumber(param.id)){
            setFlag(false);
        }
    }, [param.id]);
    return ( 
        <footer>
            <div className="footer__container">
                <div className="footer__items__container container">
                    <div className="footer__mail__container">
                        <img className="footerImg" src={MailImg} alt='mail.png'/>
                        <div className="footer__mail__header">
                            <div className="footer__first__line">EMAIL SUPPORT</div>
                            <div className="footer__second__line">help@proqure.com</div>
                        </div>
                    </div>
                    <div className="footer__mail__container">
                        <img className="footerImg" src={PhoneImg} alt='mail.png'/>
                        <div className="footer__mail__header">
                        <div className="footer__first__line">PHONE SUPPORT</div>
                            <div className="footer__second__line">+123 456 7890</div>
                        </div>
                    </div>
                    <div className="footer__mail__container">
                        <div className="footer__mail__header">
                        <div className="footer__first__line">GET LATEST DEALS</div>
                            <div className="footer__second__line">Our best promotions sent to your inbox</div>
                        </div>
                    </div>
                    <div className="footer__social__link__container">
                        <div className="footer-input-container">
                            <input type="text" className="footer-input-field" placeholder="Your Email" />
                            <button className="footer-button">Subscribe</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className={`bottomImg ${flag ? "" : "black_bottomImg"}`}>
                <img src={headerImg} alt="headImg"/>
            </div>
            <div className='footer__line__container'>
                <div className="footer__line"></div>
            </div>
            <div className={`fotter__copyright__container ${flag ? "" : "black__fotter__copyright__container"}`}>
                <div className='container justify-content-between footer__text'>
                    <div className="footer__copyright">Copyright © 2023 Proqure.com. All rights reserved</div>
                    <div className="footer__privacy__policy">
                        <span className="footerright">Privacy</span>
                        <span className="footerright">Terms</span>
                        <span className="footerright">Buy Now, Pay Later</span>
                    </div>
                </div>
            </div>
        </footer>
     );
}
 
export default Footer;