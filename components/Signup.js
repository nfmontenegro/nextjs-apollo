import React from 'react'
import gql from 'graphql-tag'
import Router from 'next/router'
import {Button, Container, Form, Message} from 'semantic-ui-react'
import {Mutation} from 'react-apollo'

import ContentForm from './styles/ContentForm'
import {CURRENT_USER_QUERY} from './User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
    $lastname: String!
  ) {
    signup(
      email: $email
      password: $password
      lastname: $lastname
      name: $name
    ) {
      id
      email
      name
      lastname
    }
  }
`

class Signup extends React.Component {
  state = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    message: '',
    success: false,
    error: false
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleSubmit = async (e, signup) => {
    try {
      e.preventDefault()
      await signup(this.state)
      this.setState({success: true})
      document.getElementById('form').reset()
      setTimeout(() => {
        Router.push('/login')
      }, 2000)
    } catch (err) {
      this.setState({message: err.message, error: true})
    }
  }

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{query: CURRENT_USER_QUERY}]}
      >
        {(signup, {loading}) => (
          <Container>
            <ContentForm className="shadow-depth-1">
              <Form
                id="form"
                method="POST"
                success={this.state.success}
                error={this.state.error}
                loading={loading}
                onSubmit={e => this.handleSubmit(e, signup)}
              >
                <Form.Group>
                  <Form.Input
                    label="First name"
                    placeholder="First Name"
                    width={12}
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                  <Form.Input
                    label="Last name"
                    placeholder="Last Name"
                    width={12}
                    name="lastname"
                    onChange={this.handleChange}
                    value={this.state.lastname}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Email"
                    placeholder="Email"
                    width={12}
                    name="email"
                    required
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                  <Form.Input
                    label="Password"
                    placeholder="Password"
                    width={12}
                    name="password"
                    required
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </Form.Group>
                <Message icon success floating attached>
                  <Icon name="circle notched" loading={loading} />
                  <Message.Content>
                    <Message.Header>Just one second</Message.Header>
                    We are fetching that content for you.
                  </Message.Content>
                </Message>
                <Message
                  error
                  header="Forbidden Server"
                  content={this.state.message}
                />
                <Button type="submit">REGISTER</Button>
              </Form>
            </ContentForm>
          </Container>
        )}
      </Mutation>
    )
  }
}

export default Signup
