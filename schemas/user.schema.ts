import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 64,
    },
    password: {
      type: String,
      required: true,
    },
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vote',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', UserSchema);

export { UserModel };
