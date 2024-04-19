const CanteenMenu = require('../models/canteenMenuModel');
const fs = require('fs').promises
module.exports.addItem = async (req, res) => {
  try {
    const { itemName, price, category,image, available } = req.body;
    const newItem = new CanteenMenu({
      itemName,
      price,
      category,
      available: available || true,
      image,
    });

    const savedItem = await newItem.save();

    res.status(200).json({ message: 'Item added successfully', item: savedItem });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }

    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.body.id;

    if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    const deletedItem = await CanteenMenu.findByIdAndDelete(itemId);
    let imagepath = deletedItem.image
    await fs.unlink(`./public/${imagepath}`)

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports.updateItemImage = async (req, res) => {
  try {
    const itemId = req.body.id;
    const item = await CanteenMenu.findById(itemId)
    await fs.unlink(`./public/${item.image}`)
    const image = req.body.image;

    if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    const updatedItem = await CanteenMenu.findByIdAndUpdate(
      itemId,
      {
        image
      }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports.updateItem = async (req, res) => {
  try {
    const itemId = req.body.id;
    const {itemName, price, category, available} = req.body;

    if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    const updatedItem = await CanteenMenu.findByIdAndUpdate(
      itemId,
      {
        itemName,
        price,
        category,
        available: available || true
      }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports.getAllItems = async (req, res) => {
  try {
    const items = await CanteenMenu.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

