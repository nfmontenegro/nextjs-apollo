import React from 'react'
import {Icon, Message} from 'semantic-ui-react'

function CustomMessage({loading, message}) {
  return (
    <>
      <Message icon success floating attached>
        <Icon name="circle notched" loading={loading} />
        <Message.Content>
          <Message.Header>
            Just one second, We are fetching that content for you.
          </Message.Header>
          {message}
        </Message.Content>
      </Message>
      <Message
        error
        attached
        floating
        header="Forbidden Server"
        content={message}
      />
    </>
  )
}

export default CustomMessage
