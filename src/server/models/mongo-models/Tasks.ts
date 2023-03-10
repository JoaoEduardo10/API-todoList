import { model, Schema } from "mongoose";
import { TOmitId } from "../../types/types";
import { ITasks } from "../protocols";
import { v4 as uuId4 } from "uuid";

const Task = model(
  "Task",
  new Schema<TOmitId<ITasks>>({
    text: {
      type: String,
      required: true,
      min: 4,
    },
    description: {
      type: String,
      min: 3,
    },
    status: {
      type: String,
      enum: ["pending", "progress", "concluded"],
      default: "pending",
    },
    subTasks: {
      required: true,
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          concluded: {
            type: Boolean,
            default: false,
          },
          uuid: {
            type: String,
            default: uuId4,
          },
        },
      ],
    },
    boardConnect: {
      required: true,
      type: String,
      ref: "Board",
    },
  })
);

export { Task };
