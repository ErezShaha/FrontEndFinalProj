import React from 'react'

const PublicChat = () => {
  return (
    <div>PublicChat
         <Card className="chatBox">
        <CardBody>
          <CardTitle>Trade Chat</CardTitle>
          <ul>
          {msgBox.map((msgObj) => (
            <li key={msgObj.id}>{msgObj.content}</li>
          ))}
          </ul>
          <InputGroup>
            <FormControl
             
              value={msgToAll}
              onChange={(e) => setmsgToAll(e.target.value)}
            />
            <Button onClick={enterMsgForEveryone}>Enter</Button>
          </InputGroup>
        </CardBody>
      </Card>
    </div>
  )
}

export default PublicChat