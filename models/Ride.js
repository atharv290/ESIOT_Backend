import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  // Use date as unique ride ID
  rideId: { type: String, required: true, unique: true }, // format: YYYY-MM-DD

  // Each point includes lat, lng, temperature, speed, rotation, timestamp
  routeData: [
    {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      temperature: { type: Number, required: true },
      humidity: { type: Number, required: true },   // ✅ added
      speed: { type: Number, required: true },
      rotation: { type: Number, required: true },
      flame: { type: Boolean, required: true },     // ✅ added
      flameValue: { type: Number, required: true }, // ✅ added
      timestamp: { type: Date, required: true }
    }
  ]
});

export default mongoose.model('Ride', rideSchema);
