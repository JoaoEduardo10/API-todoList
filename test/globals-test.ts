import supertest from "supertest";
import { ICreateUserparams } from "../src/server/controller/signUp/protocols";
import {
  ICreateTaskParams,
  ISubTaskParams,
} from "../src/server/controller/task/protocols";
import { ITasks } from "../src/server/models/protocols";

import { server } from "../src/server/server";
import { TOmitId } from "../src/server/types/types";

const serverTest = supertest(server);

export const mockcreateUser: ICreateUserparams = {
  email: "joao@gmail.com",
  name: "joao",
  password: "1234",
};

export const mockUpdateTask: ISubTaskParams = [
  {
    concluded: true,
    text: "test",
    uuid: "123",
  },
];

export const mockCreateTask: ICreateTaskParams = {
  boardConnect: "123",
  subTasks: [
    {
      concluded: false,
      text: "test",
    },
  ],
  text: "test",
  description: "um teste",
};

export const mockUpdateCompltetask: TOmitId<ITasks> = {
  boardConnect: "123",
  description: "test",
  status: "concluded",
  subTasks: [
    {
      concluded: true,
      text: "test",
      uuid: "123",
    },
  ],
  text: "test",
};

export { serverTest };
