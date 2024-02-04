import mongoose from "mongoose";
import { UserInterface } from "./user.model";
import { StudentInterface } from "./student.model";

const ClassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false }],
  },
  {
    timestamps: true,
  }
);

export interface ClassInterface {
  name: string;
  description: string;
  students: StudentInterface[];
  _id?: string
}

export const ClassModel = mongoose.models.Class || mongoose.model<ClassInterface, Document>("Class", ClassSchema);

export type ClassDocument = ClassInterface & Document;
