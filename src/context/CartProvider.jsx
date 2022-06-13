import { createContext, useState, useContext } from 'react';

const cartContext = createContext([])
export const useCartContext = () => useContext(cartContext);

const CartProvider = ({ children }) => {
    const [cartList, setCartList] = useState([]);

    //Funtion for validate a existing element into the array
    const isInCart = (id) => (cartList?.find(element => element.item.id === id)) ? true : false;

    //Function for add a item inside cart 
    function addToCart(item) {
        if (isInCart(item.item.id)) {
            let newCartList = [...cartList];

            //Adds the aditional quantity to an existing item
            newCartList.map(element =>

                (element.item.id === item.item.id) ? element.quantity += item.quantity : element.quantity

            )

            setCartList([...newCartList]);
        }
        else {
            setCartList([...cartList, item]);
        }

    }

    //Function for deleting a single item
    function removeItem(id) {
        let newCartList = [...cartList];

        //Returns a filtered array
        let modifiedArray = newCartList.filter(element => element.item.id !== id);

        setCartList(modifiedArray);
    }

    //Function for calculating the whole items into the cart
    function getTotalItemsOnCart() {
        //Starts at 0 when cart is empty
        let total = 0;

        //confirms if the array is fulled of items and starts to add
        if (cartList.length > 0) {
            cartList.map(data => total += data.quantity)
        }
        return total
    }

    //Empty the cart
    function emptyCart() {
        setCartList([])
    }

    //Calculates the total price of an single product and its quantity
    function calculateSubPrice(quantity, price) {
        return quantity * price;
    }

    //Calculates the total amount of the order
    function calculateTotalPrice() {
        let total = 0;
        cartList?.map((row) =>
            total += row.item.price * row.quantity)
        return total;
    }
    return (
        <cartContext.Provider value={
            {
                cartList,
                addToCart,
                emptyCart,
                getTotalItemsOnCart,
                removeItem,
                calculateSubPrice,
                calculateTotalPrice
            }
        }>
            {children}
        </cartContext.Provider>)
}
export default CartProvider;
