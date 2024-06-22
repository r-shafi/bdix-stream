import mongoose, { Schema } from 'mongoose';

const LinkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ['sports', 'entertainment'],
      default: 'sports',
    },
  },
  {
    timestamps: true,
  }
);

const LinkModel = mongoose.model('Link', LinkSchema);

export { LinkModel };
