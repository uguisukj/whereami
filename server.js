const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar corpos de solicitação JSON
app.use(bodyParser.json());
// Middleware para servir arquivos estáticos (como index.html, etc.)
app.use(express.static('public'));

// Endpoint para registro de novos usuários
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    // Carrega os usuários existentes (se houver) do arquivo users.json
    let users = [];
    try {
        const usersData = fs.readFileSync('users.json');
        users = JSON.parse(usersData);
    } catch (error) {
        console.error('Error reading users file:', error);
    }

    // Verifica se o nome de usuário já está em uso
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Adiciona o novo usuário ao array de usuários
    users.push({ username, password });

    // Salva o array atualizado de usuários de volta no arquivo users.json
    fs.writeFile('users.json', JSON.stringify(users), err => {
        if (err) {
            console.error('Error writing users file:', err);
            return res.status(500).json({ success: false, message: 'Error saving user' });
        }
        res.json({ success: true });
    });
});

// Endpoint para login de usuários existentes
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Carrega os usuários existentes do arquivo users.json
    let users = [];
    try {
        const usersData = fs.readFileSync('users.json');
        users = JSON.parse(usersData);
    } catch (error) {
        console.error('Error reading users file:', error);
        return res.status(500).json({ success: false, message: 'Error reading users file' });
    }

    // Verifica se o usuário existe e se a senha está correta
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Login bem-sucedido
    res.json({ success: true });
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
