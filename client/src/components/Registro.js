import axios from "axios";
import { useState } from "react";
import "./styles.css";

function Registro({ onRegister, onSwitchToLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegistro = () => {
    const registroData = {
      nome: nome,
      email: email,
      nomeUsuario: nomeUsuario,
      senha: senha,
    };

    axios
      .post("http://localhost:3001/api/registro", registroData)
      .then((response) => {
        alert("Registro bem-sucedido");
        onRegister();
      })
      .catch((error) => {
        console.error("Erro no registro:", error);
      });
  };

  return (
    <div className="container">
      <h2 className="modal-title">Registro</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="modal-input"
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="modal-input"
      />
      <input
        type="text"
        placeholder="Nome de Usuário"
        value={nomeUsuario}
        onChange={(e) => setNomeUsuario(e.target.value)}
        className="modal-input"
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="modal-input"
      />
      <button onClick={handleRegistro} className="modal-button">
        Registrar
      </button>
      <p>
        Já tem uma conta?{" "}
        <span className="modal-link" onClick={onSwitchToLogin}>
          Faça login
        </span>
      </p>
    </div>
  );
}

export default Registro;
