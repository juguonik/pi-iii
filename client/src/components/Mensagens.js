import { useEffect, useState } from "react";
import "./styles.css";

function Mensagens({
  mensagens,
  mensagensChat,
  onClose,
  onResponder,
  isOpen,
  onCloseModal,
}) {
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null);
  const [resposta, setResposta] = useState("");

  const handleSelecionarMensagem = (mensagem) => {
    setMensagemSelecionada(mensagem);
  };

  const handleCloseMensagens = () => {
    setMensagemSelecionada(null);
    onClose();
  };

  const handleResponder = () => {
    onResponder(mensagemSelecionada, resposta);
    setResposta("");
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onCloseModal();
      }
    };

    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-container")) {
        onCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCloseModal]);

  // Função para agrupar as mensagens por remetente
  const agruparMensagensPorRemetente = (mensagens) => {
    const todasAsMensagens = [...mensagens]; // Inicia com as mensagens locais
    if (Array.isArray(mensagensChat)) {
      // Verifica se mensagensChat é um array
      todasAsMensagens.push(...mensagensChat); // Concatena mensagens locais e do chat
    }
    const mensagensAgrupadas = {};
    todasAsMensagens.forEach((mensagem) => {
      const remetente = mensagem.remetente;
      if (!mensagensAgrupadas[remetente]) {
        mensagensAgrupadas[remetente] = [];
      }
      mensagensAgrupadas[remetente].push(mensagem);
    });
    return mensagensAgrupadas;
  };

  return isOpen ? (
    <div className="modal-container">
      <div className="modal-content mensagens">
        <h2 className="modal-title">Minhas Mensagens</h2>
        {mensagemSelecionada ? (
          <div className="detalhes-mensagem">
            <div className="mensagem-detalhes">
              <div className="mensagem-remetente">
                {mensagemSelecionada.remetente}
              </div>
              <div className="mensagem-texto">{mensagemSelecionada.texto}</div>
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
            {Object.entries(agruparMensagensPorRemetente(mensagens)).map(
              ([remetente, mensagensDoRemetente]) => (
                <div key={remetente}>
                  <div className="remetente">{remetente}</div>
                  {mensagensDoRemetente.map((mensagem, index) => (
                    <div
                      key={index}
                      className="mensagem"
                      onClick={() => handleSelecionarMensagem(mensagem)}
                    >
                      <div className="texto">{mensagem.texto}</div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  ) : null;
}

export default Mensagens;
