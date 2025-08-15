import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk ID
    email: { type: String, required: true },
    full_name: { type: String, required: true },
    username: { type: String, unique: true, sparse: true },
    bio: { type: String, default: "Hey there, I am using PINGUP" },
    profile_picture: { type: String, default: "https://example.com/default-profile.png" },
    cover_photo: { type: String, default: "https://example.com/default-cover.png" },
    location: { type: String, default: "" },
    followers: [{ type: String, ref: "User" }],
    following: [{ type: String, ref: "User" }],
    connections: [{ type: String, ref: "User" }],
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model('User', userSchema);
