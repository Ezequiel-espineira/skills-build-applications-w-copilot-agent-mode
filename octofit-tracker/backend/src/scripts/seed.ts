import mongoose from 'mongoose';
import User from '../models/user.ts';
import Team from '../models/team.ts';
import Activity from '../models/activity.ts';
import Workout from '../models/workout.ts';
import Leaderboard from '../models/leaderboard.ts';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);

    // Create users
    const users = await User.create([
      { username: 'alice', email: 'alice@example.com' },
      { username: 'bob', email: 'bob@example.com' },
      { username: 'carol', email: 'carol@example.com' },
    ]);

    // Create teams
    const team = await Team.create({ name: 'OctoRunners', members: [users[0]._id, users[1]._id] });
    users[0].team = team._id;
    users[1].team = team._id;
    await users[0].save();
    await users[1].save();

    // Create workouts
    const workouts = await Workout.create([
      { name: 'Full Body Blast', description: '30 minute mix of cardio and strength', exercises: [{ name: 'Push-ups', reps: 15, sets: 3 }, { name: 'Burpees', reps: 12, sets: 3 }], durationMinutes: 30 },
      { name: 'Morning Run', description: '5km easy run', exercises: [], durationMinutes: 28 },
    ]);

    // Create activities
    await Activity.create([
      { user: users[0]._id, type: 'run', durationMinutes: 28, calories: 300, date: new Date() },
      { user: users[1]._id, type: 'workout', durationMinutes: 30, calories: 400, date: new Date() },
      { user: users[2]._id, type: 'cycling', durationMinutes: 45, calories: 600, date: new Date() },
    ]);

    // Create leaderboard entries
    await Leaderboard.create([
      { user: users[1]._id, score: 1200, rank: 1 },
      { user: users[0]._id, score: 1100, rank: 2 },
      { user: users[2]._id, score: 900, rank: 3 },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
