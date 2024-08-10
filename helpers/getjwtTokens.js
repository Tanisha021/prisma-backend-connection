const jwt = require('jsonwebtoken')

const getJwtToken=(userId)=>{
    return jwt.sign({userId:userId},process.env.JWT_SECRET,{expiresIn:'1 day'}) //process.env.JWT_SECRET likh pa rahe bcoz of dependecy 
                                                                                //dotenv
}
module.exports = getJwtToken;