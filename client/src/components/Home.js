"use client";
import { useState } from "react";
import Feed from "./Feed";
import Login from "./Login";
import Registro from "./Registro";
import "./styles.css";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="container">
      {!isAuthenticated ? (
        <div>
          <h1 className="feed-header">Área de Login / Registro</h1>
          <Login onLogin={login} />
          <Registro />
        </div>
      ) : (
        <div>
          <h1 className="feed-header">
            Sistema para troca de jogos / brinquedos
          </h1>
          <Feed />
        </div>
      )}
    </div>
  );
}

export default Home;
