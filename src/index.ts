import * as dotenv from 'dotenv'
import cors from "cors"
import express from "express"
import { connect } from './database'
dotenv.config()
import {routes} from "./routes"


const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(routes)


connect()

app.listen(port, () => {
    console.log(`Escutando na porta: ${port}`)
})