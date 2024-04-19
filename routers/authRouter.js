const express = require('express')
const {postCreateAccount, loginUser, logoutUser, googleSignInCallback, googlesignIn, ownerlogin, checkuserlogin, addstaff, removestaff, fetchstaff, checkstafflogin} = require('../controllers/authControllers')
const authRouter = express.Router()

authRouter.route('/google').get(googlesignIn);
authRouter.route('/google/callback').get(googleSignInCallback);
authRouter.route('/signup').post(postCreateAccount)
authRouter.route('/login').post(loginUser)
authRouter.route('/logout').post(logoutUser)
authRouter.route('/ownerlogin').post(ownerlogin)
authRouter.route('/checkuserlogin').get(checkuserlogin)
authRouter.route('/addstaff').post(addstaff)
authRouter.route('/removestaff').post(removestaff)
authRouter.route('/fetchstaff').get(fetchstaff)
authRouter.route('/checkstafflogin').get(checkstafflogin)

module.exports = authRouter