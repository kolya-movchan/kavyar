export const emailRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const priceRegex = /^\d{0,4}(\.\d{1,2})?$/;

export const loginRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export const validateInput = (value: string) => {
  return value.replace(/[^іїєа-яАІЙЇЄ-Я-a-zA-Z-0-9,' ]/g, '');
};
