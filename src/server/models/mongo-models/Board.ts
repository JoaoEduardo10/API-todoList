import { model, Schema } from "mongoose";
import { TOmitId } from "../../types/types";
import { IBoard } from "../protocols";
import { v4 as uuid4 } from "uuid";

const Board = model(
  "Board",
  new Schema<TOmitId<IBoard>>({
    boardName: {
      type: String,
      required: true,
      min: 3,
    },
    taskConnect: {
      type: String,
      default: uuid4,
    },
  })
);

export { Board };
