import React from 'react';
import { useNavigate } from 'react-router';
import {Button } from 'antd';

function User() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '98vh' }}>
        <h1>Login Succesfully!</h1>
        <h3>Welcome!</h3>
        <Button onClick={handleLogout}>Logout!</Button>
    </div>
  )
}

export default User;
