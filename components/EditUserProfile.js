import React from 'react'
import {graphql} from 'react-apollo'
import {Button, Container, Form, Icon, Message} from 'semantic-ui-react'

import User from './User'
import {CURRENT_USER_QUERY} from './User'
import ContentForm from './styles/ContentForm'
import ProfileName from './styles/ProfileName'

class EditUserProfile extends React.Component {
  state = {}

  componentDidMount() {
    //charge data from apollo props
    this.setState({
      name: this.props.data.me.name,
      lastname: this.props.data.me.lastname,
      email: this.props.data.me.email
    })
  }

  handleChange(event) {
    const {value, name} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    return (
      <User>
        {({data: {me}}) => (
          <Container>
            <ProfileName size="48px" align="center" marginTop="40px">
              Settings for{' '}
              <span style={{backgroundColor: '#fefa87'}}>
                @{me.name} {me.lastname}
              </span>
            </ProfileName>
            <ContentForm className="shadow-depth-1">
              <Form
                id="form"
                method="POST"
                onSubmit={e => this.handleSubmit(e)}
              >
                <Form.Group>
                  <Form.Input
                    label="Email"
                    width={12}
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email || ''}
                  />
                  <Form.Input
                    label="Name"
                    width={12}
                    value={this.state.name || ''}
                    name="name"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Last Name"
                    width={8}
                    name="lastname"
                    value={this.state.lastname || ''}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Message icon success floating attached>
                  <Icon name="circle notched" />
                  <Message.Content>
                    <Message.Header>Just one second</Message.Header>
                    We are fetching that content for you.
                  </Message.Content>
                </Message>
                <Message error attached floating header="Forbidden Server" />
                <br />
                <Button type="submit">EDIT PROFILE</Button>
              </Form>
            </ContentForm>
          </Container>
        )}
      </User>
    )
  }
}

export default graphql(CURRENT_USER_QUERY)(EditUserProfile)
