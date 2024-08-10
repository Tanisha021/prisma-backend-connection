//to if we are loggedIn or not

const prisma = require('../prisma/index')
const jwt = require("jsonwebtoken") //inn order to verify the token u have to have token

exports.isLoggedIn = async(req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            res.send('Please Login')
            throw new Error('you are not logged in')//send a response and close next
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await prisma.user.findUnique({
                where: {
                    id: decoded.userId
                }
            });

            if (!req.user) {
                return res.status(401).json({ error: 'User not found' });
            }

            next();
        } catch (jwtError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }catch(error){
        throw new Error(error)
    }
}