import React from 'react'
import gql from 'graphql-tag'
import {withRouter} from 'next/router'
import {graphql, Query, withApollo, compose} from 'react-apollo'
import {Button, Container, Form} from 'semantic-ui-react'

import CustomMessage from './CustomMessage'

import ContentForm from './styles/ContentForm'
import withEditForm from '../hoc/withEditForm'

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

class EditItem extends React.Component {
  state = {
    image: '',
    message: '',
    error: false,
    success: false,
    loading: false
  }

  async componentDidMount() {
    const {data} = await this.props.client.query({
      query: ITEM,
      variables: {
        id: this.props.router.query.itemID
      }
    })

    this.props.form.chargeData(data)
  }

  render() {
    const {handleSubmit, handleChange, handleUploadFile} = this.props.form
    //Mutation update item
    return (
      <>
        <Container>
          <ContentForm className="shadow-depth-1">
            <Form
              id="form"
              method="POST"
              error={this.state.error}
              success={this.state.success}
              loading={this.state.loading}
              onSubmit={e => handleSubmit(e, createItem)}
            >
              <Form.Group>
                <Form.Input
                  label="Title"
                  placeholder="Title"
                  width={12}
                  value={this.props.stateForm.title}
                  name="name"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Description"
                  placeholder="Description"
                  width={12}
                  name="description"
                  required
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
                  required
                  onChange={handleUploadFile}
                />
                <Form.Input
                  label="Price"
                  placeholder="Price"
                  width={12}
                  name="price"
                  required
                  onChange={handleChange}
                  value={this.props.stateForm.price}
                />
              </Form.Group>
              <CustomMessage loading={false} message={this.state.message} />
              <br />
              <Button type="submit" disabled={this.state.success}>
                Create Item
              </Button>
            </Form>
          </ContentForm>
        </Container>
      </>
    )
  }
}

const EditItemWithForm = withEditForm(EditItem)

export default compose(
  withRouter,
  withApollo
)(EditItemWithForm)
