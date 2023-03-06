import {
  ICreateUserparams,
  ICreateUserRepository,
} from "../../controller/signUp/protocols";
import { User } from "../../models/mongo-models/User";
import { IUser } from "../../models/protocols";
import { TOmitPassword } from "../../types/types";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async create(params: ICreateUserparams): Promise<TOmitPassword<IUser>> {
    const user = await User.create(params);

    const { email, name } = user;

    return { id: user._id.toHexString(), name, email };
  }
}
