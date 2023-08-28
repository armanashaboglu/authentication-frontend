import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make API call to /signup to register the user
    const response = await fetch('/createaccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    if (data.success) {
      alert('Registered successfully');
      localStorage.setItem('username', username); 
      window.location.href = '/login';
    } else {
      alert('Registration failed');
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Username">
          <Input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </Form.Item>
        <Form.Item label="email">
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">Sign up</Button>
      </Form>
    </div>
  );
}

export default SignUp;
