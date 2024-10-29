import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  permissions: mongoose.Types.ObjectId[]; // Array of Permission IDs
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
  },
  {
    timestamps : true
  }
);

export const Role = mongoose.model<IRole>('Role', RoleSchema);
