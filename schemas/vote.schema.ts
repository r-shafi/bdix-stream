import mongoose, { Schema } from 'mongoose';

const VoteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stream: {
      type: Schema.Types.ObjectId,
      ref: 'Stream',
      required: true,
    },
    type: {
      type: String,
      enum: ['upvote', 'downvote'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VoteModel = mongoose.models.Vote || mongoose.model('Vote', VoteSchema);

export { VoteModel };
