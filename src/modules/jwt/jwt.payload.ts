export enum PayloadType {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export default interface JwtPayload {
  data: any;
  type: PayloadType;
}
