import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import logo from "../../../assets/img/Login/Logo_MetaEscuela.png"
import UserInfoModal from '../../Modals/UserInfoModal';
import { IconButton } from '@mui/material';
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

const TableSingleOrder = ({ data, headers }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState("");
  return (
    <>
        <TableContainer sx={{maxHeight: "400px",}} component={Paper}>
          <Table sx={{ minWidth: 700,  overflowY: "scroll"}} aria-label="customized table">
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
              {data?.Products?.map((product, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    <img 
                        src={product?.product_image ? product.product_image : logo} 
                        alt="img" 
                        width="32"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">{product?.id}</StyledTableCell>
                  <StyledTableCell align="right">
                      {product?.product_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{product?.OrdersProducts?.product_quantity}</StyledTableCell>
                  <StyledTableCell align="right">{product?.product_price}</StyledTableCell>
                  <StyledTableCell align="right">{product?.OrdersProducts?.product_subtotal}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      sx={{ 
                        color: "#283845", 
                        fontSize: 16,
                        fontWeight: "500",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        setId(product?.User?.id);
                        setOpen(true);
                      }}
                    >
                      {product?.User?.user_name}
                    </IconButton>
                    
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <UserInfoModal open={open} handleClose={handleClose} type={"Vendedor"} id={id}/>
    </>
    
  )
}

export default TableSingleOrder