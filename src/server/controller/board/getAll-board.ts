/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBoard } from "../../models/protocols";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { IGetAllBoardRepository } from "./protocols";

export class GetAllBoardController implements IControllers {
  constructor(private readonly getAllBoardRepository: IGetAllBoardRepository) {}

  async handle(_req: IHttRequest<any>): Promise<IHttReponse<IBoard[]>> {
    const boards = await this.getAllBoardRepository.getAll();

    return {
      body: boards,
      statusCode: 200,
    };
  }
}
