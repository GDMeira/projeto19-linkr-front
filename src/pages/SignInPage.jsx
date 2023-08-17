import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { TokenContext } from "../Contex/TokenContext"
import { UserContext } from "../Contex/UserContext"



export default function SignInPage() {
  
  const [emailLogin, setEmailLogin] = useState('')
  const [senhaLogin, setSenhaLogin] = useState('')
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const {token} = useContext(TokenContext)
 function login(event){
    event.preventDefault()
    const dadosLogin ={
      email:emailLogin,
      senha:senhaLogin
    }
      console.log(dadosLogin)
      axios.post("https://localhost:5001/signin", dadosLogin)
      .then(resposta => {
        
          const {nome, token, _id} = resposta.data
          setUser({nome,token, _id})
          localStorage.setItem('user', JSON.stringify({nome, token,_id}))
          navigate('/cadastro')
       
       
      }) 
      .catch((error) => {
        if(!token){
          alert(error.response)
          navigate('/')
        }else{
          alert(error.response)
        }
        
      })
    
   

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
            <MyWalletLogo />
            <input  placeholder="E-mail" type="email" value={emailLogin} onChange={e =>setEmailLogin(e.target.value)}/>
            <input  placeholder="Senha" required type="password" autoComplete="new-password" value={senhaLogin} onChange={e => setSenhaLogin(e.target.value)}/>
            <button>Log In</button>
          </form>

          <Link to={'/cadastro'}>
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
    line-height: 26px;
    

    div:nth-child(1){
        width: 500px;
        height: 70px;
    
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
  width: 35%;
  display: flex;
  box-sizing: content-box;
  margin: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form{
    width: 80%;
  }
`
