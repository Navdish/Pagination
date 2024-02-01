import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from './Componenets/Signup/signup.jsx'
import Login from './Componenets/Login/Login.jsx'
import Home from './Componenets/Home/Home.jsx'
import User from './Componenets/user/user.jsx'

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/user/:id' element={<User/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
