import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

function Mensagens() {
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/mensagens")
      .then((response) => {
        setMensagens(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar mensagens:", error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="modal-title">Minhas Mensagens</h2>
      {mensagens.length > 0 ? (
        <ul>
          {mensagens.map((mensagem) => (
            <li key={mensagem.id}>
              <strong>Anúncio:</strong> {mensagem.anuncioTitulo}
              <br />
              <strong>De:</strong> {mensagem.remetente}
              <br />
              <strong>Mensagem:</strong> {mensagem.texto}
            </li>
          ))}
        </ul>
      ) : (
        <p>Você não tem mensagens.</p>
      )}
    </div>
  );
}

export default Mensagens;
