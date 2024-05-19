import React from 'react'
import {Input,Button} from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData,setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors,setErrors] = useState({});

  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/signup',formData);
          console.log("data is connected:", response.data);
          if (response.status === 201) {
            navigate('/login');
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
              setErrors({ form: "Username and password are required." });
          } else if (error.response && error.response.status === 409) {
              setErrors({ form: "Username already exists." });
          } else {
              setErrors({ form: "An error occurred. Please try again." });
          }
        }
        

    }
    const handleInput = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'98vh'}}>
      <h1>Signup</h1>
      <form action='/signup' onSubmit={handleSubmit}>
        <div>
        <Input name='username' value={formData.username} placeholder='Username..' onChange={handleInput}  style={{width:'15vw',margin:'5px'}}/>
        {errors.username && <div style={{color: 'red'}}>{errors.username}</div>}
        </div>
        <div>
        <Input name='password' value={formData.password} placeholder='Password..' type='password' onChange={handleInput}  style={{width:'15vw',margin:'5px'}}/>
        {errors.password && <div style={{color: 'red'}}>{errors.password}</div>}
        </div>
        {errors.form && <div style={{color: 'red',margin: '5px'}}>{errors.form}</div>}
        <div>
        <Button type='primary' htmlType='submit' style={{width:'6vw',margin:'5px'}}>Signup</Button>
        <Link to='/login'><Button style={{width:'8.5vw',margin:'5px'}}>Have Account?</Button></Link>
        </div>
      </form>
    </div>
  )
}

export default Signup;
