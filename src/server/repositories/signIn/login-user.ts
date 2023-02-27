import { ILoginUserRepository } from "../../controller/singIn/protocols";
import { Internal_Server_Error } from "../../helpers/api-errors";
import { User } from "../../models/mongo-models/User";
import { IUser } from "../../models/protocols";
import { TOmitPassword } from "../../types/types";

export class MongoLoginUserRepository implements ILoginUserRepository {
  async login(email: string): Promise<TOmitPassword<IUser>> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Internal_Server_Error(
        "Error no banco de dados ao buscar o usuario!"
      );
    }

    const { _id, name, email: newEmail } = user;

    return { id: _id.toHexString(), name, email: newEmail };
  }
}
