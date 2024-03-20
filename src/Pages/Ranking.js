import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function BasicTable() {
  const baseURLRanking = "http://localhost:5000/v1/aposta/apostadores";
  const [rank, setrank] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURLRanking).then((response) => {
          setrank(response.data);
        });
      }, []);

  return (
        <div className='teste'>
            <div className='table-apostas'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="right">Pontos</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rank?.map((row) => (
                            <TableRow
                            key={row?.apostador?.nome}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row?.nome}
                            </TableCell>
                            <TableCell align="right">{row.saldo}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    
  );
}