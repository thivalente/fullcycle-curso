const express = require('express');
const mysql = require('mysql2');
const Chance = require('chance');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

const checkAndCreateTable = () => {
  connection.query(`
    SELECT COUNT(*) AS count 
    FROM information_schema.tables 
    WHERE table_schema = 'nodedb' 
    AND table_name = 'people';
  `, (err, results) => {
    if (err) {
      console.error('Erro ao verificar a tabela:', err);
      return;
    }

    const tableExists = results[0].count > 0;

    if (!tableExists) {
      connection.query(`
        CREATE TABLE people (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255)
        );
      `, (err) => {
        if (err) {
          console.error('Erro ao criar a tabela:', err);
          return;
        }
        console.log('Tabela "people" criada com sucesso.');
      });
    }
  });
};

checkAndCreateTable();

// Função para gerar um nome brasileiro aleatório
const chance = new Chance();
const firstNames = [
  'Ana', 'Beatriz', 'Carlos', 'Daniel', 'Eduarda', 'Felipe', 'Gabriela', 'Henrique', 'Isabela', 'João', 'Larissa', 'Marcos', 'Nathalia', 'Otávio', 'Paula', 'Ricardo', 'Sofia', 'Tiago', 'Vitoria', 'Wesley'
];

const lastNames = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Almeida', 'Costa', 'Gomes', 'Martins', 'Araújo', 'Melo', 'Barbosa', 'Ribeiro', 'Alves', 'Pereira', 'Lima', 'Carvalho', 'Teixeira', 'Rocha'
];

// Função para gerar um nome brasileiro aleatório
const generateRandomName = () => {
  const firstName = chance.pickone(firstNames);
  const lastName = chance.pickone(lastNames);
  return `${firstName} ${lastName}`;
};

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Full Cycle Rocks</title>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            fetch('/get-names')
              .then(response => response.json())
              .then(data => {
                const list = document.getElementById('name-list');

                if (data.length === 0) {
                  list.innerHTML = '<li>Nenhum nome na lista</li>';
                } else {
                  list.innerHTML = data.map(name => \`<li>\${name}</li>\`).join('');
                }

                const h2 = document.getElementById('h2-subtitle');
                h2.innerHTML = 'Lista de Nomes';
              })
              .catch(error => {
                console.log(error);
                document.getElementById('name-list').innerHTML = '<li>Erro ao carregar os nomes</li>';
              });

            document.getElementById("add").addEventListener("click", function() {
              fetch('/add-name', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                  console.log(data.message);
                  location.reload();
                })
                .catch(error => {
                  console.log(error);
                  alert('Erro ao adicionar nome');
                });
            });

            document.getElementById("clear").addEventListener("click", function() {
              fetch('/clear-names', { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                  console.log(data.message);
                  location.reload();
                })
                .catch(error => {
                  console.log(error);
                  alert('Erro ao limpar lista');
                });
            });
          });
        </script>
      </head>
      <body>
        <h1>Full Cycle Rocks!</h1>
        <h2 id="h2-subtitle">Carregando a lista de nomes...</h2>
        <button id="add">Adicionar Novo Nome</button>
        <button id="clear">Limpar Lista</button>
        <ul id="name-list"></ul>
      </body>
    </html>
  `);
});

app.post('/add-name', (req, res) => {
  const sql = `INSERT INTO people (name) VALUES ('${generateRandomName()}')`;

  connection.query(sql, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao adicionar nome' });
    }
    res.status(200).json({ message: 'Nome adicionado com sucesso' });
  });
});

app.delete('/clear-names', (req, res) => {
  const sql = 'DELETE FROM people';

  connection.query(sql, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao limpar lista' });
    }
    res.status(200).json({ message: 'Lista limpa com sucesso' });
  });
});

app.get('/get-names', (req, res) => {
  const query = 'SELECT name FROM people ORDER BY name;';

  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao executar a query' });
    }

    const names = results.map(person => person.name);
    res.json(names);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`)
})