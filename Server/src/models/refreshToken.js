import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: String, required: true },
  expires: { type: Date, required: true },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

const mongoStore = {
  save: async (token, userId, expires) => {
    const refreshToken = new RefreshToken({ token, userId, expires });
    await refreshToken.save();
    return true;
  },
  find: async (token) => {
    return await RefreshToken.findOne({ token, expires: { $gt: new Date() } });
  },
  delete: async (token) => {
    await RefreshToken.deleteOne({ token });
    return true;
  },
};

export default mongoStore;
