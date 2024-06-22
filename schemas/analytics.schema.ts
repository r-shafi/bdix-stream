import mongoose, { Schema } from 'mongoose';

const AnalyticsSchema = new Schema({
  visitorCount: {
    type: Number,
    default: 0,
  },
});

const AnalyticsModel =
  mongoose.models.User || mongoose.model('Analytic', AnalyticsSchema);

export { AnalyticsModel };
