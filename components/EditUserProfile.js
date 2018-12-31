import React from 'react'
import gql from 'graphql-tag'
import Router from 'next/router'
import getConfig from 'next/config'
import {graphql, Mutation} from 'react-apollo'
import {Button, Container, Form, Icon, Message} from 'semantic-ui-react'

import User from './User'
import {CURRENT_USER_QUERY} from './User'

import {uploadImage, deleteImage} from 'Services/aws'

import ContentForm from './styles/ContentForm'
import ProfileName from './styles/ProfileName'

const {publicRuntimeConfig} = getConfig()

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $name: String
    $lastname: String
    $websiteurl: String
    $idUrlProfilePicture: String
    $urlProfilePicture: String
  ) {
    updateUser(
      id: $id
      name: $name
      lastname: $lastname
      websiteurl: $websiteurl
      idUrlProfilePicture: $idUrlProfilePicture
      urlProfilePicture: $urlProfilePicture
    ) {
      id
      name
      lastname
      websiteurl
      urlProfilePicture
      idUrlProfilePicture
    }
  }
`

class EditUserProfile extends React.Component {
  state = {
    message: '',
    error: false,
    success: false,
    loading: false
  }

  componentDidMount() {
    //set data from apollo props
    this.setState({
      id: this.props.data.me.id,
      name: this.props.data.me.name,
      lastname: this.props.data.me.lastname,
      email: this.props.data.me.email,
      websiteurl: this.props.data.me.websiteurl,
      urlProfilePicture: this.props.data.me.urlProfilePicture,
      idUrlProfilePicture: this.props.data.me.idUrlProfilePicture,
      image: ''
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

  handleSubmit = async (e, updateUser) => {
    e.preventDefault()
    try {
      this.setState({loading: true})
      let paramsUploadImage
      let imageUrl

      if (this.state.image && this.state.idUrlProfilePicture) {
        const paramsDeleteImage = {
          Bucket: publicRuntimeConfig.AWS_BUCKET,
          Delete: {
            Objects: [
              {
                Key: this.state.idUrlProfilePicture
              }
            ]
          }
        }

        await deleteImage(paramsDeleteImage)
      }

      if (this.state.image) {
        paramsUploadImage = {
          Body: this.state.image,
          Bucket: publicRuntimeConfig.AWS_BUCKET,
          Key: `${new Date().getTime()}_${this.state.id}`,
          ContentType: this.state.image.type
        }

        imageUrl = `https://${
          publicRuntimeConfig.AWS_BUCKET
        }.s3.amazonaws.com/${paramsUploadImage.Key} `

        await uploadImage(paramsUploadImage)
      }

      await updateUser({
        variables: {
          ...this.state,
          urlProfilePicture: imageUrl ? imageUrl : this.state.urlProfilePicture,
          idUrlProfilePicture: paramsUploadImage
            ? paramsUploadImage.Key
            : this.state.idUrlProfilePicture
        }
      })

      document.getElementById('form').reset()
      this.setState({
        message: 'Success updated!',
        success: true,
        loading: false
      })

      setTimeout(() => {
        Router.push(`/profile?id=${this.state.id}`)
      }, 2000)
    } catch (err) {
      this.setState({message: err.message, error: true, loading: false})
    }
  }

  render() {
    return (
      <User>
        {({data: {me}}) => {
          return (
            <Mutation
              mutation={UPDATE_USER}
              variables={this.state}
              refetchQueries={[{query: CURRENT_USER_QUERY}]}
            >
              {(updateUser, {loading}) => (
                <Container>
                  <ProfileName size="48px" align="center" marginTop="40px">
                    Settings for{' '}
                    <span style={{backgroundColor: '#fefa87'}}>
                      @{me.username}
                    </span>
                  </ProfileName>
                  <ContentForm className="shadow-depth-1">
                    <Form
                      id="form"
                      method="POST"
                      error={this.state.error}
                      success={this.state.success}
                      loading={this.state.loading}
                      onSubmit={e => this.handleSubmit(e, updateUser)}
                    >
                      <Form.Group>
                        <Form.Input
                          label="Name"
                          width={8}
                          value={this.state.name || ''}
                          name="name"
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          label="Last Name"
                          width={8}
                          name="lastname"
                          value={this.state.lastname || ''}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Input
                          label="Web Site Url"
                          width={8}
                          name="websiteurl"
                          value={this.state.websiteurl || ''}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          type="file"
                          label="Avatar"
                          width={8}
                          name="urlProfilePicture"
                          onChange={this.handleUploadFile}
                        />
                      </Form.Group>
                      <Message icon success floating attached>
                        <Icon name="circle notched" loading={loading} />
                        <Message.Content>
                          <Message.Header>
                            Just one second, We are fetching that content for
                            you.
                          </Message.Header>
                          {this.state.message}
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
                      <Button type="submit">EDIT PROFILE</Button>
                    </Form>
                  </ContentForm>
                </Container>
              )}
            </Mutation>
          )
        }}
      </User>
    )
  }
}

export default graphql(CURRENT_USER_QUERY)(EditUserProfile)
