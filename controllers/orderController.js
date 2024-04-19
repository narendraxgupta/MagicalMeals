const Order = require('../models/Order');
const canteenMenuModel = require('../models/canteenMenuModel')
const path = require('path')
const User = require('../models/authModel')

module.exports.placeOrder = async (req, res) => {
  try {
    const items = req.body.items;
    const transactionId = req.body.transactionId
    const address = req.body.address
    const user = req.userid;
    if (!user) {
       return res.status(400).json({ message: 'user not logged in', 'loginerror': true });
    }

    var price = 0;
    for (let item of items) {
       let item_ = await canteenMenuModel.findById(item.menuItem);
       price += item_.price*item.quantity;
    }

    const newOrder = new Order({ user, items, price, transactionId, address });
    const savedOrder = await newOrder.save();
     
    return res.status(200).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    if (error.name === 'ValidationError') {
        const errors = {};
        for (const field in error.errors) {
            errors[field] = error.errors[field].message;
        }
        return res.status(400).json({ message: 'Validation Error', errors });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports.viewAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const ordersData = [];
    
    for (let order of orders) {
      const orderDetails = await getorderdetails(order.items);
      const user = await User.findById(order.user);
      const orderelement = {
        orderdetails: orderDetails,
        status: order.status,
        orderid: order._id,
        user: user ? user.name : '',
        price: order.price,
        transactionId: order.transactionId,
        address: order.address,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        feedback: order.feedback,
        pickupTime: order.pickupTime
      };
      ordersData.push(orderelement);
    }
    
    res.status(200).json(ordersData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, orderId } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.updatePickUptime = async (req, res) => {
  try {
    const { pickupTime, orderId } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { pickupTime, updatedAt: Date.now() },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.deletePlacedOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ _id: orderId, status: 'Pending Approval to cancel' });
    
        if (!order) {
          return res.status(404).json({ message: 'Order not found or not pending approval' });
        }
    
        const deletedOrder = await Order.findByIdAndDelete(orderId);
    
        res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  };

  async function getorderdetails(items){
    let orderdetails = "";
    for (const item of items) {
      let item_ = await canteenMenuModel.findById(item.menuItem);
      let item_name = item_.itemName;
      orderdetails += `${item.quantity} X ${item_name}, `;
    }
    orderdetails = orderdetails.replace(/, $/, ''); 
    return orderdetails
  }

  module.exports.viewUserOrders = async (req, res) => {
    try {
      const userId = req.userid; 
      const userOrders = await Order.find({ user: userId })
      var userOrdersData = []
      for (const order of userOrders) {
        let orderdetails = await getorderdetails(order.items)
        let orderelement = {
          id: order._id,
          status: order.status,
          details: orderdetails,
          price: order.price,
          pickupTime: order.pickupTime,
          feedback: order.feedback,
          transactionId: order.transactionId,
          address: order.address,
        };
        userOrdersData.push(orderelement);
      }
      res.status(200).json(userOrdersData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.orderTrackData = async function(req,res){
  try {
    const orderId = req.body.orderId;
    const order = await Order.findOne({ _id: orderId });
    console.log(orderId)
    console.log(order._id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    let orderdata = {}
    orderdata.orderid = order._id
    orderdata.status = order.status
    orderdata.pickupTime = order.pickupTime
    orderdata.address = order.address
    orderdata.steps = 0
    if(order.status === 'Accepted'){
      orderdata.steps = 1
    }
    else if (order.status === 'In Progress'){
      orderdata.steps = 2
    }
    else if(order.status === 'On the Way'){
      orderdata.steps = 3
    }
    else if (order.status === 'Completed'){
      orderdata.steps = 4
    }
    res.status(200).json({ order: orderdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports.congrats = async function(req,res){
  res.sendFile(path.resolve(path.join(__dirname,'../public/congrats.html')))
}

module.exports.getMyOrdersPage = async function(req,res){
  res.sendFile(path.resolve(path.join(__dirname,'../public/Your_Order.html')))
}

module.exports.getorderrequest = async function(req,res){
   res.sendFile(path.resolve(path.join(__dirname,'../public/order_request.html')))
}

module.exports.gettrackorder = async function(req,res){
   res.sendFile(path.resolve(path.join(__dirname,'../public/track.html')))
}

