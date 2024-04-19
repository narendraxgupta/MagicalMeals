const Feedback = require('../models/feedbackModel');
const Order = require('../models/Order')
const User = require('../models/authModel')
const canteenMenuModel = require('../models/canteenMenuModel')
module.exports.createFeedback = async (req, res) => {
    try {
      const { order, ratings, experience, suggestions } = req.body;
      var order_ = await Order.findById(order)
      
    if(order_ && !order_.feedback && order_.status == 'Completed'){
      const feedback = new Feedback({ order, ratings, experience, suggestions });
      let feedback_ = await feedback.save();
      await Order.findOneAndUpdate({_id: order}, {feedback: feedback_._id})
      res.status(200).json({ message: 'Feedback created successfully', id:feedback._id });
    }
    else{
        res.status(400).json({message: 'Invalid Feedback error'})
    }
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = {};
        for (const field in error.errors) {
          errors[field] = error.errors[field].message;
        }
        return res.status(400).json({ message: "Validation Error", errors });
      }
      console.error('Error creating feedback:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
async function extractFromOrderId(orderid){
    let order = await Order.findById(orderid);
    let items = order.items;
    let user = await User.findById(order.user)
    let username = 'user not found'
    if(user){
       username = user.name
    }
    let orderdetails = "";
    for (const item of items) {
      let item_ = await canteenMenuModel.findById(item.menuItem);
      let item_name = item_.itemName;
      orderdetails += `${item.quantity} X ${item_name}, `;
    }
    orderdetails = orderdetails.replace(/, $/, ''); 
    return {'orderdetails': orderdetails, 'user': username}
  }

module.exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    var feedbackdata = []
    for(let feedback_ of feedback){
      let order_ = await Order.findById(feedback_.order)
      if(!order_){
        continue;
      }
      let data_ = await extractFromOrderId(order_._id)
      feedbackelement = {
        id: feedback_._id,
        orderDetails: data_['orderdetails'],
        user: data_['user'],
        ratings: feedback_.ratings,
        experience: feedback_.experience,
        suggestions: feedback_.suggestions
      }
      feedbackdata.push(feedbackelement)
    }
    console.log(feedbackdata)
    res.status(200).json({ feedback: feedbackdata });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ feedback });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.updateFeedbackById = async (req, res) => {
  try {
    const { ratings, experience, suggestions } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { ratings, experience, suggestions }, { new: true });
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback updated successfully', feedback });
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.deleteFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
