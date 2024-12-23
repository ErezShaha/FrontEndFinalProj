import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useNavigate } from 'react-router';

 


const LoginPage = () => {
  const [user, setuser] = useState({userName:'', Password:''});
  const navigate = useNavigate();

  const login = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/users/login',user,{withCredentials: true});
      navigate('/home');
    } catch (error) {
      console.log(error)
    }
    

  };
    return (
       <div className = 'signIn' >
         <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Nigger Website</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Bomboclat</Card.Subtitle>
          <Card.Text>
            you want to register or sign in?
          </Card.Text>
          
          <InputGroup className="mb-3">
        <Form.Control
        value={user.userName}
        onChange={(e) => setuser({...user, userName: e.target.value})}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="signIn"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          value={user.Password}
          onChange={(e) => setuser({...user, Password: e.target.value})}
          onSubmit={login}
          placeholder="Password"
          aria-label="Password"
          aria-describedby="signIn"
        //   משפט טרנרי בטייפ בשביל לעשות שאפשר לראות
          type='password'
        />
      </InputGroup>
         {/* is href ok? */}
        
      <Button id='signIn' type='submit' variant="info">Sign In</Button>
      <Button variant="info">Register</Button>
       
        </Card.Body>
      </Card>
       </div>
      );
    }

export default LoginPage