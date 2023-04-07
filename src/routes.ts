import express from "express"
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');
import { User } from "./models/User"




export const routes = express.Router()

 

//Rota para cadastrar usuário
routes.post('/register', async (req, res) => {

    const { name, email, password, confirmPassword } = req.body
    const saltRounds = 10;

    if (password.length < 6 || password.length > 16) {
        return res.status(400).json({ message: 'A senha deve ter entre 6 e 16 caracteres.' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, saltRounds);

    try {
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
        });
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(409).json({ error: "Email já existe" });
    }
}) 







routes.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '24h' });
    return res.status(200).json({ token: token });
});
