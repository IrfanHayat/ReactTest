import express from 'express'
import * as userController from '../controllers/userController.js'
import * as starApiController from '../controllers/starapi.js'
const router = express.Router()

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/starapi',starApiController.getUserProfile)


export default router
