const AuthCookies = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).send('Unauthorized')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Forbidden')
        }
        req.user = user
        next()
    })
}

module.exports = AuthCookies
