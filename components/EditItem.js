import React from 'react'
import gql from 'graphql-tag'
import {withRouter} from 'next/router'
import {graphql, Query, withApollo, compose} from 'react-apollo'
import {Button, Container, Form} from 'semantic-ui-react'

import CustomMessage from './CustomMessage'

import ContentForm from './styles/ContentForm'

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

    this.setState({
      ...data.item
    })
  }

  handleChange = event => {
    const {value, name} = event.target
    this.setState({
      [name]: value
    })
  }

  handleUploadFile = event =>
    this.setState({
      image: event.target.files[0]
    })

  render() {
    console.log(this.state)
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
              onSubmit={e => form.handleSubmit(e, createItem)}
            >
              <Form.Group>
                <Form.Input
                  label="Title"
                  placeholder="Title"
                  width={12}
                  name="title"
                  required
                  onChange={this.handleChange}
                  value={this.state.title || ''}
                />
                <Form.Input
                  label="Description"
                  placeholder="Description"
                  width={12}
                  name="description"
                  required
                  onChange={this.handleChange}
                  value={this.state.description || ''}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  input="file"
                  label="Image"
                  width={12}
                  name="image"
                  required
                  onChange={this.handleUploadFile}
                />
                <Form.Input
                  label="Price"
                  placeholder="Price"
                  width={12}
                  name="price"
                  required
                  onChange={this.handleChange}
                  value={this.state.price}
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

export default compose(
  withRouter,
  withApollo
)(EditItem)
