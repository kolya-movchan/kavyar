import { City } from '../types/City';
import { Feature } from '../types/Feature';

const BASE_URL = 'https://kavyar-api.herokuapp.com';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: | City | Feature | null = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(0)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      // if (response.ok && method === 'DELETE') {
      //   return response;
      // }

      return response.json();
    });
}

export const item = {
  get: function <T>(url: string) {
    return request<T>(url);
  },

  post: function <T>(url: string, data: City | Feature) {
    request<T>(url, 'POST', data);
  },

  // patch: function <T>(url: string, data: UserData) {(
  //   request(url, 'PATCH', data)
  // );},

  delete: (url: string) => request(url, 'DELETE'),
};
