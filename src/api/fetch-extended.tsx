import { Category } from '../types/Category';
import { CFPforPOST, CFPforUpdate } from '../types/CFP';
import { City } from '../types/City';
import { Credentials } from '../types/Credentials';
import { Feature } from '../types/Feature';
import { Product } from '../types/Product';

const BASE_URL = 'https://kavyar-api.herokuapp.com';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: | City | Feature | Product | Category | CFPforPOST | CFPforUpdate | Credentials | null = null,
): Promise<T> {
  const options: RequestInit = { method };

  const tokenCookies = localStorage.getItem('token');
  const authorization = `Bearer ${tokenCookies?.replace(/^"(.*)"$/, '$1')}`;

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  if (method !== 'GET' && tokenCookies) {
    // console.log(authorization);
    
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': authorization,
    };
  }

  // console.log(options, method);
  

  return wait(0)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const item = {
  get: function <T>(url: string) {
    return request<T>(url);
  },
  post: function <T>(url: string, data: City | Feature | Product | Category | CFPforPOST | Credentials) {
    return request<T>(url, 'POST', data);
  },
  delete: (url: string) => request(url, 'DELETE'),
  put: (url: string) => request(url, 'PUT'),
  putEditCFP: function <T>(url: string, data: CFPforUpdate) {
    return request<T>(url, 'PUT', data);
  },
};
