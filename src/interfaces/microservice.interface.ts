import mongoose from "mongoose";

export interface UserI {
  name: string;
  role: string;
  active: boolean;
}

export default interface UserSI extends UserI, mongoose.Document {}
