import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: String,
  },
  {
    timestamps: true,
  }
);


userSchema.index({provider:1,providerId:1},{unique:true});

export default mongoose.model("User",userSchema);