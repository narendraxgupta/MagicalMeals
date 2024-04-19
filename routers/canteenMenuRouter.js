const express = require('express')
const { addItem, updateItem, deleteItem, getAllItems, updateItemImage } = require('../controllers/canteenMenuControllers')
const {OwnerProtectRoute } = require('../controllers/authControllers')
const {itemimageupload, managefilepath} = require('../controllers/imageupload')

const canteenMenuRouter = express.Router()

canteenMenuRouter.route('/addItem').post(OwnerProtectRoute, itemimageupload, managefilepath ,addItem)
canteenMenuRouter.route('/deleteItem').post(OwnerProtectRoute, deleteItem)
canteenMenuRouter.route('/updateItemImage').post(OwnerProtectRoute, itemimageupload, managefilepath, updateItemImage)
canteenMenuRouter.route('/updateItem').post(OwnerProtectRoute, updateItem)
canteenMenuRouter.route('/fetchallitem').get(getAllItems)

module.exports = canteenMenuRouter