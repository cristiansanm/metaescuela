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

function createData( name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.calories}</StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      onClick={() => navigate('1')}
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