import { IUser } from "../../models/protocols";
import { TOmitPassword } from "../../types/types";

export interface ILoginUserParams {
  email: string;
  password: string;
}

export interface ILoginUserRepository {
  login(email: string): Promise<TOmitPassword<IUser>>;
}
