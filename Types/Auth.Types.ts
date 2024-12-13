export type LoginType = {
  userName: string;
  password: string;
};
export type AuthValidType = {
  userName: string;
  validCode: string;
};

export type UserTokenType = {
  Id: string;
  RoleId: number;
  FirstName: string;
  LastName: string;
  UserName: string;
  Token: string;
  Expiration: string;
};
