import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

// http://localhost:5173/


const Message = ({msgObj}) => {
  return (
    <ListGroup.Item>{msgObj.user.username}: {msgObj.content} <br/> {msgObj.msgTime}</ListGroup.Item>
  )
}

export default Message