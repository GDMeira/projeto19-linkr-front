import React from 'react'

import { createContext, useState } from "react";

const AuthContext = createContext();
//const AuthContext = createContext();

export function AuthProvider({ children }) {
  const persistedAuth = JSON.parse(localStorage.getItem("auth"));
  const persistedUser = JSON.parse(localStorage.getItem("user"));
  const [auth, setAuth] = useState(persistedAuth);
  const [user, setUser] = useState(persistedUser);
  //const getToken = (token) => {setToken(token)};

  function login(authData) {
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
  }

  function localUser(user) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return (
    <AuthContext.Provider value={{ auth, login, user, localUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;