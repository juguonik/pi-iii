import { useState } from "react";
import "./styles.css";

function Mensagens() {
  const [mostrarMensagens, setMostrarMensagens] = useState(false);
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null);
  const [resposta, setResposta] = useState("");
  const [mensagensLocais] = useState([
    {
      id: 1,
      anuncioTitulo: "Anúncio 1",
      remetente: "Usuário 1",
      texto: "Mensagem 1",
    },
    {
      id: 2,
      anuncioTitulo: "Anúncio 2",
      remetente: "Usuário 2",
      texto: "Mensagem 2",
    },
    {
      id: 3,
      anuncioTitulo: "Anúncio 3",
      remetente: "Usuário 1",
      texto: "Mensagem 3",
    },
  ]);

  const handleSelecionarMensagem = (mensagem) => {
    setMensagemSelecionada(mensagem);
  };

  const handleCloseMensagens = () => {
    setMensagemSelecionada(null);
    setMostrarMensagens(false);
  };

  const handleResponder = () => {
    // Aqui você pode implementar a lógica para enviar a resposta
    alert(`Resposta para "${mensagemSelecionada.texto}": ${resposta}`);
    setResposta("");
  };

  return (
    <div className="container">
      <button
        className="minhas-mensagens-button"
        onClick={() => setMostrarMensagens(true)}
      >
        Minhas Mensagens
      </button>
      {mostrarMensagens && (
        <div className="mensagens-container">
          {mensagemSelecionada ? (
            <div className="detalhes-mensagem">
              <div className="mensagem-detalhes">
                <div className="mensagem-remetente">
                  {mensagemSelecionada.remetente}
                </div>
                <div className="mensagem-texto">
                  {mensagemSelecionada.texto}
                </div>
                <form onSubmit={handleResponder}>
                  <textarea
                    value={resposta}
                    onChange={(e) => setResposta(e.target.value)}
                    placeholder="Digite sua resposta..."
                  />
                  <button type="submit">Responder</button>
                </form>
              </div>
              <button
                className="fechar-mensagens-button"
                onClick={handleCloseMensagens}
              >
                Fechar
              </button>
            </div>
          ) : (
            <div className="mensagens-lista">
              {mensagensLocais.map((mensagem) => (
                <div
                  key={mensagem.id}
                  className="mensagem"
                  onClick={() => handleSelecionarMensagem(mensagem)}
                >
                  <div className="remetente">{mensagem.remetente}</div>
                  <div className="texto">
                    Mensagem do usuário {mensagem.remetente}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Mensagens;
