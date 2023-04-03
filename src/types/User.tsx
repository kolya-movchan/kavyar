export interface User {
  name: string;
  email: string;
}

export type UserData = Pick<User, 'name' | 'email'>;
