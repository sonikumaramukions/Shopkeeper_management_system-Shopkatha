const express = require('express');
const router = express.Router();
const Lease = require('../models/Lease');
const Customer = require('../models/Customer');

// Get all leases
router.get('/', async (req, res) => {
  try {
    const leases = await Lease.find()
      .populate('customer', 'fullName phoneNumber')
      .sort({ dateOfLending: -1 });
    res.json(leases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single lease
router.get('/:id', async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id)
      .populate('customer', 'fullName phoneNumber');
    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }
    res.json(lease);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new lease
router.post('/', async (req, res) => {
  try {
    const lease = new Lease(req.body);
    const savedLease = await lease.save();

    // Update customer's total pending amount
    await Customer.findByIdAndUpdate(
      req.body.customer,
      { $inc: { totalPendingAmount: req.body.amount } }
    );

    res.status(201).json(savedLease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update lease
router.put('/:id', async (req, res) => {
  try {
    const oldLease = await Lease.findById(req.params.id);
    if (!oldLease) {
      return res.status(404).json({ message: 'Lease not found' });
    }

    const lease = await Lease.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Update customer's total pending amount if amount changed
    if (oldLease.amount !== req.body.amount) {
      const amountDifference = req.body.amount - oldLease.amount;
      await Customer.findByIdAndUpdate(
        req.body.customer,
        { $inc: { totalPendingAmount: amountDifference } }
      );
    }

    res.json(lease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete lease
router.delete('/:id', async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id);
    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }

    // Update customer's total pending amount
    await Customer.findByIdAndUpdate(
      lease.customer,
      { $inc: { totalPendingAmount: -lease.amount } }
    );

    await lease.remove();
    res.json({ message: 'Lease deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 