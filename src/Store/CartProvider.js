import CartContex from "./cart-context";
import React, {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
};
const cartReducer = (state, action) =>{
    if(action.type === 'ADD'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id); 
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if(existingCartItem){
            const updatedItem1 = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem1;
        } 
        else{
            updatedItems = state.items.concat(action.item);
        }
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            item: updatedItems,
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
        items: cartState.items,
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