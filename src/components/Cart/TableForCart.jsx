import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import logo from "../../assets/img/Login/Logo_MetaEscuela.png"
import UserInfoModal from '../Modals/UserInfoModal';
import { IconButton } from '@mui/material';
import LoadingLogo from '../Modals/LoadingLogo';
import useCart from '../../customHooks/useCart';
import trash from "../../assets/img/Icons/trash.png"
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#283845',
    color: '#F4FBFA',
    fontSize: '1.05rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    border: '1px solid #283845'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontFamily: 'Poppins, sans-serif',
    padding: '30px 15px',
    color: '#283845',
    fontWeight: '500'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#BBE7DF',
  '&:nth-of-type(odd)': {
    backgroundColor: '#EAF4F4',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableForCart = ({ headers }) => {
  
  const { calculateSubPrice, cartList, removeItem } = useCart()
  return (

    cartList?.length > 0
      ? (
        <>
          <TableContainer sx={{ maxHeight: "400px", }} component={Paper}>
            <Table sx={{ minWidth: 700, overflowY: "scroll" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <StyledTableCell
                      align={index === 0 ? 'left' : 'right'}
                      key={index}
                    >
                      {header}
                    </StyledTableCell>
                  ))}

                </TableRow>
              </TableHead>
              <TableBody>
                {cartList?.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      <img
                        src={item?.product?.product_image ? item?.product?.product_image : logo}
                        alt="img"
                        width="32"
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">{item?.product?.product_name}</StyledTableCell>
                    
                    <StyledTableCell align="right">{item?.product_quantity}</StyledTableCell>
                    <StyledTableCell align="right">{item?.product?.User?.user_name}</StyledTableCell>
                    <StyledTableCell align="right">{item?.product?.product_price} €</StyledTableCell>
                    <StyledTableCell align="right">
                      {calculateSubPrice(item?.product?.product_price, item?.product_quantity)} €
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        onClick={() => removeItem(item?.product?.id)}
                      >
                        <img src={trash} alt="trash" width="32"/>
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (

        <LoadingLogo />


      )



  )
}

export default TableForCart