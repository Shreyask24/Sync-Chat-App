import { compare } from "bcrypt"
import User from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const expireTime = 3 * 24 * 6 * 60 * 1000

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: expireTime })
}

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send("Email & Password is required")
        }

        const user = await User.create({
            email, password
        })

        res.cookie("jwt", createToken(email, user._id), {
            expireTime,
            secure: true,
            sameSite: "None"
        });

        return res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send("Email & Password is required")
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).send("User with the given email not found")
        }

        const auth = await compare(password, user.password)

        if (!auth) {
            return res.status(404).send("Password is incorrect")
        }

        res.cookie("jwt", createToken(email, user._id), {
            expireTime,
            secure: true,
            sameSite: "None"
        });

        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            }
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
}

export const getUserInfo = async (req, res, next) => {
    try {
        const userData = User.findById(req.userId)

        if (!userData) return res.status(404).send("User with the given ID not found")

        return res.status(200).json({
            id: userData._id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }

}