const mongoose = require('mongoose');
import * as dotenv from 'dotenv' 
dotenv.config()

const dataBase = process.env.URL_DB

export async function connect(){
    try {
        const connection = await mongoose.connect(dataBase);
        console.log("Conectado ao banco de dados")
    } catch (error) {
        console.log(error, "Erro ao conectar com o banco de dados")
    }
}

