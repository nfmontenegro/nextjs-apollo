import React from 'react'
import gql from 'graphql-tag'
import {withRouter} from 'next/router'
import {Mutation, withApollo, compose} from 'react-apollo'
import {Button, Container, Form} from 'semantic-ui-react'

import CustomMessage from './CustomMessage'

import ContentForm from './styles/ContentForm'
import withEditForm from 'HOC/withEditForm'

const ITEM = gql`
  query getItem($id: ID!) {
    item(where: {id: $id}) {
      id
      title
      description
      urlImage
      idUrlImage
      price
      createdAt
      parseDate
      user {
        id
        name
        lastname
        email
        username
        websiteurl
        urlProfilePicture
        idUrlProfilePicture
        createdAt
        parseDate
      }
    }
  }
`

const UPDATE_ITEM = gql`
  mutation updateItem(
    $id: ID!
    $title: String
    $description: String
    $idUrlImage: String
    $urlImage: String
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      idUrlImage: $idUrlImage
      urlImage: $urlImage
    ) {
      id
      title
      description
      urlImage
      idUrlImage
    }
  }
`

class EditItem extends React.Component {
  async componentDidMount() {
    const id = this.props.router.query.itemID
    const {data} = await this.props.client.query({
      query: ITEM,
      variables: {
        id
      }
    })

    this.props.form.loadFormData(data.item)
  }

  render() {
    const {handleSubmit, handleChange, handleUploadFile} = this.props.form
    return (
      <Mutation mutation={UPDATE_ITEM} variables={this.props.stateForm}>
        {updateItem => (
          <Container>
            <ContentForm className="shadow-depth-1">
              <Form
                id="form"
                method="POST"
                error={this.props.stateForm.error}
                success={this.props.stateForm.success}
                loading={this.props.stateForm.loading}
                onSubmit={e => handleSubmit(e, updateItem)}
              >
                <Form.Group>
                  <Form.Input
                    label="Title"
                    placeholder="Title"
                    width={12}
                    value={this.props.stateForm.title}
                    name="title"
                    onChange={handleChange}
                  />
                  <Form.Input
                    label="Description"
                    placeholder="Description"
                    width={12}
                    name="description"
                    onChange={handleChange}
                    value={this.props.stateForm.description}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    input="file"
                    label="Image"
                    width={12}
                    name="image"
                    onChange={handleUploadFile}
                  />
                  <Form.Input
                    label="Price"
                    placeholder="Price"
                    width={12}
                    name="price"
                    onChange={handleChange}
                    value={this.props.stateForm.price}
                  />
                </Form.Group>
                <CustomMessage
                  loading={this.props.stateForm.loading}
                  message={this.props.stateForm.message}
                />
                <br />
                <Button type="submit" disabled={this.props.stateForm.success}>
                  Edit Item
                </Button>
              </Form>
            </ContentForm>
          </Container>
        )}
      </Mutation>
    )
  }
}

const EditItemWithForm = withEditForm(EditItem, 'editItem')

export default compose(
  withRouter,
  withApollo
)(EditItemWithForm)
