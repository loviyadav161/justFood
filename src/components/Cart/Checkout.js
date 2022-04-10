import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isPin = (value) => value.trim().length === 6;

const Checkout = (props) =>{
    const[checkoutFormValidity, setCheckoutFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        pinCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const pinCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) =>{
        event.preventDefault();

        const name = nameInputRef.current.value;
        const street = streetInputRef.current.value;
        const pinCode = pinCodeInputRef.current.value;
        const city = cityInputRef.current.value;
        
        const enteredName = !isEmpty(name);
        const enteredStreet = !isEmpty(street);
        const enteredCity = !isEmpty(city);
        const enteredPin = isPin(pinCode);

        setCheckoutFormValidity({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            pinCode: enteredPin
        });

        const formValid = enteredName && enteredCity && enteredPin && enteredStreet;
        
        if(!formValid)
        {
            return;
        }
        props.onConfirm({
            name:enteredName,
            city:enteredCity,
            pinCode:enteredCity,
            street:enteredStreet,
        });
    };
    return <form onSubmit={confirmHandler}>
        <div className={`${classes.control} ${checkoutFormValidity.name? '': classes.invalid}`}>
            <label htmlFor='name'>Your Name</label>
            <input type="text" id='name' ref={nameInputRef}/>
            {!checkoutFormValidity.name && <p>Please Enter Valid Name</p>}
        </div>
        <div className={`${classes.control} ${checkoutFormValidity.street? '': classes.invalid}`}>
            <label htmlFor='street'>Street</label>
            <input type="text" id='street' ref={streetInputRef}/>
            {!checkoutFormValidity.street && <p>Please Enter Valid Street</p>}
        </div>
        <div className={`${classes.control} ${checkoutFormValidity.pinCode? '': classes.invalid}`}>
            <label htmlFor='pincode'>Pin Code</label>
            <input type="text" id='pincode' ref={pinCodeInputRef}/>
            {!checkoutFormValidity.pinCode && <p>Please Enter Valid Pin Code</p>}
        </div>
        <div className={`${classes.control} ${checkoutFormValidity.city? '': classes.invalid}`}>
            <label htmlFor='city'>City</label>
            <input type="text" id='city' ref={cityInputRef}/>
            {!checkoutFormValidity.city && <p>Please Enter Valid City</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button >Confirm</button>
        </div>
    </form>
};
export default Checkout;