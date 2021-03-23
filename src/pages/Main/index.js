import React, {useState, useCallback} from 'react';// useState = Hooks

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'; // necessário instalar extensão react-icons
import {Container, Form, SubmitButton, List, DeleteButton} from './styles';

import api from '../../services/api';

export default function Main(){
  const [newRepo,setNewRepo] = useState('');
  const [repositorios,setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false); // para ter loding na tela quando uma requisição tiver sendo feita

  //useCallback para que quando newRepo ou repositorios for atualizado a função será chamada
  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){ 

      setLoading(true);
      try{

      //para teste: facebook/react
      const response = await api.get(`repos/${newRepo}`);
  
      const data = {
        name: response.data.full_name,
      }
  
      setRepositorios([...repositorios, data]);
      setNewRepo('');
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
    }

    submit();

  }, [newRepo, repositorios]);

  function handleInputChange(e){
    
    setNewRepo(e.target.value);
  }

  
  const handleDelete = useCallback((repo)=> {
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find);
  }, [repositorios]);

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

      <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14}/>
          ) : (
            <FaPlus color="#FFF" size={14}/>
          )}
      </SubmitButton>

    </Form>

    <List>
         {repositorios.map(repo => (
           <li key={repo.name}>
             <span>
             <DeleteButton onClick={()=> handleDelete(repo.name) }>
                <FaTrash size={14}/>
             </DeleteButton>  
             {repo.name}
             </span>
             <a href="">
               <FaBars size={20}/>
             </a>
           </li>
         ))} 
      </List>


  </Container>
  )
}