import React from 'react'
import gql from 'graphql-tag'
import {Button, Container, Form, Icon, Message} from 'semantic-ui-react'
import {Mutation} from 'react-apollo'

import {CURRENT_USER_QUERY} from './User'
import withForm from 'HOC/withForm'
import ContentForm from './styles/ContentForm'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
    $lastname: String!
    $username: String!
    $websiteurl: String
  ) {
    signup(
      email: $email
      password: $password
      lastname: $lastname
      name: $name
      username: $username
      websiteurl: $websiteurl
    ) {
      id
      email
      name
      lastname
      username
      websiteurl
      createdAt
    }
  }
`

function Signup({form, stateForm}) {
  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={stateForm}
      refetchQueries={[{query: CURRENT_USER_QUERY}]}
    >
      {(signup, {loading}) => (
        <Container>
          <ContentForm className="shadow-depth-1">
            <Form
              id="form"
              method="POST"
              success={stateForm.success}
              error={stateForm.error}
              loading={loading}
              onSubmit={e => form.handleSubmit(e, signup)}
            >
              <Form.Group>
                <Form.Input
                  label="First name"
                  placeholder="First Name"
                  width={12}
                  name="name"
                  onChange={form.handleChange}
                  value={stateForm.name}
                />
                <Form.Input
                  label="Last name"
                  placeholder="Last Name"
                  width={12}
                  name="lastname"
                  onChange={form.handleChange}
                  value={stateForm.lastname}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Username"
                  placeholder="Username"
                  width={12}
                  name="username"
                  required
                  onChange={form.handleChange}
                  value={stateForm.username}
                />
                <Form.Input
                  label="Website Url"
                  placeholder="Website Url"
                  width={12}
                  name="websiteurl"
                  onChange={form.handleChange}
                  value={stateForm.websiteurl}
                />
              </Form.Group>
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
                header="Forbidden Server"
                content={stateForm.message}
              />
              <br />
              <Button type="submit">REGISTER</Button>
            </Form>
          </ContentForm>
        </Container>
      )}
    </Mutation>
  )
}

const SignupWithForm = withForm(Signup, 'signup')

export default SignupWithForm
