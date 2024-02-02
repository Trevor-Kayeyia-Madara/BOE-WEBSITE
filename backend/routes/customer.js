const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');

router.get('/dashboard/:customerId', customerController.getDashboard);
router.post('/new-request', customerController.submitNewRequest);

module.exports = router;
