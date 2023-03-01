/* eslint-disable prefer-const */
import { ISubTasks } from "../models/protocols";

export type TsubTask = [
  {
    text: string;
    concluded: boolean;
    uuid: string;
  }
];

export const returnsNewSubTask = (
  subtask: ISubTasks[],
  newSubTask: TsubTask
) => {
  console.log(subtask);

  newSubTask.map((sub, index) => {
    if (sub.uuid == subtask[index].uuid) {
      subtask[index].concluded = sub.concluded;
    }
  });

  return subtask;
};
