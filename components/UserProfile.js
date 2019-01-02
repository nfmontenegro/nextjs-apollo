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
  query itemsByuser($username: String!) {
    itemsByUser(username: $username) {
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

function UserProfile() {
  return (
    <User>
      {({data: {me}}) => (
        <Query query={ITEMS_BY_USER} variables={{username: me.username}}>
          {({data: {itemsByUser}, loading}) => {
            return (
              <Container style={{marginTop: '100px'}}>
                <Card className="profile-card shadow-depth-1">
                  <Grid>
                    <Grid.Column width={4}>
                      <Image
                        src={
                          me.urlProfilePicture
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
                      <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                      {itemsByUser.length > 0 && (
                        <ProfileDescription size="18px">
                          Publications: {itemsByUser.length}
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
