import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import "./styles.css";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

function CadastroAnuncio({ closeModal }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [imagem, setImagem] = useState(null);

  const handleImagemChange = (e) => {
    const selectedImage = e.target.files[0];
    setImagem(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("localizacao", localizacao);
    formData.append("imagem", imagem);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/anuncios",
        formData
      );
      if (response.status === 201) {
        // O anúncio foi criado com sucesso
        closeModal();
        setTitulo("");
        setDescricao("");
        setLocalizacao("");
        setImagem(null);
      }
    } catch (error) {
      console.error("Erro ao adicionar o anúncio:", error);
    }
  };

  return (
    <Modal isOpen={true} onRequestClose={closeModal} style={customModalStyles}>
      <div className="modal-content">
        <h2 className="modal-title">Cadastro de Anúncio</h2>
        <form onSubmit={handleSubmit}>
          <label className="modal-label">Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="modal-input"
          />

          <label className="modal-label">Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="modal-input"
          />

          <label className="modal-label">Localização:</label>
          <input
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className="modal-input"
          />

          <label className="modal-label">Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
            className="modal-input"
          />

          {imagem && (
            <img
              src={URL.createObjectURL(imagem)}
              alt="Imagem do Anúncio"
              className="modal-img"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}

          <button type="submit" className="modal-button">
            Salvar
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default CadastroAnuncio;
