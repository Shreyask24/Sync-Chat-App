import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/AuthRoute.js"
import contactRoutes from "./routes/ContactRoutes.js"
import setupSocket from "./socket.js"

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

app.use("/uploads/profiles", express.static("uploads/profiles"))

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/contacts", contactRoutes)

const server = app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`)
})

setupSocket(server)

mongoose.connect(databaseURL).then(() => console.log("Database Connected Successfully.")).catch((err) => console.log(err.message))