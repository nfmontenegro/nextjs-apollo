import React from 'react'
import gql from 'graphql-tag'
import Router from 'next/router'
import {Query} from 'react-apollo'
import {Card, Container, Grid, Image} from 'semantic-ui-react'

import User from './User'

import ProfileName from './styles/ProfileName'
import ButtonEditProfile from './styles/ButtonEditProfile'
import ProfileDescription from './styles/ProfileDescription'

const ITEMS_BY_USER = gql`
  query items($username: String!) {
    items(where: {user: {username: $username}}) {
      id
      title
      description
      urlImage
      idUrlImage
      price
      user {
        id
        name
        lastname
        username
        email
        websiteurl
        urlProfilePicture
        idUrlProfilePicture
      }
    }
  }
`

function editProfile(userId) {
  Router.push(`/updateProfile?id=${userId}`)
}

function userProfileImage(items, me) {
  return (
    <>
      <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
      {items.length > 0 && (
        <ProfileDescription size="18px">
          Publications: {items.length}
        </ProfileDescription>
      )}
      {me.websiteurl && (
        <ProfileDescription size="18px">
          Website: {me.websiteurl}
        </ProfileDescription>
      )}
      <ProfileDescription size="18px">
        Joined: {me.parseDate}
      </ProfileDescription>
    </>
  )
}

function UserProfile() {
  return (
    <User>
      {({data: {me}}) => (
        <Query
          query={ITEMS_BY_USER}
          variables={{
            username: me ? me.username : ''
          }}
        >
          {({data: {items}, loading}) => {
            if (loading) return null
            return (
              <Container style={{marginTop: '100px'}}>
                <Card className="profile-card shadow-depth-1">
                  <Grid>
                    <Grid.Column width={4}>
                      <Image
                        src={
                          me
                            ? me.urlProfilePicture
                            : 'https://react.semantic-ui.com/images/wireframe/image.png'
                        }
                      />
                    </Grid.Column>
                    <Grid.Column width={7}>
                      <>
                        <ProfileName>
                          {me.name.toUpperCase()} {me.lastname.toUpperCase()}
                        </ProfileName>
                        <ButtonEditProfile onClick={() => editProfile(me.id)}>
                          EDIT PROFILE
                        </ButtonEditProfile>
                      </>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      {userProfileImage(items, me)}
                    </Grid.Column>
                  </Grid>
                </Card>
              </Container>
            )
          }}
        </Query>
      )}
    </User>
  )
}

export default UserProfile
