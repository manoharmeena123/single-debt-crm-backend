import mongoose, { Schema, Document } from 'mongoose';

// Define the Lead interface
interface ILead extends Document {
  lead_id: string;
  pancard: string;
  aadharCard: string;
  dateOfBirth: Date | null;
  ageOfClient: number;
  fatherName: string;
  motherName: string;
  wifeName: string;
  reasonForFinancialDifficulty: string;
  numberOfChildren: number;
}

// Mongoose Schema
const leadSchema: Schema<ILead> = new Schema({
  lead_id: { type: String, required: true },
  pancard: { type: String, required: true },
  aadharCard: { type: String, required: true },
  dateOfBirth: { type: Date, default: null },
  ageOfClient: { type: Number, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  wifeName: { type: String, required: true },
  reasonForFinancialDifficulty: { type: String, required: true },
  numberOfChildren: { type: Number, required: true },
});

export default mongoose.model<ILead>('Lead', leadSchema);
