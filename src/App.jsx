import { BrowserRouter,Routes,Route } from "react-router-dom";
import { styled } from "styled-components";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import UserProvider from "./Contex/UserContext";
import TokenProvider from "./Contex/TokenContext";
import HashtagPage from "./pages/HashtagPage/HashtagPage";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";

function App() {
  return (
    <PagesContainer>
    <BrowserRouter>
    <TokenProvider>
      <UserProvider>
        <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path ='/home' element={<HomePage/>}/>
        <Route path="/cadastro" element={<SignUpPage />} /> 
        <Route path="/hashtag/:hashtag" element={<HashtagPage />} /> 
         
        
        </Routes>
      </UserProvider>
    </TokenProvider>
    </BrowserRouter>
  </PagesContainer>
  );
}

export default App;

const PagesContainer = styled.main`
  background-color: #333333;
  width: 100vw;
  max-height: 100vh;
  
`
//background-color: #8c11be;width: calc(100vw - 50px);