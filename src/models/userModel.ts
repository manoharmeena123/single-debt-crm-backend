import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Mongoose schema definition
const userSchema: Schema<IUser> = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: [{ type: String, required: false }],
});

// Pre-save middleware to hash passwords
userSchema.pre('save', async function (next) {
  const user = this as IUser;
  
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(candidatePassword, user.password);
};

// Export the model
const User = model<IUser>('User', userSchema);
export default User;
