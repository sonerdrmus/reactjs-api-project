import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import KamionAdd from './components/KamionAdd';
import KamionEdit from './components/KamionEdit';

import { Routes, Route } from 'react-router-dom';

const ROLES = {
  Success : "true",
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public sayfalar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
       
        {/* Giriş yapıldıysa yönlendirilecek sayfalar */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Success]} />}>
          <Route path="/" element={<Home />} />
          <Route path='/kamionAdd' element={<KamionAdd />} />
          <Route path='/kamionEdit/:id' element={<KamionEdit />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;