import mongoose from "mongoose";
import { UserInterface } from "./user.model";

export interface StudentInterface {
  _id?: string;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  tutor: string | UserInterface
  birthday: string;
  healthInfo?: string;
}

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  healthInfo: { type: String },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  profilePhoto: { type: String },
  birthday: { type: String, required: true },
});

export const StudentModel =
  mongoose.models.Student || mongoose.model<StudentInterface, Document>("Student", studentSchema);

export type StudentDocument = StudentInterface & Document;