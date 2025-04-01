
import Home from '../pages/Home'
import Service from '../pages/Service'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Docters from '../pages/Docters/Docters.jsx'
import DocterDetails from '../pages/Docters/DocterDetails.jsx'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Dashboard from '../Dashboard/doctor-account/Dashboard.jsx'
import CheckoutSuccess from "../pages/Docters/CheckoutSuccess.jsx";

import { Route,Routes } from 'react-router-dom'

const Routers = () => {
  return (
    <Routes>
      
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/docters' element={<Docters/>} />
        <Route path='/doctors/:id' element={<DocterDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/service' element={<Service/>} />
        <Route path='/checkout-success' element={<CheckoutSuccess/>} />

        <Route path='/users/profile/me' element={<MyAccount/>} />
        <Route path='/doctors/profile/me' element={<Dashboard/> } />
       
        {/* <Route path='/users/profile/me' element={ <ProtectedRoute allowedRoles={['patient']}><MyAccount/></ProtectedRoute>  }/>
        <Route path='/doctors/profile/me' element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard/></ProtectedRoute>} /> */}

    </Routes>
  );
  
};

export default Routers
