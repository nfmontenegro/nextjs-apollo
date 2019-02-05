import React from 'react'
import gql from 'graphql-tag'
import {graphql, Mutation, compose} from 'react-apollo'
import {Button, Container, Form} from 'semantic-ui-react'

import User from './User'
import CustomMessage from './CustomMessage'
import {CURRENT_USER_QUERY} from './User'

import withEditForm from 'HOC/withEditForm'
import ContentForm from './styles/ContentForm'
import ProfileName from './styles/ProfileName'

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
  // state = {
  //   id: this.props.data.me.id,
  //   name: this.props.data.me.name,
  //   lastname: this.props.data.me.lastname,
  //   email: this.props.data.me.email,
  //   websiteurl: this.props.data.me.websiteurl,
  //   urlProfilePicture: this.props.data.me.urlProfilePicture,
  //   idUrlProfilePicture: this.props.data.me.idUrlProfilePicture,
  //   image: '',
  //   message: '',
  //   error: false,
  //   success: false,
  //   loading: false
  // }

  async componentDidMount() {
    console.log(this.props)
    this.props.form.loadFormData(this.props.data.me)
  }

  render() {
    const {handleSubmit, handleChange, handleUploadFile} = this.props.form
    return (
      <User>
        {({data: {me}}) => {
          return (
            <Mutation
              mutation={UPDATE_USER}
              variables={this.props.stateForm}
              refetchQueries={[{query: CURRENT_USER_QUERY}]}
            >
              {updateUser => (
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
                      error={this.props.stateForm.error}
                      success={this.props.stateForm.success}
                      loading={this.props.stateForm.loading}
                      onSubmit={e => handleSubmit(e, updateUser)}
                    >
                      <Form.Group>
                        <Form.Input
                          label="Name"
                          width={8}
                          value={this.props.stateForm.name}
                          name="name"
                          onChange={handleChange}
                        />
                        <Form.Input
                          label="Last Name"
                          width={8}
                          name="lastname"
                          value={this.props.stateForm.lastname}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Input
                          label="Web Site Url"
                          width={8}
                          name="websiteurl"
                          value={this.props.stateForm.websiteurl}
                          onChange={handleChange}
                        />
                        <Form.Input
                          type="file"
                          label="Avatar"
                          width={8}
                          name="urlProfilePicture"
                          onChange={handleUploadFile}
                        />
                      </Form.Group>
                      <CustomMessage
                        loading={this.props.stateForm.loading}
                        message={this.props.stateForm.message}
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

const EditUserWithForm = withEditForm(EditUserProfile, 'editUser')

export default graphql(CURRENT_USER_QUERY)(EditUserWithForm)
