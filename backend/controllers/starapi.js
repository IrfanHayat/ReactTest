import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'



const getUserProfile = asyncHandler(async (req, res) => {
    // req.user was set in authMiddleware.js
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        id: user._id,
        firstName: user.firstName,
        email: user.email,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

  export { getUserProfile }