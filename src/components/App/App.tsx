import { Route, Routes } from 'react-router';
import { About } from '../About/About';
import { Layout } from '../Layout/Layout';
import { Home } from '../../Home/Home';
import { NotFound } from '../NotFound/NotFound';
import { ItemDetails } from '../ItemDetails/ItemDetails';

export function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="" element={<Home />}>
            <Route path=":itemId" element={<ItemDetails />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
