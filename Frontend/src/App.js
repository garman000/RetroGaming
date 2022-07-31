import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./components/AuthProvider";
import React, { useState } from "react";
import Play from "./components/Play";
import Game from "./components/Game";
import "./scss/app.css";

function App() {
  const [myChoice, setMyChoice] = useState("");
  const [score, setScore] = useState(0);

  return (
    <div style={{ height: "100%" }}>
      <AuthProvider>
        <NavBar />
        {/* <Header score={score} /> */}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Play setMyChoice={setMyChoice}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/play"
            element={
              <ProtectedRoute>
                <Game myChoice={myChoice} score={score} setScore={setScore} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
