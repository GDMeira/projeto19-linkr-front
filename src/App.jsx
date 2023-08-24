import { BrowserRouter, Routes, Route } from "react-router-dom";
import { styled } from "styled-components";
import HashtagPage from "./pages/HashtagPage/HashtagPage";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SigninPage/SigninPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import PostsContext from "./contexts/PostsContext";
import UserPage from "./pages/UserPage/UserPage";
import { ChakraProvider } from "@chakra-ui/react";



function App() {
  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : undefined);
  const [trending, setTrending] = useState(undefined);
  const [allPosts, setAllPosts] = useState(undefined)

  return (
    <PagesContainer>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <PostsContext.Provider value={{ trending, setTrending, allPosts, setAllPosts }}>
            <ChakraProvider>
              <Routes>
                <Route path="/" element={<SignInPage />} />
                <Route path='/timeline' element={<HomePage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
                <Route path="/user/:id" element={<UserPage />} />


              </Routes>
            </ChakraProvider>
          </PostsContext.Provider>
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