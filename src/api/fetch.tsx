import { item } from './fetch-extended';

import { Category } from '../types/Category';
import { CFP, CFPforEDIT, CFPforUpdate, CFPforPOST } from '../types/CFP';
import { City } from '../types/City';
import { Feature } from '../types/Feature';
import { Product } from '../types/Product';
import { Credentials } from '../types/Credentials';

// Login
export const postCredentials = async (data: Credentials) => {
  const user = await item.post<{token: string}>(`/login`, data);

  return user || null;
};

// CFP
export const getAllCFPAPI = async (value: string) => {
  const response = await item.get<CFP>(`/${value}`);

  return response || null;
};

export const getCFPById = async (id: string) => {
  const response = await item.get<CFPforEDIT>(`/coffee-shops/get/${id}`);

  return response || null;
};

export const updateCFPById = async (data: CFPforUpdate) => {
  const response = await item.put<CFPforUpdate>(`/coffee-shops/update`, data);

  return response || null;
};

export const deleteCFPAPI = async (cfpId: number) => {
  const response = await item.delete(`/coffee-shops/delete/${cfpId}`);

  return response || null;
};

export const restoreCFPAPI = async (cfpId: number) => {
  const response = await item.put(`/coffee-shops/restore/${cfpId}`);

  return response || null;
};

export const postNewCFPAPI = async (data: CFPforPOST) => {
  const response = await item.post('/coffee-shops', data);

  return response || null;
};

// City
export const getCitiesAll = async (value: string) => {
  const response = await item.get<City[]>(`/${value}`);

  return response || null;
};

export const postNewCity = async (data: City) => {
  const response = await item.post<City>('/cities', data);

  return response || null;
};

export const deleteCity = async (cityId: number) => {
  const response = await item.delete(`/cities/${cityId}`);

  return response || null;
};

// Features
export const getFeaturesAll = async (value: string) => {
  const response = await item.get<Feature[]>(`/${value}`);

  return response || null;
};

export const postNewFeature = async (data: Feature) => {
  const response = await item.post<Feature>('/features', data);

  return response || null;
};

export const deleteFeatureAPI = async (featureId: number) => {
  const response = await item.delete(`/features/${featureId}`);

  return response || null;
};

// Categories
export const getAllCategoriesAPI = async (value: string) => {
  const response = await item.get<Category[]>(`/${value}`);

  return response || null;
};

export const postNewCategoryAPI = async (data: Category) => {
  const response = await item.post<Category>('/categories', data);

  return response || null;
};

export const deleteCategoryAPI = async (categoryId: number) => {
  const response = await item.delete(`/categories/${categoryId}`);

  return response || null;
};

// Products
export const getAllProductsAPI = async (value: string) => {
  const response = await item.get<Product[]>(`/${value}`);

  return response || null;
};

export const postNewProductAPI = async (data: Product) => {
  const response = await item.post<Product>('/products', data);

  return response || null;
};

export const deleteProductAPI = async (productId: number) => {
  const response = await item.delete(`/products/${productId}`);

  return response || null;
};
