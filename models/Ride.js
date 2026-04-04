import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  rideId: { type: String, required: true },

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
