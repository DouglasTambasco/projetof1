const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// Rota de cadastro
router.post('/register', (req, res) => {
    const { nome_completo, usuario, email, senha } = req.body;

    const hash = bcrypt.hashSync(senha, 8);

    const sql = 'INSERT INTO usuarios (nome_completo, usuario, email, senha) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome_completo, usuario, email, hash], (err, result) => {
    if (err) {
        console.error('Erro no cadastro:', err);
        return res.status(500).json({ erro: 'Erro no cadastro', detalhe: err.message });
}

        res.json({ mensagem: 'Usuário cadastrado com sucesso!' });
    });
});

// Rota de login
router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
    db.query(sql, [usuario], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro no login' });
        if (results.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

        const usuarioDB = results[0];
        const senhaValida = bcrypt.compareSync(senha, usuarioDB.senha);

        if (!senhaValida) return res.status(401).json({ erro: 'Senha incorreta' });

        res.json({
            mensagem: 'Login bem-sucedido',
            usuario: usuarioDB.usuario,
            nome_completo: usuarioDB.nome_completo
        });
    });
});

module.exports = router;
