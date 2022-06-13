import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import eye from "../../assets/img/Icons/visibility.png";
import moment from "moment";
import "moment/locale/es";

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
    padding: '20px 15px',
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

const OrdersTable = ({ data, headers }) => {
  const navigate = useNavigate();
  return (
    <>
        <TableContainer sx={{height: "450px",}} component={Paper}>
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
              {data?.map((order, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {order?.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{order?.Products?.length}</StyledTableCell>
                  <StyledTableCell align="right">{order?.order_total}</StyledTableCell>
                  <StyledTableCell align="right">{moment(order?.createdAt).format("L")}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      onClick={() => navigate(`${order?.id}`)}
                    >
                      <img src={eye} alt="" width="32"/>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </>
    
  )
}

export default OrdersTable