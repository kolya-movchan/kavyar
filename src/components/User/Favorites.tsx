import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { GoBack } from '../GoBack';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HomePageUser } from './HomePageUser';

export const Favorites = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [favoriteShops, setFavoriteShops] = useState<number[]>([]);
  const cookies = new Cookies();

  useEffect(() => {
    const savedShops = cookies.get("favoriteShops");
    if (savedShops) {
      setFavoriteShops(savedShops);
    }
  }, []);

  return (
    <>
      <GoBack title='Ваші Улюблені Кавʼярні' />
      <img src="../tech.png" alt="" style={{ margin: '0 auto', display: 'block'}}/>
      {/* <HomePageUser favorites={favoriteShops} /> */}
    </>
  );
};
