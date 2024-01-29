const mysql = require('mysql2');


const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '!e1969',
    database: 'cadastro'
});

conexao.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

class Tabelas {
    constructor(conexao) {
        this.conexao = conexao;
    }

    criarTabelaDeusuariosLinkCort() {
        const sql = `
            CREATE TABLE IF NOT EXISTS usuariosLinkCort (
            id INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(40),
            email VARCHAR(40),
            senha VARCHAR(40),
            PRIMARY KEY (id)
            ) DEFAULT CHARSET = utf8mb4 ;
        `;
        this.conexao.query(sql, (error) => {
            if (error) {
                console.log('Erro na criação da tabela:', error.message);
                return;
            } else {
                console.log('Tabela criada com sucesso');
            }
        });
    }
}

module.exports = {
    conexao,
    Tabelas
};
