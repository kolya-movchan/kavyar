import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import './index.scss';

import { App } from './App';
import { AuthProvider } from './components/Auth/AuthContext';
import { Form } from './components/Admin/Form/Form';
import { CoffeeShops } from './components/Admin/CoffeeShops';
import { NotFound } from './components/NotFound';
import { HomePageLogo } from './components/Admin/HomePageLogo';
import { Features } from './components/Admin/Features';
import { Cities } from './components/Admin/Cities';
import { Categories } from './components/Admin/Categories';
import { Products } from './components/Admin/Products';
import { FormEdit } from './components/Admin/Form/FormEdit';
import { Header } from './components/Header';
import { HomePageUser } from './components/User/HomePageUser';
import { CFP_LangingPage } from './components/User/CFP_LangingPage';
import { Favorites } from './components/User/Favorites';

const hashRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="admin" element={<AuthProvider><App /></AuthProvider>}>
        <Route index element={<HomePageLogo />}/>
        <Route path="admin/home" element={<Navigate to="/admin" replace />}/>
        <Route path="*" element={<NotFound title={'Сторінку'} styling={'page'} />}/>
        <Route path="coffeeshops" element={<CoffeeShops />} />
        <Route path="cities" element={(<Cities />)}/>
        <Route path="features" element={(<Features />)}/>
        <Route path="categories" element={(<Categories />)}/>
        <Route path="products" element={(<Products />)}/>
        <Route path="form" element={<Form />} />
        <Route path="form/edit" element={<FormEdit />} />
      </Route>

      <Route path="/" element={<><Header navBar={false}/> <HomePageUser/></>} />
      <Route path="/favorites" element={<><Header navBar={false}/> <Favorites/></>} />
      <Route path="/coffeeshops/:cfpName" element={<><Header navBar={false}/> <CFP_LangingPage/></>} />
      <Route path="*" element={<><Header navBar={false}/> <NotFound title={'Сторінку'} styling={'page'} /></>} />
    </Routes>
  </BrowserRouter>
);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(hashRouter());
