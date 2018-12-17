import React from 'react'
import {Button, Container, Form, Icon, Message} from 'semantic-ui-react'
import {Mutation, withApollo} from 'react-apollo'
import AsyncStorage from '@callstack/async-storage'
import gql from 'graphql-tag'

import {CURRENT_USER_QUERY} from './User'
import ContentForm from './styles/ContentForm'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`

class Signin extends React.Component {
  state = {
    email: '',
    password: '',
    message: '',
    error: false,
    success: false
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleSubmit = async (e, signin) => {
    try {
      e.preventDefault()
      document.getElementById('form').reset()
      const response = await signin(this.state)
      // Store the token in localstorage
      AsyncStorage.setItem('token', response.data.signin.token)
        .then(() => {
          this.setState({success: true})
          // Force a reload of all the current queries now that the user is
          // logged in
          this.props.client.cache.reset().then(() => {
            window.location.href = '/'
          })
        })
        .catch(err => console.log(err))
    } catch (err) {
      this.setState({message: err.message, error: true, loading: false})
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
                error={this.state.error}
                success={this.state.success}
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
                <Message icon success floating attached>
                  <Icon name="circle notched" loading={loading} />
                  <Message.Content>
                    <Message.Header>Just one second</Message.Header>
                    We are fetching that content for you.
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
