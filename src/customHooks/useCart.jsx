import { useContext } from 'react'
import CartProvider from '../context/CartProvider'

const useCart = () => {
  return useContext(CartProvider)
}

export default useCart