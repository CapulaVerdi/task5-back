import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import router from './routes.js'

const app = express()

app.use(cors())
app.use(express.json());
app.use('/', router)

app.listen(process.env.PORT, () => {console.log(`Server starts at port: ${process.env.PORT}`)})
