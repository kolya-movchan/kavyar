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

export const convertGoogleDrive = (link: string) => {
  if (link.startsWith('https://drive') && link.includes('/d/')) {
    const startIndex = link.indexOf('/d/');
    const endIndex = link.indexOf('/view');

    return `https://drive.google.com/uc?export=view&id=${link.slice((startIndex + 3), endIndex)}`;
  }

  return link;
};

export const convertGoogleMap = (link: string) => {
  const linkData = link.trim();

  if (linkData.includes('iframe src=')) {
    const startIndex = linkData.indexOf('src=');
    const endIndex = linkData.indexOf('" w');

    const converted = linkData.slice((startIndex + 5), endIndex);

    return converted;
  }

  return link;
};
