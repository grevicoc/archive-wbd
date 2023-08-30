import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './layout/PageTemplate';
import DetailResep from './pages/DetailResep';
import Login from './pages/Login';
import Register from './pages/Register';
import Resep from './pages/Resep';
import Request from './pages/Request';
import BahanBaku from './pages/BahanBaku';
import NotFound from './components/common/layout/NotFound';

const App = () => {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        {/* disini harusnya component layout yg isinya header sm footer */}
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="resep" element={<Resep />} />
          <Route path="resep/:id" element={<DetailResep />} />
          <Route path="request" element={<Request />} />
          <Route path="bahanBaku" element={<BahanBaku />} />
          {/* sesuaiin path sama pagenya */}
          {/* <Route path="request" element={<Resep />} /> */}
          {/* <Route path="bahan-baku" element={<Resep />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="resep/:id" element={<DetailResep />} />
        </Routes>
      )}
    </>
  );
};

export default App;
