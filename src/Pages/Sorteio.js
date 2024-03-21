import * as React from 'react';
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function fechaSorteio(){
     fetch('http://localhost:5000/v1/sorteio/fecha', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     }
   })
   return <Navigate to={"/criarAposta"}/>
   }

   function reload(){
    window.location.reload(false);
  }

  function conversor(map){
    
    if(map!=null){
        const obj = new Map(Object.entries(map));
        let array = Array.from(obj, ([name, value]) => ({ name, value }));
        return array;
    }
    return null;
  }


function Sorteio(){


    const baseURLSorteio = "http://localhost:5000/v1/sorteio";

    const [resultadoSorteio, setApostas] = React.useState(null);
    

    React.useEffect(() => {
        axios.get(baseURLSorteio).then((response) => {
            console.log(response.data);
            setApostas(response.data);

        });
      }, []);

      function dados(){ 
        return(
            <div className='dados-basicos-sorteio'>
                <h3>Numero de apostas: {resultadoSorteio?.numApostas}</h3>
                <h3>Numero de rodadas: {resultadoSorteio?.numRodadas}</h3>
                <Button variant="contained" onClick={fechaSorteio}> fechar sorteio</Button>
                <Button variant="outlined" onClick={reload}>sortear novamente</Button>
            </div>
        );
    }

    function numerosSorteados(){ 
        
        return(

            <div className='table-numeros-sorteados tabela-sorteio'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Numeros sorteados</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {resultadoSorteio?.numerosSorteados?.map((row) => (
                            <TableRow
                            key={row}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    function vencedores () {
        
        if ( resultadoSorteio?.vencedores !=null ) {
            return(
                <div className='table-numeros-sorteados tabela-sorteio'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                            </TableRow>
                            </TableHead>
                            

                            <TableBody>
                        {resultadoSorteio?.vencedores?.map((row) => (
                            <TableRow
                            key={row.nome}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>

                        </Table>
                    </TableContainer>
                </div>
            );
            
        }else{
            return(
                <div className='sorteio-fechado'>
                    <h3>Ninguém venceu o sorteio</h3>
                </div>
            );
        }
    }
    
    function frequenciaDeNumeros(){
       let mapo = conversor(resultadoSorteio?.frequenciaAposta);  
        return(
        
            <div className='tabela-sorteio'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Numero</TableCell>
                            <TableCell align="right">Vezes apostadas</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {mapo?.map((row) => (
                            <TableRow
                            key={row?.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row?.name}
                            </TableCell>
                            <TableCell align="right">{row?.value}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    return (
        <div className="component">
           {dados()}
           {vencedores()}
           {numerosSorteados()}
           {frequenciaDeNumeros()}
           
        </div>
     );
    }
export default Sorteio;