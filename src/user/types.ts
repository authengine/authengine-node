export interface GetUserData {
  id?: string;
  email?: string;
  username?: string;
}

export interface CreateUserData {
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}
