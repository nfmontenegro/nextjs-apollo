import React from 'react'
import {Button, Container, Form, Message} from 'semantic-ui-react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'

import ContentForm from './styles/ContentForm'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
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
      token
      user {
        id
      }
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
    loading: false,
    completed: false,
    error: false
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleSubmit = async (e, signup) => {
    try {
      e.preventDefault()
      this.setState({loading: true})
      await signup(this.state)
      this.setState({loading: false, completed: true})
      setTimeout(() => {
        this.setState({completed: false})
      }, 3000)
    } catch (err) {
      this.setState({message: err.message, error: true, loading: false})
      setTimeout(() => {
        this.setState({error: false})
      }, 3000)
    }
  }

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        onCompleted={() =>
          this.setState({name: '', lastname: '', email: '', password: ''})
        }
      >
        {(signup, {error, loading}) => (
          <Container>
            <ContentForm>
              <Form
                method="POST"
                success={this.state.completed}
                error={this.state.error}
                onSubmit={async e => this.handleSubmit(e, signup)}
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
                <Message
                  success
                  header="Form Completed"
                  content="You're all signed up for the newsletter"
                />
                <Message
                  error
                  header="Forbidden Server"
                  content={this.state.message}
                />
                <Button type="submit" loading={this.state.loading}>
                  Submit
                </Button>
              </Form>
            </ContentForm>
          </Container>
        )}
      </Mutation>
    )
  }
}

export default Signup
