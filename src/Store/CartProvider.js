import CartContex from "./cart-context";
import React, {useReducer} from "react";

const defaultCartState = {
    item: [],
    totalAmount: 0
};
const cartReducer = (state, action) =>{
    if(action.type === 'ADD'){
        const updatedItem = state.item.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            item: updatedItem,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
};
const CartProvider = (props) => {
    const [cartState, dispatchCartAction] =useReducer(cartReducer, defaultCartState)
    const addItemHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        });
    };
    const removeItemHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    };
    const cartContext  = {
        items: cartState.item,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }
    return (
        <CartContex.Provider value={cartContext}>
            {props.children}
        </CartContex.Provider>
    );
};
export default CartProvider;