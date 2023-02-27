import { model, Schema } from "mongoose";
import { TOmitId } from "../../types/types";
import { IBoard } from "../protocols";

const Board = model(
  "Board",
  new Schema<TOmitId<IBoard>>({
    boardName: {
      type: String,
      required: true,
      min: 3,
    },
    taks: {
      type: [
        {
          task: {
            type: Schema.Types.ObjectId,
            ref: "Task",
          },
        },
      ],
    },
  })
);

export { Board };
