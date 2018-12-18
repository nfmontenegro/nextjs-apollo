import React from 'react'
import gql from 'graphql-tag'
import Router from 'next/router'
import {graphql, Mutation} from 'react-apollo'
import {Button, Container, Form, Icon, Message} from 'semantic-ui-react'

import User from './User'
import {CURRENT_USER_QUERY} from './User'
import ContentForm from './styles/ContentForm'
import ProfileName from './styles/ProfileName'

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $name: String, $lastname: String) {
    updateUser(id: $id, name: $name, lastname: $lastname) {
      message
    }
  }
`

class EditUserProfile extends React.Component {
  state = {
    message: '',
    error: false,
    success: false
  }

  componentDidMount() {
    //charge data from apollo props
    this.setState({
      id: this.props.data.me.id,
      name: this.props.data.me.name,
      lastname: this.props.data.me.lastname,
      email: this.props.data.me.email
    })
  }

  handleChange = event => {
    const {value, name} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (e, updateUser) => {
    e.preventDefault()
    try {
      const response = await updateUser()
      this.setState({message: response.data.updateUser.message, success: true})
      setTimeout(() => {
        Router.push(`/profile?id=${this.state.id}`)
      }, 2000)
    } catch (err) {
      this.setState({message: err.message, error: true, loading: false})
    }
  }

  render() {
    return (
      <User>
        {({data: {me}}) => {
          console.log('Me:', me)
          return (
            <Mutation
              mutation={UPDATE_USER}
              variables={this.state}
              refetchQueries={[{query: CURRENT_USER_QUERY}]}
            >
              {(updateUser, {loading}) => (
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
                      error={this.state.error}
                      success={this.state.success}
                      loading={loading}
                      onSubmit={e => this.handleSubmit(e, updateUser)}
                    >
                      <Form.Group>
                        <Form.Input
                          label="Name"
                          width={12}
                          value={this.state.name || ''}
                          name="name"
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          label="Last Name"
                          width={8}
                          name="lastname"
                          value={this.state.lastname || ''}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Message icon success floating attached>
                        <Icon name="circle notched" loading={loading} />
                        <Message.Content>
                          <Message.Header>
                            Just one second, We are fetching that content for
                            you.
                          </Message.Header>
                          {this.state.message}
                        </Message.Content>
                      </Message>
                      <Message
                        error
                        attached
                        floating
                        header="Forbidden Server"
                        content={this.state.message}
                      />
                      <br />
                      <Button type="submit">EDIT PROFILE</Button>
                    </Form>
                  </ContentForm>
                </Container>
              )}
            </Mutation>
          )
        }}
      </User>
    )
  }
}

export default graphql(CURRENT_USER_QUERY)(EditUserProfile)
