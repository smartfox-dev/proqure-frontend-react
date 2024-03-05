import { useNavigate } from 'react-router-dom';
import './NavLinks.css'
import Form from '../Search-Bar/Form'
import Control from '../Controls/Control';
import CategoryList from '../CategoryList/CategoryList.js'
const NavLinks = () => {
    
    return ( 
            <nav className="nav__bottom__container">
                <div className='d-flex all-bottom-container container'>
                    <div className='control_category'>
                        <CategoryList />
                    </div>
                    <div className="form__container">
                        <Form />
                    </div>
                    <div className="control__bar">
                        <Control />
                    </div>    
                </div>
            </nav>
     );
}
 
export default NavLinks;