import mongoose, { Schema } from 'mongoose';

const VoteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    stream: {
      type: Schema.Types.ObjectId,
      ref: 'stream',
      required: true,
    },
    type: {
      type: String,
      enum: ['upvote', 'downvote', 'removed'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VoteModel = mongoose.models.vote || mongoose.model('vote', VoteSchema);

export { VoteModel };
