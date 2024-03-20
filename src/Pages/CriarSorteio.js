import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useState } from "react";

function criarSorteio(nomeSorteio){
     fetch('http://localhost:5000/v1/sorteio/abre?nome='+nomeSorteio, {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     }
   })
   }

function CriarSorteio(){
    const [nome, setNome] = useState(null);

    const handleChange = (event) => {
        const {value} = event.target;
        setNome(value);
      };

      const handleSubmit = (event) => {
        console.log("entrou");
        criarSorteio(nome);
        event.preventDefault();
      };


    return <div className ='page'>
        <div className ='page'>
            <h2>Cadastrar sorteio:</h2> 
            <form onSubmit={handleSubmit} className ='form'>
                <TextField name="nome" onChange={handleChange} className ='text-field' label="Nome" variant="outlined" />
                <Button type="submit" variant="contained">Criar sorteio</Button>
            </form>
        </div>
        
    </div>
}

export default CriarSorteio;