//bring in prisma and cookie

const prisma = require('../prisma/index')
const cookieToken = require('../utils/CookieToken')

//user signup
exports.signUp = async(req,res,next)=>{
    try{
        const {name,password,email} = req.body;
        //check
        if(!name || !password || !email){
            throw new Error("please provide all the fields");
        }

        const user = await prisma.user.create({
            data:{
                name,
                password,
                email,
            }
        })
        //What is the need to create user
        //Flow: take input from user,give him a json token ,store that json token to users cookie

        cookieToken(user,res);

    }catch(error){
        //throw new Error(error)
        next(error);
    }
}

exports.login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            throw new Error('Please provide email and passoword')

        }

        //find user based on email
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!user){
            throw new Error('User not found')
        }
        //password mismatch
        if(user.password!==password){
            throw new Error('passowrd does not match')
        }

        //user is there and validated
        cookieToken(user,res)

    }catch(error){
        //throw new Error(error)
        next(error);
    }
}

exports.logout = async(req,res,next)=>{
    try{
        //clear the cookies
        res.clearCookie('token')
        res.status({
            success:true
        })
    }catch(error){
        //throw new Error(error)
        next(error);
    }
}