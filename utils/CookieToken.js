//should be able to generate a cookie-token from that getjwtToken.js
//set it up to cookie
const getJwtToken = require ('../helpers/getjwtTokens')

const cookieToken = (user,res)=>{
    const token = getJwtToken(user.id)
    const options={
        expires:new Date(
            Date.now() + 3*24*60*60*1000
        ),
        //bcoz they are server authenticated cookie or this can we manipulted buy server only
        httpOnly:true,
    }
    user.password=undefined;
    res.status(200).cookie('token',token,options).json({
        success:true,
        token, //we are givin bcoz maybe he wants to use token in some other ways
        user    //maybe he wants to show some avatar or something
    })
}

module.exports = cookieToken