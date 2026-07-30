import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  rank?: number;
  date: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
export default Leaderboard;
