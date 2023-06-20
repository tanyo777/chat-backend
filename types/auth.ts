export interface IRegisterUserPayload extends ILoginPayload {
  firstName: string;
  lastName: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
