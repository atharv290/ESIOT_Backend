import { console } from 'inspector';
import Ride from '../models/Ride.js';

// Save a ride for a specific date
export const saveRide = async (req, res) => {
  console.log('Saving ride with body:', req.body);
  try {
    const { routeData, rideId } = req.body; // date = "YYYY-MM-DD"

    if (!rideId || !routeData || !Array.isArray(routeData)) {
      return res.status(400).json({ message: 'Date and routeData are required' });
    }

    // Ensure each point has timestamp, otherwise assign current time
    const points = routeData.map(point => ({
      ...point,
      timestamp: point.timestamp ? new Date(point.timestamp) : new Date(),
    }));

    // Check if ride for that date already exists
    let ride = await Ride.findOne({ rideId });

    if (ride) {
      // Append new points
      ride.routeData.push(...points);
      await ride.save();
    } else {
      // Create new ride
      ride = new Ride({ rideId, routeData: points });
      await ride.save();
    }

    res.status(201).json({ message: 'Ride saved successfully', rideId });
  } catch (error) {
    console.error('Error saving ride:', error);
    res.status(500).json({ error: error.message });
  }
};
// Get ride route for a specific date
export const getRideByDate = async (req, res) => {
  console.log('Fetching ride by date with params:', req.params);
  try {
    const { rideId } = req.params; // rideId = date "YYYY-MM-DD"

    const ride = await Ride.findOne({ rideId });

    if (!ride) {
      console.log(`No ride found for date: ${rideId}`);
      return res.status(404).json({ message: 'Ride not found for this date' });
    }

    // Sort routeData by timestamp ascending to determine direction
    const sortedData = ride.routeData.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    res.json({ rideId, routeData: sortedData });
  } catch (error) {
    console.error('Error fetching ride by date:', error);
    res.status(500).json({ error: error.message });
  }
};
