import { UserData } from '../types/User';

const BASE_URL = 'https://kavyar-api.herokuapp.com/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: | UserData | null = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: function <T>(url: string) {
    return request<T>(url);
  },
  // post: function <T>(url: string, data: UserData) { (
  //   request(url, 'POST', data)
  // );},
  // patch: function <T>(url: string, data: UserData) {(
  //   request(url, 'PATCH', data)
  // );},
  // delete: function <T>(url: string) {request(url, 'DELETE');},
};


console.log(client.get('cities').then(cities => console.log(cities)));
