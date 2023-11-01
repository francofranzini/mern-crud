import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import { createAccessToken } from "../libs/jwt.js"
export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {

        const passHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username: username,
            email: email,
            password: passHash,
        });

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id })
        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
        })
    } catch (error) {
        res.send(400).json({error: error})
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(400).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" })

        const token = await createAccessToken({ id: userFound._id })
        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
        })
    } catch (error) {
        console.log(error)
    }
}
export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200)
}
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "user not found" })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
    })
}