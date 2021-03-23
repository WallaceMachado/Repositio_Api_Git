import React, {useState, useCallback, useEffect} from 'react';// useState = Hooks

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'; // necessário instalar extensão react-icons
import {Container, Form, SubmitButton, List, DeleteButton} from './styles';

import api from '../../services/api';

export default function Main(){
  const [newRepo,setNewRepo] = useState('');
  const [repositorios,setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false); // para ter loding na tela quando uma requisição tiver sendo feita
  const [alert, setAlert] = useState(null);

// Buscar [] em branco pra ele exceutar sempre que  a pagina for atualizada
  useEffect(()=>{
  const repoStorage = localStorage.getItem('repos');

  if(repoStorage){
    setRepositorios(JSON.parse(repoStorage));
  }

}, []);

  // Salvar alterações sempre que tem uma mudança no repositório (escuta)
  useEffect(()=>{
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);
  
  //useCallback para que quando newRepo ou repositorios for atualizado a função será chamada
  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){ 

      setLoading(true);
      setAlert(null);
      try{
        if(newRepo === ''){
          throw new Error('Você precisa indicar um repositório')
        }
      //para teste: facebook/react
      const response = await api.get(`repos/${newRepo}`);

      const hasRepo = repositorios.find(repo=> repo.name === newRepo);

      if(hasRepo){
          throw new Error('Repositório Duplicado');
      }
  
      const data = {
        name: response.data.full_name,
      }
  
      setRepositorios([...repositorios, data]);
      setNewRepo('');
    }catch(error){
      setAlert(true);
      console.log(error);
    }finally{
      setLoading(false);
    }
    }

    submit();

  }, [newRepo, repositorios]);

  function handleInputChange(e){
    
    setNewRepo(e.target.value);
    setAlert(null);
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

    <Form onSubmit={handleSubmit} error={alert}>
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