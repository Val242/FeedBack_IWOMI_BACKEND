const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            message : 'No token provided'
        })
    }

    const token = authHeader.split(' ')[1];
    //The header usually looks like: "Bearer eyJhbGciOi...".
    //Splitting by space gives an array: ["Bearer", "eyJhbGciOi..."].
    //We take the second element, the token string itself.

     if (!token) {
    return res.status(401).json({ error: 'No token found in header' });
  }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.admin = decoded
        next()
 }catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

}
module.exports = authMiddleware;