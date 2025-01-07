import ListGroup from 'react-bootstrap/ListGroup';

// http://localhost:5173/


const Message = ({msgObj}) => {
  return (
    <div>
          <ListGroup.Item>{msgObj.user.username}: {msgObj.content} <br/> {msgObj.msgTime}</ListGroup.Item>
    </div>
  )
}

export default Message