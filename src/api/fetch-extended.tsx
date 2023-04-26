import { Category } from '../types/Category';
import { CFPforPOST, CFPforUpdate, CFPforEDIT } from '../types/CFP';
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
type Data = City | Feature | Product | Category | CFPforPOST | CFPforUpdate | Credentials | CFPforEDIT | null;

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: Data = null,
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
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': authorization,
    };
  }

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
  post: function <T>(url: string, data: Data) {
    return request<T>(url, 'POST', data);
  },
  delete: (url: string) => request(url, 'DELETE'),
  put: function<T>(url: string, data?: CFPforUpdate) {
    return request<T>(url, 'PUT', data);
  },
};
