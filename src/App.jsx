import { BrowserRouter,Routes,Route } from "react-router-dom";
import { styled } from "styled-components";
import HashtagPage from "./pages/HashtagPage/HashtagPage";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import SignInPage from "./pages/SigninPage/SigninPage";

function App() {
  const [user, setUser] = useState(undefined);

  return (
    <PagesContainer>
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path ='/home' element={<HomePage />}/>
        <Route path="/cadastro" element={<SignUpPage />} /> 
        <Route path="/hashtag/:hashtag" element={<HashtagPage />} /> 
         
        
        </Routes>
      </UserContext.Provider>
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