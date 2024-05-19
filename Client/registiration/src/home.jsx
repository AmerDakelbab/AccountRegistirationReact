import React from 'react'
import { Link } from 'react-router-dom';
import {Button} from 'antd';
const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '98vh' }}>
      <h1>Welcome</h1>
      <div>
        <Link to='/signup'><Button style={{width:'7vw',margin:'5px'}} type='primary' >Signup</Button></Link>
        <Link to='/login'><Button style={{width:'7vw',margin:'5px'}} type='primary'>Login</Button></Link>
      </div>
    </div>
  )
}

export default Home;