import React from 'react';
import { Input, Button } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors,setErrors] = useState({})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", formData);
      console.log("data is connected", response.data);
      if (response.status === 200) {
        navigate('/user');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrors({ form: "Invaild username or password"});
      } else {
        setErrors({ form: "An error occurred. Please Try Again!"})
      }
    };
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '98vh' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} action='/login'>
        <div>
          <Input
            name='username'
            value={formData.username}
            onChange={handleInput}
            placeholder='Username..'
            style={{ width: '15vw', margin: '5px' }}
            />
            {errors.username && <div style={{color:'red',margin:'5px'}}>{errors.username}</div>}
        </div>
        <div>
          <Input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInput}
            placeholder='Password..'
            style={{ width: '15vw', margin: '5px' }}
            />
            {errors.password && <div style={{color:'red',margin:'5px'}}>{errors.password}</div>}
        </div>
        {errors.form && <div style={{color:'red',margin:'5px'}}>{errors.form}</div>}
        <div>
          <Button htmlType='submit' type='primary' style={{ width: '7vw', margin: '5px' }}>Login</Button>

          <Link to='/signup'><Button style={{ width: '7vw', margin: '5px' }}>Create Account!</Button></Link>
        </div>
      </form>
    </div>
  )
}

export default Login;