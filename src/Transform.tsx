import jwtDecode from 'jwt-decode';

type DecodedData = {
  sub: string,
  roles: string[],
  iat: number,
  exp: number
};

export const decodeTokenConverted = (tokenName: string) => {    
  try {
    const decoded: DecodedData = jwtDecode(tokenName);
    if (decoded) {
      return decoded;
    }
  } catch (err) {
    console.error(err);
  }
};


export const decodeToken = (tokenName: string) => {
  const decodedToken = decodeTokenConverted(tokenName);

  if (decodedToken) {
    return decodedToken.roles[0] === 'ADMIN';
  }
};
