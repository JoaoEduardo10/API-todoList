import { RequestHandler } from "express";
import { ICreateTaskParams } from "../../controller/task/protocols";
import { Bad_Request } from "../../helpers/api-errors";

export const createTaskMiddleware: RequestHandler<
  {},
  {},
  ICreateTaskParams
> = async (req, _res, next) => {
  const { description, boardConnect, subTasks, text } = req.body;

  if (!text) {
    throw new Bad_Request("Adicione uma texto");
  }

  if (description && description.length < 4) {
    throw new Bad_Request("Descrição deve conter no minimo 4 letras");
  }

  if (!boardConnect) {
    throw new Bad_Request(
      "adicone o BoardConnect que vem do taskConnect da board"
    );
  }

  if (!subTasks) {
    throw new Bad_Request("Adicione pelo menos uma subTask");
  }

  subTasks.map(({ text }) => {
    if (!text) {
      throw new Bad_Request("Adicione uma texto a subTask");
    }
  });

  next();
};
