const express = require('express');
const jwt = require('jsonwebtoken');
const authRouter = express();

const user = {
    id: 10,
    name: "Rasul",
    age: 22,
    address: "Tashkent",
    url: "Hen...",
};

authRouter.post('/login', (req, res) => {
    try {
        const { name, pass } = req.body;
        
        if (name !== user.name) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = jwt.sign({ userName: name, age: user.age }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

authRouter.get('/profile', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 

        const decoded = jwt.verify(token, 'your-secret-key');
        
        res.status(200).json({ data: decoded,
            token: token });
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token or token expired' });
    }
});

module.exports = authRouter;