import { GoBack } from '../GoBack';
import { HomePageUser } from './HomePageUser';

export const Favorites = () => {
  return (
    <>
      <GoBack title='Ваші Улюблені Кавʼярні' />
      <HomePageUser />
    </>
  );
};
