import { useEffect } from 'react';
import LoginCard from '../../Card/LoginCard/LoginCard';
import './Login.css';
import { TabTitle } from '../../../utils/General';
import { useState } from 'react';
import ReactLoading from 'react-loading';

const Login = () => {
    TabTitle("Home - LOGIN");
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
            <div className={`login__auth__container fade-in ${fadeIn ? 'active' : ''}`}>
                <div className="login__auth">
                    <LoginCard />
                </div>
            </div>
        }
        </>
    );
}

export default Login;