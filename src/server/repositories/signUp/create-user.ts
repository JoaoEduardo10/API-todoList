import {
  ICreateUserparams,
  ICreateUserRepository,
} from "../../controller/signUp/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { User } from "../../models/mongo-models/User";
import { IUser } from "../../models/protocols";
import { TOmitPassword } from "../../types/types";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async create(params: ICreateUserparams): Promise<TOmitPassword<IUser>> {
    const user = await User.create(params);

    if (!user) {
      throw new Internal_Server_Error(
        "Error no banco de dados ao criar o usuario!"
      );
    }

    const { email, name, _id } = user;

    return { id: _id.toHexString(), name, email };
  }
}
