const express = require('express')
const router = express.Router();
const  {isLoggedIn} = require('../middlewares/isLoggedIn')
const {createPost,updatePost,deletePost,getAllPost} = require('../controllers/postControllers')

router.route('/post/create').post(isLoggedIn,createPost)
router.route('/post/update/:id').put(isLoggedIn,updatePost)
router.route('/post/delete/:id').delete(isLoggedIn,deletePost)
router.route('/post/getall').get(getAllPost)

module.exports=router