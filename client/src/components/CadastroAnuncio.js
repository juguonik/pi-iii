import axios from "axios";
import { useRef, useState } from "react";
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

function CadastroAnuncio({ setAnuncios, closeModal }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [imagem, setImagem] = useState(null);
  const form = useRef();

  const handleImagemChange = (e) => {
    const selectedImage = e.target.files[0];
    setImagem(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const titulo = formData.get("titulo");
    const descricao = formData.get("descricao");
    const localizacao = formData.get("localizacao");
    const imagem = formData.get("imagem");

    try {
      const response = await axios.post("http://localhost:3001/api/anuncios", {
        titulo,
        descricao,
        localizacao,
        imagem: imagem.name,
      });
      console.log(imagem.name);

      if (response.status === 201) {
        closeModal();
        setTitulo("");
        setDescricao("");
        setLocalizacao("");
        setImagem(null);

        // Após o cadastro, carregamos os anúncios novamente para atualizar a lista
        const anuncios = await carregarAnuncios();
        setAnuncios(anuncios);
      }
    } catch (error) {
      console.error("Erro ao adicionar o anúncio:", error);
    }
  };

  const carregarAnuncios = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/anuncios");
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar anúncios:", error);
      return [];
    }
  };

  return (
    <Modal isOpen={true} onRequestClose={closeModal} style={customModalStyles}>
      <div className="modal-content">
        <h2 className="modal-title">Cadastro de Anúncio</h2>
        <form onSubmit={handleSubmit} id="cadastro-anuncio" ref={form}>
          <label className="modal-label">Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="modal-input"
            name="titulo"
          />

          <label className="modal-label">Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="modal-input"
            name="descricao"
          />

          <label className="modal-label">Localização:</label>
          <input
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className="modal-input"
            name="localizacao"
          />

          <label className="modal-label">Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
            className="modal-input"
            name="imagem"
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
