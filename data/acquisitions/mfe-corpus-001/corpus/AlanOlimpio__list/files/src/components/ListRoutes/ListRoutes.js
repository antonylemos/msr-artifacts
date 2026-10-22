import React from 'react';
import { Route, Routes } from 'react-router-dom';
import List from '../List';

const ModalRegister = React.lazy(() => import('RegisterApp/ModalRegister'));

function ListRoutes() {
  return (
    <Routes>
      <Route path="/" element={<List />}>
        <Route path="register" element={<ModalRegister />} />
      </Route>
    </Routes>
  );
}

export default ListRoutes;
