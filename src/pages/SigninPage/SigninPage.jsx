import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { API_URL } from "../../routes/routes"
import UserContext from "../../contexts/UserContext"

export default function SignInPage() {

  const [emailLogin, setEmailLogin] = useState('')
  const [senhaLogin, setSenhaLogin] = useState('')
  const [btn, setBtn] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  function login(event) {
    event.preventDefault()
    setBtn(true)// O botao de SignUp fica desabilitado
    const dadosLogin = {
      email: emailLogin,
      password: senhaLogin
    }
    if(senhaLogin !== null && senhaLogin !== '' && emailLogin !== null && emailLogin !== ''){

        axios.post(`${API_URL}/signin`, dadosLogin)
          .then(resposta => {
            
            const { id, userName, token, image} = resposta.data
            setUser({ id, userName, token, image})
            localStorage.setItem('user', JSON.stringify({ id, userName, token, image }))
            navigate('/timeline')
          })
          .catch((error) => {
            console.error()
            setBtn(false)
            alert(error.response.data)
          })
      }else{
        setBtn(false)
        alert('Complete os dados ou se inscreva') 
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
        <form onSubmit={login}>
          
          <input data-test="email" placeholder="E-mail" type="email" value={emailLogin} autoComplete="email" onChange={e => setEmailLogin(e.target.value)} />
          <input data-test="password" placeholder="Senha" required type="password" autoComplete="password" value={senhaLogin} onChange={e => setSenhaLogin(e.target.value)} />
          <Mybutton data-test="login-btn" disabled={btn} style={{opacity: btn ? '.5' : '1'}}>Log In</Mybutton>
        </form>

          <Link to={'/sign-up'} data-test="sign-up-link">
            First time? Create an account! 
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