const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Customer = require('../models/Customer');

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('customer', 'fullName phoneNumber')
      .sort({ paymentDate: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single payment
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('customer', 'fullName phoneNumber');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new payment
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();

    // Update customer's total pending amount
    await Customer.findByIdAndUpdate(
      req.body.customer,
      { $inc: { totalPendingAmount: -req.body.amount } }
    );

    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update payment
router.put('/:id', async (req, res) => {
  try {
    const oldPayment = await Payment.findById(req.params.id);
    if (!oldPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Update customer's total pending amount if amount changed
    if (oldPayment.amount !== req.body.amount) {
      const amountDifference = oldPayment.amount - req.body.amount;
      await Customer.findByIdAndUpdate(
        req.body.customer,
        { $inc: { totalPendingAmount: amountDifference } }
      );
    }

    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete payment
router.delete('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update customer's total pending amount
    await Customer.findByIdAndUpdate(
      payment.customer,
      { $inc: { totalPendingAmount: payment.amount } }
    );

    await payment.remove();
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 