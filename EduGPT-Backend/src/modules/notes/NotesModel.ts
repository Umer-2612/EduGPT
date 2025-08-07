import mongoose, { Schema, Document, Types } from "mongoose";

export interface INote extends Document {
  _id: Types.ObjectId;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadDate: Date;
  s3Key: string;
  s3Url: string;
  description?: string;
  tags?: string[];
}

const NoteSchema: Schema = new Schema({
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  mimeType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  s3Key: { type: String, required: true },
  s3Url: { type: String, required: true },
  description: { type: String },
  tags: { type: [String], default: [] },
});

export const NoteModel = mongoose.model<INote>("Note", NoteSchema);
