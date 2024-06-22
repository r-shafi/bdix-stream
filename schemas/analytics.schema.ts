import mongoose, { Schema } from 'mongoose';

const AnalyticsSchema = new Schema({
  visitorCount: {
    type: Number,
    default: 0,
  },
});

AnalyticsSchema.statics.getInstance = async function () {
  let analytics = await this.findOne();
  if (!analytics) {
    analytics = await this.create({});
  }
  return analytics;
};

const AnalyticsModel =
  mongoose.models.Analytic || mongoose.model('Analytic', AnalyticsSchema);

export { AnalyticsModel };
