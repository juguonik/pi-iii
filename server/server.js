const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config({ path: path.join(__dirname, "./.env") });
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// Middleware carregar arquivos estáticos
app.use("/imagens", express.static(path.join(__dirname, "imagens")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "imagens"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/registro", (req, res) => {
  const { nome, email, nomeUsuario, senha } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE nomeUsuario = ?",
    [nomeUsuario],
    (err, results) => {
      if (err) {
        console.error("Erro ao buscar usuário no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }

      if (results.length > 0) {
        return res.status(400).json({ mensagem: "Nome de usuário já em uso." });
      }

      db.query(
        "INSERT INTO usuarios (nome, email, nomeUsuario, senha) VALUES (?, ?, ?, ?)",
        [nome, email, nomeUsuario, senha],
        (err, result) => {
          if (err) {
            console.error("Erro ao inserir usuário no banco de dados:", err);
            return res
              .status(500)
              .json({ mensagem: "Erro interno do servidor." });
          }
          return res
            .status(201)
            .json({ mensagem: "Usuário registrado com sucesso." });
        }
      );
    }
  );
});

app.post("/api/login", (req, res) => {
  const { nomeUsuario, senha } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE nomeUsuario = ? AND senha = ?",
    [nomeUsuario, senha],
    (err, results) => {
      if (err) {
        console.error("Erro ao buscar usuário no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ mensagem: "Nome de usuário ou senha incorretos." });
      }
      const token = generateId();
      return res.status(200).json({ mensagem: "Login bem-sucedido", token });
    }
  );
});

app.get("/api/anuncios", (req, res) => {
  db.query("SELECT * FROM anuncios", (err, results) => {
    if (err) {
      console.error("Erro ao buscar anúncios no banco de dados:", err);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
    return res.status(200).json(results);
  });
});

// Rota para upload de imagem
app.post("/api/upload", upload.single("imagem"), (req, res) => {
  const imagemPath = "/imagens/" + req.file.filename; // Salva o caminho relativo
  res.json({ imagemPath });
});

// Rota para criação de anúncios
app.post("/api/anuncios", (req, res) => {
  const { titulo, descricao, localizacao, imagem } = req.body;
  // Formata o caminho da imagem para que seja relativo à rota '/imagens'
  const imagemMiniatura = "/imagens/" + path.basename(imagem);

  db.query(
    "INSERT INTO anuncios (titulo, descricao, localizacao, imagemMiniatura) VALUES (?, ?, ?, ?)",
    [titulo, descricao, localizacao, imagemMiniatura],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir anúncio no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }
      return res.status(201).json({ mensagem: "Anúncio criado com sucesso." });
    }
  );
});

app.post("/api/mensagens", (req, res) => {
  const { anuncioId, remetente, texto } = req.body;

  const novaMensagem = {
    id: generateId(),
    anuncioId,
    remetente,
    texto,
  };

  db.query(
    "INSERT INTO mensagens (anuncioId, remetente, texto) VALUES (?, ?, ?)",
    [anuncioId, remetente, texto],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir mensagem no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }
      return res
        .status(201)
        .json({ mensagem: "Mensagem de interesse criada com sucesso." });
    }
  );
});

app.get("/api/mensagens/:anuncioId", (req, res) => {
  const anuncioId = req.params.anuncioId;

  db.query(
    "SELECT * FROM mensagens WHERE anuncioId = ?",
    [anuncioId],
    (err, results) => {
      if (err) {
        console.error("Erro ao buscar mensagens no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }
      return res.status(200).json(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
