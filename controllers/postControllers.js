const prisma = require('../prisma/index')
//create a new post
exports.createPost = async(req,res,next)=>{
    try{
        const {title,body ,authorId} = req.body;

        const newPost = await prisma.post.create({
            data:{
                title,
                body,
                author:{connect:{id:authorId}} //to connect with user schema we makeing a connection
            }
        })
        res.json(newPost)
    }catch(error){
        throw new Error(error)
    }
}

exports.updatePost = async(req,res,next)=>{

    const {id} = req.params
    const {title,body} = req.body

    try{
        const result = await prisma.post.update({
            where:{id:id}, //id:searching in database , id:extracted from url
            data:{
                title:title,
                body:body
            }
        })
        res.json(result)
    }catch(error){
        res.json({error:`post with ${id} does not exist`})
    }
}

exports.deletePost = async(req,res,next)=>{

    const {id} = req.params

    try{
        const result = await prisma.post.delete({
            where:{id:id}, //id:searching in database , id:extracted from url
        })
        res.json(result)
    }catch(error){
        res.json({error:`post with ${id} does not exist`})
    }
}

exports.getAllPost = async(req,res,next)=>{

    try{
        const result = await prisma.post.findMany()
        res.json(result)
    }catch(error){
        res.json({error:`post with ${id} does not exist`})
    }
}