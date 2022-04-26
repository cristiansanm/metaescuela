import { Button } from '@mui/material'
import Navbar from '../CommonUiComponents/Navbar'
import TableBase from '../CommonUiComponents/TableBase'
import ViewTitle from '../CommonUiComponents/ViewTitle'

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
    </div>
    
  )
}

export default Orders