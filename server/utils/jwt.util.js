const jwt = require("jsonwebtoken");
const jwtSecret = require("../keys/jwt.keys");

const checkToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    /*if token exists*/
    if (token) {
        if (token.startsWith("Bearer ")) {
            /*Remove Bearer from string*/
            token = token.slice(7, token.length);
        }
        /*verify token*/
        // verify makes sure that the token hasn't expired and has been issued by us
        jwt.verify(token, jwtSecret.secret, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Token is not valid",
                });
            } else {
                /*if token is valid*/
                req.token = decoded;
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: "Authentication error: Auth token is not supplied",
        });
    }
};

module.exports = {
    checkToken,
};
