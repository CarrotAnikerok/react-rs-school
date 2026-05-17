import { Route, Routes } from 'react-router';
import { About } from '../About/About';
import { Layout } from '../Layout/Layout';
import { Home } from '../../Home/Home';
import { NotFound } from '../NotFound/NotFound';

export function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
