import { ILoginUserRepository } from "../../controller/singIn/protocols";
import { User } from "../../models/mongo-models/User";
import { IUser } from "../../models/protocols";
import { TOmitPassword } from "../../types/types";

export class MongoLoginUserRepository implements ILoginUserRepository {
  async login(email: string): Promise<TOmitPassword<IUser>> {
    const user = await User.findOne({ email });

    return {
      id: user?._id.toHexString() as string,
      name: user?.name as string,
      email: user?.email as string,
    };
  }
}
