import { City } from '../types/City';
import { User } from '../types/User';
import { item } from './fetch-extended';

export const getAdminByEmail = async (email: string) => {
  const user = await item.get<User>(`/users?email=${email}`);

  return user || null;
};

export const getCitiesAll = async (value: string) => {
  const cities = await item.get<City[]>(`/${value}`);

  return cities || null;
};

export const postNewCity = async (data: City) => {
  return item.post<City>('/cities', data);
};

export const deleteCity = async (cityId: number) => {
  return item.delete(`/cities/${cityId}`);
};

// export const deleteTodos = (todoId: number) => {
//   return client.delete(`/todos/${todoId}`);
// };

