import React from 'react'
import gql from 'graphql-tag'
import {Button, Container, Form, Icon, Message} from 'semantic-ui-react'
import {Mutation, withApollo} from 'react-apollo'

import {CURRENT_USER_QUERY} from './User'
import withForm from 'HOC/withForm'
import ContentForm from './styles/ContentForm'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`

function Signin({form, stateForm}) {
  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={stateForm}
      refetchQueries={[{query: CURRENT_USER_QUERY}]}
    >
      {(signin, {loading}) => (
        <Container>
          <ContentForm className="shadow-depth-1">
            <Form
              id="form"
              method="POST"
              error={stateForm.error}
              success={stateForm.success}
              loading={loading}
              onSubmit={e => form.handleSubmit(e, signin)}
            >
              <Form.Group>
                <Form.Input
                  type="email"
                  label="Email"
                  placeholder="Email"
                  width={12}
                  name="email"
                  required
                  onChange={form.handleChange}
                  value={stateForm.email}
                />
                <Form.Input
                  type="password"
                  label="Password"
                  placeholder="Password"
                  width={12}
                  name="password"
                  required
                  onChange={form.handleChange}
                  value={stateForm.password}
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
                content={stateForm.message}
              />
              <br />
              <Button type="submit" disabled={stateForm.success}>
                LOGIN
              </Button>
            </Form>
          </ContentForm>
        </Container>
      )}
    </Mutation>
  )
}

const SigninWithForm = withForm(Signin, 'signin')

export default withApollo(SigninWithForm)
