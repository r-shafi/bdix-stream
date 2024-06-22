import mongoose, { Schema } from 'mongoose';

const VoteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    link: {
      type: Schema.Types.ObjectId,
      ref: 'Link',
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

VoteSchema.index({ user: 1, link: 1 }, { unique: true });

const VoteModel = mongoose.model('Vote', VoteSchema);

export { VoteModel };
