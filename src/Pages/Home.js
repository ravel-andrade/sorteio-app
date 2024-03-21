import * as React from 'react';
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function Home(){
    function fecharAposta(){
     fetch('http://localhost:5000/v1/aposta/fecha', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
   })
   window.location.reload(false);
   }


    const baseURLSorteio = "http://localhost:5000/v1/sorteio/aberto";
    const baseURLApostas = "http://localhost:5000/v1/aposta/sorteio-aberto";

    const[goToCriarAposta, setGoToCriarAposta] = React.useState(false)
    const[goToCriarSorteio, setGoToCriaSorteio] = React.useState(false)
    const[goToRanking, setGoToRanking] = React.useState(false)
    const[goToApostar, setGoToApostar] = React.useState(false)
    const[goToSorteio, setGoToSorteio] = React.useState(false)
    const [sorteio, setSorteio] = React.useState(null);
    const [apostas, setApostas] = React.useState(null);
    

    React.useEffect(() => {
        axios.get(baseURLSorteio).then((response) => {
            setSorteio(response.data);
        });
      }, []);

      
      React.useEffect(() => {
        axios.get(baseURLApostas).then((response) => {
            response.data.sort(function(x,y){
                let a = x.apostador.nome.toUpperCase();
                let b = y.apostador.nome.toUpperCase();

                return a==b? 0 : a > b ? 1 : -1;
            })
            setApostas(response.data);
        });
      }, []);


     

    if(goToCriarAposta){
        return <Navigate to={"/criarAposta"}/>;
    }
    if(goToRanking){
        return <Navigate to={"/ranking"}/>;
    }
    if(goToApostar){
        return <Navigate to={"/aposta"}/>;
    }
    if(goToCriarSorteio){
        return <Navigate to={"/criarSorteio"}/>;
    }

    if(goToSorteio){
        return <Navigate to={"/sorteio"}/>;
    }



    function dadosSorteio () {
        var sorteioAberto = sorteio?.aberto;
        if ( sorteioAberto ) {
            return(
            <div className='sorteio-aberto'>
                <div className ='page'>Sorteio aberto: </div>
                <h1>teste</h1>
            </div>
            );
            
        }else{
            return(
                <div className='sorteio-fechado'>
                    <h1>Nenhum sorteio aberto</h1>
                    <div className='buttons'>
                        <Button onClick={() => setGoToCriaSorteio(true)} variant="contained">Criar sorteio</Button>
                        <Button onClick={() => setGoToRanking(true)} variant="outlined">Ranking</Button>
                    </div>
                </div>
            );
        }
        } 
    

    function aposta(){
        
            if(sorteio?.aberto && sorteio?.abertoAposta){
                return(<div className='buttons'>
                        <Button onClick={() => setGoToApostar(true)} variant="contained">Apostar</Button>
                        <Button onClick={() => fecharAposta()} variant="outlined">Fechar apostas</Button>
                    </div>
                );
            }else if(sorteio?.aberto){
                return(
                    <div>
                        <div className='buttons-apostas-fechadas'>
                        <Button onClick={() => setGoToSorteio(true)} variant="contained">Sortear</Button>
                        <Button onClick={() => setGoToRanking(true)} variant="outlined">Ranking</Button>
                        </div>
                    </div>
                );
            }
        }

        function apostasDoSorteio(){ 
            if(apostas!=null){
                return(
                    <div className='teste'>
                                <div className='table-apostas'>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell>Nome</TableCell>
                                                <TableCell align="right">Numeros</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {apostas?.map((row) => (
                                                <TableRow
                                                key={row?.apostador?.nome}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {row?.apostador?.nome}
                                                </TableCell>
                                                <TableCell align="right">{row.numeros}</TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                )
            }else{
                return(<h3 className='non-apostas'>Nenhuma aposta foi feita até o momento</h3>)
            }
            

        }
    
    
    return (
        <div className="component">
           {dadosSorteio()}
           {aposta()}
           {apostasDoSorteio()}
        </div>
     );
    }
export default Home;