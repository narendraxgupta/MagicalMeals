const express = require('express')
const { getAllFeedback, createFeedback, getFeedbackById, updateFeedbackById, deleteFeedbackById} =require('../controllers/feedbackControllers.js')
const { GetFeedbackPage, feedbackthanks } = require('../controllers/mainController.js')
const { StaffProtectRoute } = require('../controllers/authControllers.js')

const feedbackRouter = express.Router()

feedbackRouter.route('/fetchallfeedback').get(StaffProtectRoute, getAllFeedback)
feedbackRouter.route('/create').post(createFeedback)
feedbackRouter.route('/getfeedbackpage').get(StaffProtectRoute, GetFeedbackPage)
feedbackRouter.route('/thanks').get(feedbackthanks)

module.exports = feedbackRouter