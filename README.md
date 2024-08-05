# Curso Fullcycle

Repositório para as atividades do curso Fullcycle 3.0

## Exercícios Docker

### Go

**Objetivo do exercício**

1. Criar uma imagem docker que execute um comando usando Go e imprima: Full Cycle Rocks!!
2. Subir esta imagem para o docker hub
3. Restrição: Esta imagem deve ter, no máximo, 2MB

**Solução**

Para executar: ``` docker run --rm thivalente/fullcycle ```

### Nginx com Node.js

**Objetivo do exercício**

1. Criar uma imagem docker com Nginx
2. Criar outra imagem docker com Node.js
3. Criar outra imagem com banco de dados mysql - deverá existir um banco de dados com uma tabela chamada people (id int, nome varchar 255)
4. Quando o usuário acessar a aplicação node disponível na porta: 8080, o sistema deverá listar os nomes na tabela e abrir uma página com:
```
<h1>Full Cycle Rocks!</h1>
- Lista de nomes cadastrada no banco de dados.
```
5. Subir esta imagem para o docker hub
6. Restrições:
    1. Deverá existir um docker compose e ser possível subir todo o ambiente com docker-compose up -d
    2. Deverá existir um volume para armazenar o banco de dados

**Solução**

Para executar: ``` docker compose up -d ```