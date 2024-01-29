// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { conexao, Tabelas } = require('./infra/conexao');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const tabelas = new Tabelas(conexao);
tabelas.criarTabelaDeusuariosLinkCort();

app.post('/submit', (req, res) => {
    const { name, email, password } = req.body;

    conexao.query(
        'INSERT INTO usuariosLinkCort (nome, email, senha) VALUES (?, ?, ?)',
        [name, email, password],
        (err, results) => {
            if (err) {
                console.error('Erro ao inserir dados no banco de dados:', err);
                res.status(500).send('Erro ao salvar os dados no banco de dados');
                return;
            }

            console.log('Dados inseridos com sucesso no banco de dados');
            res.status(200).send('Dados recebidos com sucesso!');
        }
    );
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    conexao.query(
        'SELECT * FROM usuariosLinkCort WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados:', err);
                res.status(500).json({ message: 'Erro ao autenticar. Tente novamente.' });
                return;
            }

            if (results.length > 0) {
                const usuario = results[0];

                if (senha === usuario.senha) {
                    res.status(200).json({ message: 'Login bem-sucedido!' });
                } else {
                    res.status(401).json({ message: 'Senha incorreta. Tente novamente.' });
                }
            } else {
                res.status(401).json({ message: 'Usuário não encontrado. Tente novamente.' });
            }
        }
    );
});
const urlMapping = {};

// Função para encurtar a URL
function shortenURL(longURL) {
  const shortPath = crypto.createHash('md5').update(longURL).digest('hex').slice(0, 6);
  const shortURL = `http://localhost:${PORT}/${shortPath}`;
  urlMapping[shortPath] = longURL;
  return shortURL;
}

// Rota para encurtar uma URL
app.post('/shorten', express.json(), (req, res) => {
  const longURL = req.body.long_url;

  if (!longURL) {
    return res.status(400).json({ error: 'Por favor, forneça uma URL longa.' });
  }

  const shortURL = shortenURL(longURL);
  res.json({ short_url: shortURL });
});

// Rota para redirecionar para a URL original
app.get('/:shortPath', (req, res) => {
  const longURL = urlMapping[req.params.shortPath];

  if (longURL) {
    res.redirect(302, longURL);
  } else {
    res.status(404).send('URL não encontrada.');
  }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});  
process.on('SIGINT', () => {
    console.log('Encerrando o servidor e fechando a conexão ao banco de dados');
    conexao.end();
    process.exit();
});
