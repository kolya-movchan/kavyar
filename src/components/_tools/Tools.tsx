export function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const scrollTop = () => {
  document.documentElement.scrollTop = 0;
};

export const logout = () => {
  localStorage.clear();
  location.reload();
};
