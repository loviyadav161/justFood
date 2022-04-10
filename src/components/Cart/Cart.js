import { useContext, useState } from 'react';
import CartContex from '../../Store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContex);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.items.length > 0;
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    };

    const orderHandler= () =>{
        setIsCheckout(true);
    };
    const submitOrderHandler = (userData) => {
        fetch('https://myfoodapp14-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                cartItem: cartCtx.items
            })
        });
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
        {cartCtx.items.map((items) => (
        <CartItem 
            key={items.id} 
            name = {items.name}
            amount = {items.amount}
            price = {items.price}
            onRemove = {cartItemRemoveHandler.bind(null,items.id)}
            onAdd = {cartItemAddHandler.bind(null,items)}
        />
        ))}
        </ul>
    );



    const action = (<div className={classes.actions}>
        <button className={classes['button--alt']} onClick = {props.onClose}>Close</button>
        {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>);
    return (
        <Modal onClose = {props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout &&<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && action}
        </Modal>
    );
};
export default Cart;