import React from 'react';

import classes from './Header.module.css';
import mealImage from '../../assests/meals.jpg';
import HeaderCartButton from './HeaderCartButton';
const Header = (props) =>{
    return (
    <React.Fragment> 
        <header className={classes.header}>
            <h1>Just Food</h1>
            <HeaderCartButton/>
        </header>
        <div className={classes['main-image']}>
            <img src = {mealImage} alt ="Food" /> 
        </div>
    </React.Fragment>
    );
};
export default Header;
