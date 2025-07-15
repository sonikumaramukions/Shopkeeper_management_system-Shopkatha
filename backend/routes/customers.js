const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Customer = require('../models/Customer');
const Lease = require('../models/Lease');
const Payment = require('../models/Payment');
const auth = require('../middleware/auth');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

// @route   GET api/customers
// @desc    Get all customers for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/customers
// @desc    Add a new customer
// @access  Private
router.post('/', [auth, upload.single('aadharPhoto')], async (req, res) => {
  try {
    const { name, phone, whatsappNumber, email, address, aadharNumber } = req.body;

    const newCustomer = new Customer({
      user: req.user.id,
      name,
      phone,
      whatsappNumber,
      email,
      address,
      aadharNumber,
      aadharPhoto: req.file ? req.file.path : null
    });

    const customer = await newCustomer.save();
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/customers/:id
// @desc    Get customer by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Customer not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/customers/:id
// @desc    Update customer
// @access  Private
router.put('/:id', [auth, upload.single('aadharPhoto')], async (req, res) => {
  try {
    const { name, phone, whatsappNumber, email, address, aadharNumber } = req.body;

    let customer = await Customer.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    // Update fields
    customer.name = name || customer.name;
    customer.phone = phone || customer.phone;
    customer.whatsappNumber = whatsappNumber || customer.whatsappNumber;
    customer.email = email || customer.email;
    customer.address = address || customer.address;
    customer.aadharNumber = aadharNumber || customer.aadharNumber;
    if (req.file) {
      customer.aadharPhoto = req.file.path;
    }

    await customer.save();
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/customers/:id
// @desc    Delete customer
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    await customer.remove();
    res.json({ msg: 'Customer removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Customer not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router; 