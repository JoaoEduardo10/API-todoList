import { ISubTasks } from "../models/protocols";

export const returnsNewSubTask = (
  subtask: ISubTasks[],
  newSubTask: ISubTasks[]
) => {
  newSubTask.map((sub, index) => {
    if (sub.uuid == subtask[index].uuid) {
      subtask[index].concluded = sub.concluded;
    }
  });

  return subtask;
};
