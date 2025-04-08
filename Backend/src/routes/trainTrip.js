// src/routes/trainTrip.js

const express = require('express');
const router = express.Router();
const trainTripController = require('../controllers/trainTripController');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.requireRole('admin'));

router.post('/create', trainTripController.createTrainTrip);
router.post('/get-train-trips', trainTripController.getTrainTripsByDateAndBranch);
router.post('/pending', trainTripController.getPendingOrders);
router.post('/get-orders-by-train-and-branch', orderController.getOrdersByTrainAndBranch);

router.post('/assign', trainTripController.assignOrders);

module.exports = router;