import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirect, setUserInformation } from '../../../store/slice/authSlice';
import './LoginCard.css';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AddHomeRounded } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const LoginCard = () => {
    const [fadeIn, setFadeIn] = useState(false);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.auth.errors);
    const redirect = useSelector((state) => state.auth.redirect);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    useEffect(() => {
        setFadeIn(true);
    }, []);

    useEffect(() => {
        if (redirect) {
            dispatch(setRedirect(false));
            // window.location.href = "/"
            navigate('/');
        }
    },[redirect]);
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        dispatch(setUserInformation(data));
    }
    const handleRegister = () => {
        navigate('/register')
    }
    return (
        <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
            <div className="login__card__container">
                <div className="login__card">
                    <div className="login__header">
                        <h1>Login</h1>
                    </div>
                    <form className="login__inputs" onSubmit={handleSubmit}>
                        <div className="email__input__container input__container">
                            <label className="email__label input__label">Email Address</label>
                            <input ref={emailRef} type="email" className="email__input login__input" placeholder='' />
                            <label
                                className="mb-0 block text-sm font-medium mt-2 text-danger"
                                htmlFor="name"
                            >
                                {errors.name}
                            </label>
                        </div>
                        <div className="password__input__container input__container">
                            <label className="password__label input__label" >Password</label>
                            <div className='d-flex position-relative'>
                                <input ref={passwordRef} type={showPassword ? 'text' : 'password'} className="password__input login__input" placeholder='' />
                                <span
                                    className="password__toggle"
                                    onClick={togglePasswordVisibility}
                                    >
                                    {showPassword ? <VisibilityOffIcon/> : <RemoveRedEyeIcon />}
                                </span>
                            </div>
                            <label
                                className="mb-0 block text-sm font-medium mt-2 text-danger"
                                htmlFor="name"
                            >
                                {errors.name}
                            </label>
                        </div>
                        <div className='d-flex justify-content-between loginremeber'>
                            <FormControlLabel
                            className="custom-detauk-add-check"
                            control={<Checkbox className="custom-checkbox checkboxclass" />}
                            label="Remember me"
                            />
                            <div className="login__forgot__password">Forgot password?</div>
                        </div>
                        <div className="register__button__container">
                            <input type='submit' className="register__button" value="Log in" />
                        </div>
                    </form>
                    <div className="login__other__actions">
                        <div className="login__new__account">Don't have account? <Link onClick={(e) => {e.preventDefault();handleRegister();}} style={{color:'#04AA6D'}}>Sign Up</Link> </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default LoginCard;