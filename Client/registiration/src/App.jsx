import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Home from './home';
import Error404page from './Error404page';
import User from './user';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/user' element={<User />}/>
          <Route path='*' element={<Error404page />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
