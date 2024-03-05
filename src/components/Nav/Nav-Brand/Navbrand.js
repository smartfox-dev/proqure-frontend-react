import './NavBrand.css'
import { Link } from 'react-router-dom';
import head from '../../../assets/images/header.png';
const NavBrand = () => {
    return (
        <div href="#home" className='navbrand__container'>
            <Link to="/"><img className='headimg' src={head} alt="" /></Link>
        </div>
    );
}

export default NavBrand;