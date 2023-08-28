import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/checklogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    if (data.success) {
      localStorage.setItem('username', username);
      window.location.href = '/home';
    } else {
      alert('Login failed');
    }
  }
  
   const handleGoogleSignIn = () => {
        window.location.href = '/google';
    };

    const handleSignUp = () => {
        window.location.href = '/signup';
    };


  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Username" style={{ margin: '0px 30px 0px 30px' }}>
          <Input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ margin: '10px 50px 10px 50px' }}
          />
        </Form.Item>
        <Form.Item label="email" style={{ margin: '0px 30px 0px 30px' }}>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: '10px 50px 10px 50px' }}
          />
        </Form.Item>
        <Form.Item label="Password" style={{ margin: '0px 30px 0px 30px' }}>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ margin: '10px 50px 10px 50px' }}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>Login</Button>
      </Form>
      <div>
            <Button type="primary" onClick={handleGoogleSignIn} style={{ marginTop: '10px' }}>
                Sign in with Google
            </Button>
        </div>
        <div>
            <Button type="link" onClick={handleSignUp} style={{ marginTop: '10px' }}>
                Sign up
            </Button>
        </div>
    </div>
  );
}

export default Login;
