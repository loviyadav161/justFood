import Header from "./components/Layout/Header";
import React, {useState} from 'react';
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./Store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] =useState(false);
  const showtCartHandler =() =>{
    setCartIsShown(true);
  }
  const hideCartHandler =() =>{
    setCartIsShown(false);
  }
  return (
    <CartProvider>
      { cartIsShown && <Cart onClose = {hideCartHandler}/>}
      <Header onShowCart = {showtCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
