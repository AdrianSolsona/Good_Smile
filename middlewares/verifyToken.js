const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {

        const authorization = req.headers.authorization;

        //if the authorization with the token exists
        if (!authorization) {
            return res.send('Invalid token');
        }
        //Separate the token from the bearer
        const [strategy, token] = authorization.split(" ");
        //Verify the token with your secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;
        req.rolId = decoded.rolId;
        req.email = decoded.email;

        next();
        //Pick up the possible error
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = verifyToken;