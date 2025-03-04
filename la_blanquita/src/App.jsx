import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login2';
import SignUp from './components/SignUp'
import CreateProduct from './components/CreateProduct'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/create" element={<CreateProduct/>} />
      </Routes>
    </Router>
  );
}

export default App;
