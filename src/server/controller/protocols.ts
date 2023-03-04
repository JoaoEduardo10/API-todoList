export interface IHttReponse<B> {
  statusCode: number;
  body: B;
}

export interface IHttRequest<B> {
  params?: any;
  headers?: {
    userId: string;
  };
  body?: B;
}

export interface IControllers {
  handle(req: IHttRequest<unknown>): Promise<IHttReponse<unknown>>;
}
