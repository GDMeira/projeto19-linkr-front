import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { API_URL } from "../../routes/routes"

export default function SignUpPage() {
  
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [pictureUrl,setPictureUrl] = useState('')
  const [btn, setBtn] = useState(false)
  const navigate = useNavigate()
  function enviarCadastro(event){
    event.preventDefault();
      setBtn(true)// O botao de SignUp fica desabilitado
      let dadosCadastro = {
        email,
        password,
        userName,
        pictureUrl 
      }
     
      
      if(password !== null && password !== '' && email !== null && email !== '' && userName !== null && userName !== ''){
        
        axios.post(`${API_URL}/signup`, dadosCadastro)
        .then((resposta) =>{
          if(resposta){
            
            navigate('/')
          }

          }) 
        .catch((error) =>{
          setBtn(false)
          alert(error.response)
        })
        

      }else{
        setBtn(false)
        navigate('/')
        alert('Complete todos os dados') 
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
            
        
            <input data-test="email" placeholder="e-mail" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input data-test="password" placeholder="password" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)}/>
            <input data-test="username" placeholder="username" type="text"  value={userName} onChange={e => setUserName(e.target.value)}/>
            <input data-test="picture-url" placeholder="pictureUrl" type="text" value={pictureUrl} onChange={e => setPictureUrl(e.target.value)}/>
            <Mybutton data-test="sign-up-btn" disabled={btn} style={{opacity: btn ? '.5' : '1'}}>Sign Up</Mybutton>
    
        </form>

        <Link to={'/'} data-test="login-link">
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

const Mybutton = styled.button`

`
