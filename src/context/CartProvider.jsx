import { createContext, useState } from 'react';

const CartContext = createContext([])

export const CartProvider = ({ children }) => {
    const [cartList, setCartList] = useState([]);

    //Funtion for validate a existing element into the array
    const isInCart = (id) => (cartList?.find(element => element.product.id === id)) ? true : false;

    //Function for add a item inside cart 
    function addToCart(item) {
        if (isInCart(item.product.id)) {
            let newCartList = [...cartList];

            //Adds the aditional quantity to an existing item
            newCartList.map(element =>

                (element.product.id === item.product.id) ? element.product_quantity += item.product_quantity : element.product_quantity

            )
            localStorage.setItem("cart", JSON.stringify(newCartList));
            setCartList([...newCartList]);
        }
        else {
            localStorage.setItem("cart", JSON.stringify([...cartList, item]));
            setCartList([...cartList, item]);
        }

    }

    //Function for deleting a single item
    function removeItem(id) {
        let newCartList = [...cartList];

        //Returns a filtered array
        let modifiedArray = newCartList.filter(element => element.product.id !== id);

        
        setCartList(modifiedArray);
        localStorage.setItem("cart", JSON.stringify(modifiedArray));
    }

    //Function for calculating the whole items into the cart
    function getTotalItemsOnCart() {
        //Starts at 0 when cart is empty
        let total = 0;

        //confirms if the array is fulled of items and starts to add
        if (cartList.length > 0) {
            cartList.map(data => total += data.product_quantity)
        }
        return total
    }

    //Empty the cart
    function emptyCart() {
        localStorage.setItem("cart", "");
        setCartList([])
    }

    //Calculates the total price of an single product and its quantity
    function calculateSubPrice(quantity, price) {
        return quantity * price;
    }

    //Calculates the total amount of the order
    function calculateTotalPrice() {
        let total = 0;
        cartList?.forEach((row) =>
            total += row.product.product_price * row.product_quantity)
        return total;
    }
    //function for getting the id and the quantity
    function getCartToBuy() {
        let cartToBuy = [];
        cartList?.forEach((row) =>
            cartToBuy.push({
                product_id: row.product.id,
                product_quantity: row.product_quantity
            }))
        return cartToBuy;
    }
    return (
        <CartContext.Provider value={
            {
                cartList,
                setCartList,
                addToCart,
                emptyCart,
                getTotalItemsOnCart,
                removeItem,
                calculateSubPrice,
                calculateTotalPrice,
                getCartToBuy
            }
        }>
            {children}
        </CartContext.Provider>)
}
export default CartContext;
