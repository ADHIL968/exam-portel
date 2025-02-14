const jwt = require('jsonwebtoken')

const createToken = (user) => {
    return jwt.sign({username : user}, process.env.PASSKEY)
}

module.exports = createToken