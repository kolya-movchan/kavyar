import { Category } from '../types/Category';
import { CFP } from '../types/CFP';
import { City } from '../types/City';
import { Feature } from '../types/Feature';
import { Product } from '../types/Product';
import { item } from './fetch-extended';

export const getAdminByEmail = async (email: string) => {
  // const user = await item.get<User>(`/users?email=${email}`);
  const user = await Promise.resolve(email);

  return user || null;
};

// CFP
export const getAllCFPAPI = async (value: string) => {
  const cfps = await item.get<CFP>(`/${value}`);

  return cfps || null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postNewCFPAPI = async (data: any) => {
  const response = await item.post('/coffee-shops', data);

  return response;
};

export const deleteCFPAPI = async (cfpId: number) => {
  return item.delete(`/coffee-shops/delete/${cfpId}`);
};

export const restoreCFPAPI = async (cfpId: number) => {
  return item.put(`/coffee-shops/restore/${cfpId}`);
};

// City
export const getCitiesAll = async (value: string) => {
  const cities = await item.get<City[]>(`/${value}`);

  return cities || null;
};

export const postNewCity = async (data: City) => {
  const response = await item.post<City>('/cities', data);

  return response;
};

export const deleteCity = async (cityId: number) => {
  return item.delete(`/cities/${cityId}`);
};

// Features
export const getFeaturesAll = async (value: string) => {
  const features = await item.get<Feature[]>(`/${value}`);

  return features || null;
};

export const postNewFeature = async (data: Feature) => {
  const response = await item.post<Feature>('/features', data);

  return response;
};

export const deleteFeatureAPI = async (featureId: number) => {
  return item.delete(`/features/${featureId}`);
};

// Categories
export const getAllCategoriesAPI = async (value: string) => {
  const features = await item.get<Category[]>(`/${value}`);

  return features || null;
};

export const postNewCategoryAPI = async (data: Category) => {
  const response = await item.post<Category>('/categories', data);

  return response;
};

export const deleteCategoryAPI = async (categoryId: number) => {
  return item.delete(`/categories/${categoryId}`);
};

// Products
export const getAllProductsAPI = async (value: string) => {
  const products = await item.get<Product[]>(`/${value}`);

  return products || null;
};

export const postNewProductAPI = async (data: Product) => {
  const response = await item.post<Product>('/products', data);

  return response;
};

export const deleteProductAPI = async (productId: number) => {
  return item.delete(`/products/${productId}`);
};

