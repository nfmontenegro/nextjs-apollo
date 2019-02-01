import React from 'react'
import gql from 'graphql-tag'
import {graphql, Mutation} from 'react-apollo'
import {Button, Container, Form, Icon, Message} from 'semantic-ui-react'

import {ITEMS} from './Items'
import {PAGINATION_QUERY} from './Items'
import {CURRENT_USER_QUERY} from './User'
import withForm from 'HOC/withForm'

import ContentForm from './styles/ContentForm'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $urlImage: String!
    $idUrlImage: String!
    $price: String!
  ) {
    createItem(
      title: $title
      description: $description
      urlImage: $urlImage
      idUrlImage: $idUrlImage
      price: $price
    ) {
      id
    }
  }
`

function CreateItem({form, stateForm, data}) {
  return (
    <Mutation
      mutation={CREATE_ITEM_MUTATION}
      variables={stateForm}
      refetchQueries={() => {
        return [
          {query: CURRENT_USER_QUERY},
          {
            query: PAGINATION_QUERY,
            variables: {
              username: data.me.username
            }
          },
          {
            query: ITEMS,
            variables: {
              username: data.me.username
            }
          }
        ]
      }}
    >
      {(createItem, {loading}) => (
        <Container>
          <ContentForm className="shadow-depth-1">
            <Form
              id="form"
              method="POST"
              error={stateForm.error}
              success={stateForm.success}
              loading={stateForm.loading}
              onSubmit={e => form.handleSubmit(e, createItem)}
            >
              <Form.Group>
                <Form.Input
                  label="Title"
                  placeholder="Title"
                  width={12}
                  name="title"
                  required
                  onChange={form.handleChange}
                  value={stateForm.title}
                />
                <Form.Input
                  label="Description"
                  placeholder="Description"
                  width={12}
                  name="description"
                  required
                  onChange={form.handleChange}
                  value={stateForm.description}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  input="file"
                  label="Image"
                  width={12}
                  name="image"
                  required
                  onChange={form.handleUploadFile}
                />
                <Form.Input
                  label="Price"
                  placeholder="Price"
                  width={12}
                  name="price"
                  required
                  onChange={form.handleChange}
                  value={stateForm.price}
                />
                <Form.Input type="hidden" required value={data.me.username} />
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
                Create Item
              </Button>
            </Form>
          </ContentForm>
        </Container>
      )}
    </Mutation>
  )
}

const CreateItemWithForm = withForm(CreateItem, 'createItem')

export default graphql(CURRENT_USER_QUERY, ITEMS, PAGINATION_QUERY)(
  CreateItemWithForm
)
