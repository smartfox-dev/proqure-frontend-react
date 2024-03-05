import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './RegisterCard.css';
import { setUserRegister, setRedirect } from '../../../store/slice/authSlice';
import UserBillImg  from '../../../assets/images/userbill.png'
import { toastr } from "../../../utils/toastr";
import { isEmpty } from "../../../utils";

const RegisterCard = () => {
    const [fadeIn, setFadeIn] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let errors = useSelector((state) => state.auth.errors);
    const redirect = useSelector((state) => state.auth.redirect);
    console.log("errors")
    const [showPassword, setShowPassword] = useState(false);
    const [confirmshowPassword, setConfirmShowPassword] = useState(false);
    const [confirm_password_error, setConfirmPasswordError] = useState('');
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const confirmtogglePasswordVisibility = () => {
        setConfirmShowPassword(!confirmshowPassword);
    };
    useEffect(() => {
        setFadeIn(true);
    },[]);

    useEffect(() => {
        if(redirect){
            dispatch(setRedirect(false));
            navigate('/login');
        }
    });
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const companyRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(passwordRef.current.value ,confirmpasswordRef.current.value)
        if(passwordRef.current.value !== confirmpasswordRef.current.value){
            setConfirmPasswordError("Incorrect confirm password");
            return;
        }
        const formData = new FormData();
        formData.append('firstname', firstNameRef.current.value);
        formData.append('lastname', lastNameRef.current.value);
        formData.append('company', companyRef.current.value);
        formData.append('phone', phoneRef.current.value);
        formData.append('email', emailRef.current.value);
        formData.append('password', passwordRef.current.value);
        formData.append('image', UserBillImg)
        formData.append('role', 4);
        formData.append('status', 1);
        
        const data = {
            firstname: firstNameRef.current.value,
            lastname: lastNameRef.current.value,
            company: companyRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            role: 4,
            status:1,
        }
        console.log("data:", formData);
        setConfirmPasswordError('');
        dispatch(setUserRegister(formData));
    }
    return (
        <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
            <div className="register__card__container" >
                <div className="register__card">
                    <div className="d-flex justify-content-between">
                        <div className="register__header">
                            <h1>Sign Up</h1>
                        </div>
                        <div className="register__other__actions">
                            <div className="register__login__account">Have an account? 
                            <Link to="/login" style={{color:'#04aa6d'}}> Login</Link>
                            </div>
                    </div>    
                    </div>
                    <form className="register__inputs" onSubmit={handleSubmit}>
                        <div className="fname__input__container reg__input__container">
                            <label className="fname__label input__label">First name</label>
                            <input type="text" ref={firstNameRef} className="fname__input register__input" placeholder='' />
                            <label
                                className="mb-0 block text-sm font-medium mt-2 text-danger"
                                htmlFor="name"
                            >
                                {errors.firstname}
                            </label>
                        </div>
                        <div className="lname__input__container reg__input__container">
                            <label className="lname__label input__label">Last name</label>
                            <input type="text" ref={lastNameRef} className="lname__input register__input" placeholder='' />
                            <label
                                className="mb-0 block text-sm font-medium mt-2 text-danger"
                                htmlFor="name"
                            >
                                {errors.lastname}
                            </label>
                        </div>
                        <div className="company__input__container reg__input__container">
                            <label className="company__label input__label">Company name</label>
                            <input type="company" ref={companyRef} className="company__input register__input" placeholder='' />
                            <label
                                className="mb-0 block text-sm font-medium mt-2 text-danger"
                                htmlFor="company"
                            >
                                {errors.company}
                            </label>
                        </div>
                        <div className="phone__input__container reg__input__container">
                            <label className="phone__label input__label">Phone number</label>
                            <input type="phone" ref={phoneRef} className="phone__input register__input" placeholder='' />
                            <label
                                className="mb-0 block text-sm font-medium mt-2 text-danger"
                                htmlFor="phone"
                            >
                                {errors.phone}
                            </label>
                        </div>
                        <div className="email__input__container reg__input__container">
                            <label className="email__label input__label">Email</label>
                            <input type="email" ref={emailRef} name='email' className="email__input register__input" placeholder='' />
                            <label
                                className="mb-0 block text-sm font-medium mt-2 text-danger"
                                htmlFor="email"
                            >
                                {errors.email}
                            </label>
                        </div>
                        <div className="password__input__container reg__input__container">
                            <label className="password__label input__label">Password</label>
                            <div className='d-flex position-relative'>
                                <input type={showPassword ? 'text' : 'password'} ref={passwordRef} className="password__input register__input" />
                                <span
                                    className="password__toggle"
                                    onClick={togglePasswordVisibility}
                                    >
                                    {showPassword ? <VisibilityOffIcon/> : <RemoveRedEyeIcon />}
                                </span>
                            </div>
                            <label
                                className="mb-0 block text-sm font-medium mt-2 text-danger"
                                htmlFor="password"
                            >
                                {errors.password}
                            </label>
                        </div>
                        <div className="password__input__container reg__input__container">
                            <label className="password__label">Confirm Password</label>
                            <div className='d-flex position-relative'>
                                <input type={confirmshowPassword ? 'text' : 'password'} ref={confirmpasswordRef} className="password__input register__input" />
                                <span
                                    className="password__toggle"
                                    onClick={confirmtogglePasswordVisibility}
                                    >
                                    {confirmshowPassword ? <VisibilityOffIcon/> : <RemoveRedEyeIcon />}
                                </span>
                            </div>
                            <label
                                className="mb-0 block text-sm font-medium mt-2 text-danger"
                                htmlFor="password"
                            >
                                {confirm_password_error}
                            </label>
                        </div>
                        
                        <div className="register__button__container">
                            <input type='submit' className="register__button" value="Sign Up" />
                        </div>
                    </form>
                    <div className="register__other__text">
                        By signing up you accept our terms and conditions & privacy policy
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterCard;