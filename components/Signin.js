import React from 'react'
import {Button, Container, Form, Message} from 'semantic-ui-react'
import {Mutation, withApollo} from 'react-apollo'
import localStorage from 'localStorage'
import gql from 'graphql-tag'

import {CURRENT_USER_QUERY} from './User'
import ContentForm from './styles/ContentForm'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

class Signin extends React.Component {
  state = {
    email: '',
    password: '',
    message: '',
    completed: false,
    error: false
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleSubmit = async (e, signin) => {
    try {
      e.preventDefault()
      const response = await signin(this.state)

      // Store the token in localstorage
      localStorage.setItem('token', response.data.signin.token)
      this.setState({completed: true}, () => {
        setTimeout(() => {
          this.setState({completed: false})

          // Force a reload of all the current queries now that the user is
          // logged in
          this.props.client.cache.reset().then(() => {
            window.location.href = '/'
          })
        }, 500)
      })
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
        refetchQueries={[{query: CURRENT_USER_QUERY}]}
      >
        {(signin, {loading}) => (
          <Container>
            <ContentForm>
              <Form
                id="form"
                method="POST"
                success={this.state.completed}
                error={this.state.error}
                loading={loading}
                onSubmit={e => this.handleSubmit(e, signin)}
              >
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
                <Button type="submit">Submit</Button>
              </Form>
            </ContentForm>
          </Container>
        )}
      </Mutation>
    )
  }
}

export default withApollo(Signin)
