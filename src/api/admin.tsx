import { User } from '../types/User';
import { client } from '../api/fetch';

export const getAdminByEmail = async (email: string) => {
  const user = await client.get<User>(`/users?email=${email}`);
  // const users = await client.get<User[]>(`/users`);

  // console.log(users);

  return user || null;
};

// export const createUser = async ({ email, name }: UserData) => {
//   return client.post('/users', { email, name });
// };
