import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  team?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
