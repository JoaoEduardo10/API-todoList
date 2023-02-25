import { IUser } from "../../models/protocols";
import { TOmitPassword } from "../../types/types";

export interface ICreateUserparams {
  name: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  create(params: ICreateUserparams): Promise<TOmitPassword<IUser>>;
}
