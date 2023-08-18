import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import MyWalletLogo from "../../components/MyWalletLogo"
import { API_URL } from "../../routes/routes"

export default function SignUpPage() {
  
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [pictureUrl,setPictureUrl] = useState('')
  const navigate = useNavigate()
  function enviarCadastro(event){
    event.preventDefault();
   
      let dadosCadastro = {
        email,
        password,
        userName,
        pictureUrl 
      }
      console.log(dadosCadastro)
      if(password !== null && password !== ''){
        
        axios.post(`${API_URL}/signup`, dadosCadastro)
        .then(() => navigate('/')) 
        .catch((error) => alert(error.response))

      }else{
        navigate('/cadastro')
        alert('As senhas nao sao iguais') 
      }
  }



  return (
    <Container>
        
        <LeftSideContainer>
            <ContainerLeft>
                <div>
                    <h1>Linkr</h1>
                </div>
                <div>
                <h3>save, share and discover the best links on the web</h3>
                </div>
            </ContainerLeft>
        </LeftSideContainer>
        
        <RightSideContainer>
        <form onSubmit={enviarCadastro}>
            
            <MyWalletLogo />
        
            <input placeholder="e-mail" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input placeholder="password" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)}/>
            <input placeholder="username" type="text"  value={userName} onChange={e => setUserName(e.target.value)}/>
            <input placeholder="pictureUrl" type="text" value={pictureUrl} onChange={e => setPictureUrl(e.target.value)}/>
            <button data-test='sign-up-submit'>Sign Up</button>
    
        </form>

        <Link to={'/'}>
            Switch back to log in
        </Link>
        </RightSideContainer>

       
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    height: 100vh;
    width:100vw;
`   
const LeftSideContainer = styled.section`
    display:flex;
    justify-content: center;
    align-items: center;
    //height:100vh;
    width: 65%;
    background-color: black; 

`
const ContainerLeft = styled.section`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 80%;
    height: 40%;
    color:white;
    font-weight: 700;
    margin-bottom: 120px;
    
    

    div:nth-child(1){
        width: 500px;
        height: 70px;
        margin-bottom: 100px;
    
    }
    div:nth-child(2){
        width: 500px;
        height: 117px;
        line-height: 45px;
        
       
    }
    h1{
           font-size: 106px;
    }
    h3{
           font-size: 43px;
    }
`
const RightSideContainer = styled.section`
  width: 30%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  input{
    width:80%
  }
  button{
    width:80%;
  }
  
`
