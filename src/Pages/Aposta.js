import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { getByTestId } from "@testing-library/react";
import axios from "axios";
import React, { useState } from "react";

function apostar(nomeApostador, cpfApostador, numerosAposta, boolSurpresinha){

 var numeros = numerosAposta.split(',').map( Number );
  console.log(boolSurpresinha);
  fetch('http://localhost:5000/v1/aposta', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "nomeApostador": nomeApostador,
    "cpfApostador": cpfApostador,
    "surpresinha": boolSurpresinha,
    "numeros": numeros
  })
})
}

function Aposta(){
    const [formData, setFormData] = useState({
        nomeApostador: "",
        cpfApostador: "",
        numerosAposta:""
      });

      const [bool, setBool] = useState(false);

      const handleBool = () => {
        if(bool == false){
            console.log("estava falso")
             setBool(!bool)
        }else{
            console.log("estava verdadeiro")
             setBool(!bool);
        };
        console.log("trocou para ", bool);
      }

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      };

      const handleSubmit = (event) => {
        console.log(formData.nomeApostador, formData.cpfApostador, formData.numerosAposta, bool);
        apostar(formData.nomeApostador, formData.cpfApostador, formData.numerosAposta, bool)
        event.preventDefault();
      };

    return <div className ='page'>
        <div className ='page'>
            <h2 className="header-aposta">Cadastrar aposta:</h2> 
            <form onSubmit={handleSubmit} className ='form'>
                <TextField name="numerosAposta" className ='text-field' label="Numeros"  value={formData.numerosAposta}  onChange={handleChange} variant="outlined" />
                <FormControlLabel name="boolSurpresinha" control={<Checkbox />} onChange={handleBool} label="Surpresinha" />
                <TextField name="cpfApostador" className ='text-field' label="CPF" value={formData.cpfApostador}  onChange={handleChange} variant="outlined" />
                <TextField name="nomeApostador" className ='text-field' label="Nome" value={formData.nomeApostador}  onChange={handleChange} variant="outlined" />
                <Button type="Submit" variant="contained">Apostar</Button>
            </form>
        </div>
        
    </div>
}

export default Aposta;