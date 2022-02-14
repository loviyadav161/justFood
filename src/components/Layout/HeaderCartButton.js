import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../Store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnHigh, setBtnHigh] = useState(false);
  const cartCtx = useContext(CartContext);  

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnHigh? classes.bump : ''}`;
  useEffect(() => {
      if(cartCtx.items.length === 0){
          return;
      }
    setBtnHigh(true);
    const timer = setTimeout(() => {
        setBtnHigh(false);
    },300);
    return () => {
        clearTimeout(timer);
    };
  }, [cartCtx.items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;