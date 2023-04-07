import express from "express"
import bcrypt from "bcrypt";
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