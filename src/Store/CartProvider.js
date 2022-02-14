import CartContex from "./cart-context";

const CartProvider = (props) => {
    const addItemHandler = (item) => {};
    const removeItemHandler = (id) => {};
    const cartContext  = {
        items: [],
        totalAmount: 0,
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