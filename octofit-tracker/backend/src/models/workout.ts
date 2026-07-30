import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description?: string;
  exercises: { name: string; reps?: number; sets?: number; durationSec?: number }[];
  durationMinutes?: number;
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String },
  exercises: [{ name: String, reps: Number, sets: Number, durationSec: Number }],
  durationMinutes: Number,
}, { timestamps: true });

const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
export default Workout;
