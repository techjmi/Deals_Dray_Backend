const jwt= require('jsonwebtoken')

const verifyToken=async(req,res, next)=>{
    const token= req.cookies.deal_token
    // console.log('the  token is', token)
    try {
        if (!token) {
            return res.status(403).json({ message: "You are not allowed to do this, Please Login First!" });
        }
        //if  token is present then verify it
        jwt.verify(token, process.env.JWT_SECRET,(err, user)=>{
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            req.user=user
            next()
        })
    } catch (error) {
        console.error('Error in verifyToken middleware:', error);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports= verifyToken