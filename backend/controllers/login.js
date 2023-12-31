const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const data = req.body
    const user = await User.findOne({ username: data.username })
    const passwordOk = user === null
        ? false
        : await bcrypt.compare(data.pass, user.passHash)

    if (!(user && passwordOk)) {
        return res.status(401).json({
            error: 'Wrong password or username'
        })
    }

    const userToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET)

    res.status(200).send({
        token, username: user.username, name: user.name
    })
})

module.exports = loginRouter