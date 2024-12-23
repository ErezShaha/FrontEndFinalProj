import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

 


const Login = () => {
    return (
       <div class = 'signIn' >
         <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Nigger Website</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Bomboclat</Card.Subtitle>
          <Card.Text>
            you want to register or sign in?
          </Card.Text>
          {/* is href ok? */}
          <InputGroup className="mb-3">
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
        //   משפט טרנרי בטייפ בשביל לעשות שאפשר לראות
          type='password'
        />
      </InputGroup>
         
      <Button variant="info">Sign In</Button>
      <Button variant="info">Register</Button>
       
        </Card.Body>
      </Card>
       </div>
      );
    }

export default Login