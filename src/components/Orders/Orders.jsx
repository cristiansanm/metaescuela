import { Button } from '@mui/material'
import Navbar from '../CommonUiComponents/Navbar'
import TableBase from '../CommonUiComponents/TableBase'
import ViewTitle from '../CommonUiComponents/ViewTitle'
import MenuAppBar from '../CommonUiComponents/Miguel/Footer'

const Orders = () => {
  return (
    <div className="">
      <Navbar/>
      <ViewTitle title="Pedidos"/>
      <TableBase/>
      <Button sx={{
        margin: '0 50%',
      }} color="success" variant='contained'>
        Volver
      </Button>
      <MenuAppBar/>
    </div>
    
    )}
export default Orders;