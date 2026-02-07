import express from 'express';
import { saveRide, getRideByDate } from '../controllers/rideController.js';

const router = express.Router();

router.post('/', saveRide);              // Save route
router.get('/:rideId', getRideByDate);     // Fetch route

export default router;
