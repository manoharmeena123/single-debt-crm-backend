import mongoose, { Schema, Document } from 'mongoose';

export interface ICreditors extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CreditorSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
  },
  {
    timestamps : true
  }
);

export const Creditors = mongoose.model<ICreditors>('Creditors', CreditorSchema);
