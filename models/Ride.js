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
      speed: { type: Number, required: true },
      rotation: { type: Number, required: true },
      timestamp: { type: Date, required: true }, // exact timestamp
    },
  ],
});

export default mongoose.model('Ride', rideSchema);
