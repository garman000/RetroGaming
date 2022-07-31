import React, { useState } from "react";
import { signup, login } from "../services/server";
import AuthContext from "../contexts/AuthContext";

function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  async function onLogin(email, pwd) {
    const responseData = await login(email, pwd);
    setActiveUser(responseData.user);
  }

  function onLogout() {
    setActiveUser(false);
  }

  async function onSignUp(signUpDataObj) {
    const responseData = await signup(signUpDataObj);
    if (responseData.status === "ok") setActiveUser(responseData.user);
    return responseData;
  }

  return (
    <AuthContext.Provider value={{ activeUser, onLogin, onLogout, onSignUp }}>
      {isAuthLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
