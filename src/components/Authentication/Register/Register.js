import { useEffect } from "react";
import RegisterCard from "../../Card/RegisterCard/RegisterCard";
import './Register.css'
import { TabTitle } from "../../../utils/General";
import { useState } from "react";
import ReactLoading from 'react-loading';
const Register = () => {
    TabTitle("Home - REGISTER");
    const [fadeIn, setFadeIn] = useState(false);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
                setFadeIn(true);
                window.scrollTo(0, 0);    
            }, 500);
        }, 1500);
    }, []);

    return (
        <>
            {loading ? <ReactLoading type="spokes" className='m-auto entire-loading'/> : 
                <div className={`register__auth__container fade-in ${fadeIn ? 'active' : ''}`}>
                    <div className="register__auth">
                        <RegisterCard />
                    </div>
                </div>
            }
        </>
    );
}

export default Register;