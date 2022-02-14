import React, {useContext} from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContex from '../../Store/cart-context';

const HeaderCartButton = (props) =>{
    const cartCtx = useContext(CartContex)
    const noOfCartItem = cartCtx.items.reduce((currNo,item) => {
        return currNo + item.amount;
    }, 0);
    return (
        <button className={classes.button} onClick = {props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {noOfCartItem}
            </span>
        </button>
    );
};
export default HeaderCartButton;