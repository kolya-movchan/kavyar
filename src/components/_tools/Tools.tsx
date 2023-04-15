export function getRandomDigits() {
  return Math.random().toString().slice(2);
}
const htmlElement = document.getElementById("html");

export const scrollTop = () => {
  document.documentElement.scrollTop = 0;
  htmlElement?.classList.add('hidden');
};