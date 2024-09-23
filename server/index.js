import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/AuthRoute.js"

dotenv.config();

const app = express()
const port = process.env.PORT || 3001
const databaseURL = process.env.DATABASE_URL

const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ["POST", "PATCH", "PUT", "GET", "DELETE"],
    credentials: true
}

app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)

const server = app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`)
})

mongoose.connect(databaseURL).then(() => console.log("Database Connected Successfully.")).catch((err) => console.log(err.message))