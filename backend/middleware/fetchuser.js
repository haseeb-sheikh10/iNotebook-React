const jwt = require('jsonwebtoken');
const JWT_Secret = "This is iNotebook's backend";

const fetchUser = (req, res, next) => {
    
    //Get the user from JWT token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    
    try {
        const data = jwt.verify(token, JWT_Secret);
        req.user = data.user;
        // res.send(data.user);
        next();

    } catch (error) {
        res.status(401).send({ error: "Internal server error" });
    }

}

module.exports = fetchUser;