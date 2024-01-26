import mongoose from "mongoose";


export interface UserInterface {
    _id?: string,
    profilePhoto: string,
    firstName: string,
    lastName: string,
    email: string,
    cpf: string,
    role?: string,
    stories?: any[],
    classes?: any[],
    authentication?: any
}

const userSchema = new mongoose.Schema<UserInterface>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  role: {type: String, required: true},
  profilePhoto: {type: String},
  cpf: { type: String, required: true, length: 11 },
  stories: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story"
    }
  ],
  classes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }
  ],
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.models.User || mongoose.model<UserInterface, Document>("User", userSchema);

export type UserDocument = UserInterface & Document;

// export const getUsers = () => UserModel.find();
// export const getUserByEmail = (email: string) => UserModel.findOne({ "email": email });
// export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ "authentication.sessionToken": sessionToken });
// export const getUserById = (id: string) => UserModel.findById({ _id: id });

// export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
// export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({ id: id });
// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate({ id, values });
