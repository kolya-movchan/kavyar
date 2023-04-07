import { City } from '../types/City';
import { Feature } from '../types/Feature';
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

export const getFeaturesAll = async (value: string) => {
  const features = await item.get<Feature[]>(`/${value}`);

  return features || null;
};

export const postNewFeature = async (data: Feature) => {
  return item.post<Feature>('/features', data);
};

export const deleteFeatureAPI = async (cityId: number) => {
  return item.delete(`/features/${cityId}`);
};
