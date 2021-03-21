import React, {useState, useCallback} from 'react';// useState = Hooks

import { FaGithub, FaPlus } from 'react-icons/fa'; // necessário instalar extensão react-icons
import {Container, Form, SubmitButton} from './styles';

import api from '../../services/api';

export default function Main(){
  const [newRepo,setNewRepo] = useState('');
  const [repositorios,setRepositorios] = useState('');
  

  //useCallback para que quando newRepo ou repositorios for atualizado a função será chamada
  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){ 

      //para teste: facebook/react
      const response = await api.get(`repos/${newRepo}`);
  
      const data = {
        name: response.data.full_name,
      }
  
      setRepositorios([...repositorios, data]);
      setNewRepo('');
    }

    submit();

  }, [newRepo, repositorios]);

  function handleInputChange(e){
    
    setNewRepo(e.target.value);
  }

  return(
    <Container>
      
    <h1>
      <FaGithub size={25}/>
      Meus Repositorios
    </h1>

    <Form onSubmit={handleSubmit}>
      <input type="text" 
      placeholder="Adicionar Repositorios"
      value={newRepo}
      onChange={handleInputChange}
      />

      <SubmitButton>
        <FaPlus color="#FFF" size={14}/>
      </SubmitButton>

    </Form>

  </Container>
  )
}