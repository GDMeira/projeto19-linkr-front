import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import UserContext from "./contexts/UserContext";
import { useState } from "react";
import SigninPage from "./pages/SigninPage/SigninPage";

export default function App() {
  const [user, setUser] = useState(0);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<SigninPage />} />
          <Route path={'/home'} element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
  );
}
