import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { CardBody } from 'react-bootstrap';
import HomePage from '../pages/HomePage';
import "../styles/OnlineUsers.css";

// http://localhost:5173/

const OnlineUsers = ({user}) => {
  return (
    <div>
        <Card className='userCard'>
            <CardBody>
                <li>
                   {user.username}
                </li>
            </CardBody>
        </Card>
    </div>
  )
}

export default OnlineUsers