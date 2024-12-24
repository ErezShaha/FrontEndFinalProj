import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../styles/LoginPage.css';

 


const LoginPage = () => {
  const navigate = useNavigate();

  const [user, setuser] = useState({username:'', password:''});
  const [userRegister, setuserRegister] = useState({username:'', password:''});
  const [PassowrdVis, setPassVIs] = useState('password');
  const [holdMouse, setholdMouse] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCard, setisCard] = useState(true);

  const toggleCard = (e) => {e.preventDefault()
    setisCard(!isCard)
  };  

  const login = async(e) => { 
    e.preventDefault();
    setIsDisabled(true);
    try {
      const res = await axios.post('/api/v1/users/login',user,{withCredentials: true});
      navigate('/home');
    } catch (error) {
      console.log(error)
    }
     };

     const register = async(e) => {
      try {
        const res = await axios.post('/api/v1/users/signup',user,{withCredentials: true});

      } catch (error) {
        console.log(error)
      }
     }

     
    return (
      <div>
        {isCard ? (
          //sign in
          <div className = 'centerDiv' >
             <Card style={{ width: '18rem' }}>
         <Card.Body>
           <h1 className='bigTitle'>Bomboclat</h1>
           <Card.Subtitle className="mb-2 text-muted">Sign In</Card.Subtitle>
           <Card.Title>
             Username
           </Card.Title>
           
           <InputGroup className="mb-3">
         <Form.Control
         value={user.userName}
         onChange={(e) => setuser({...user, username: e.target.value})}
           placeholder="Username"
           aria-label="Username"
           aria-describedby="signIn"
         />
         <br/>
           </InputGroup>

           <Card.Title>
             Password
           </Card.Title>

           <InputGroup className="mb-3">
         <Form.Control
           value={user.password}
           onChange={(e) => setuser({...user, password: e.target.value})}
           placeholder="Password"
           aria-label="Password"
           aria-describedby="signIn"  
           type={PassowrdVis}
         />
         <Button onMouseDown={()=> setPassVIs('text')} onMouseUp={()=> setPassVIs('password')}>o</Button>
       </InputGroup> 
         
         <Button id='signIn' type='submit' onClick={login}  variant="info" disabled={isDisabled}>Sign In</Button>
         <br/><br/>
         <Button type='submit' variant="primary" onClick={toggleCard}>Register</Button>
         
        
         </Card.Body>
       </Card>
        </div>

        ):(
          //register
          <div className='centerDiv'>
            <Card style={{ width: '18rem' }}>
         <Card.Body>
           <h1 className='bigTitle'>Bomboclat</h1>
           <Card.Subtitle className="mb-2 text-muted">Register</Card.Subtitle>
           
           <Card.Title>
             Please enter a username
           </Card.Title>
           
           <InputGroup className="mb-3">
         <Form.Control
         value={userRegister.userName}
         onChange={(e) => setuserRegister({...user, username: e.target.value})}
           placeholder="Username"
           aria-label="Username"
           aria-describedby="register"
         />
         <br/>
           </InputGroup>

           <Card.Title>
           Please enter a password
           </Card.Title>

           <InputGroup className="mb-3">
         <Form.Control
           value={user.Password}
           onChange={(e) => setuser({...user, password: e.target.value})}
           placeholder="Password"
           aria-label="Password"
           aria-describedby="register"  
           type={PassowrdVis}
         />
         <Button onMouseDown={()=> setPassVIs('text')} onMouseUp={()=> setPassVIs('password')}>o</Button>
       </InputGroup>

         
         <Button id='register' type='submit' onClick={register} variant="primary">Register</Button>
         <br/><br/>
         <Button type='submit' onClick={toggleCard}  variant="info">Sign In</Button>
        
        
         </Card.Body>
       </Card>
          </div>
        )}
      </div>
       
      )
    }

export default LoginPage

