import { model, Schema } from "mongoose";
import { TOmitId } from "../../types/types";
import { IUser } from "../protocols";

const User = model(
  "User",
  new Schema<TOmitId<IUser>>({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      min: 3,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  })
);

export { User };
