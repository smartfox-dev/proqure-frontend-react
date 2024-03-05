import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavLinks from "../Nav/Nav-Links/NavLinks";
import Navtop from '../Nav/Container/Container';
import { useScrollDirection } from './HeaderEffect';
import './Header.css';
import { getCurrentUser } from '../../store/slice/authSlice';
import { isEmpty } from '../../utils';
import socket from '../../utils/socket';

const Header = () => {
    
    // let scrollDirection = useScrollDirection();
    // let scrollDirection = 'up';
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userInfo);
  
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');
        dispatch(getCurrentUser());
    }, [])

    useEffect(() => {
        if(!isEmpty(userInfo)){
            socket.emit('userInfo', {id: userInfo.id, email: userInfo.email});
        }
    },[userInfo])

    return (
      // <div className={`header__container backdrop ${ scrollDirection === "down" ? "-top-24" : "top-0"}`}>
      <div className="header__container backdrop">
        <div className="container">
          <Navtop />
        </div>
        <NavLinks />
      </div>
    );
}

export default Header;