import React from 'react'
import Router from 'next/router'
import {Card, Container, Grid, Image} from 'semantic-ui-react'

import User from './User'

import ProfileName from './styles/ProfileName'
import ProfileDescription from './styles/ProfileDescription'
import ButtonEditProfile from './styles/ButtonEditProfile'

class UserProfile extends React.Component {
  editProfile = userId => {
    Router.push(`/updateProfile?id=${userId}`)
  }

  render() {
    return (
      <User>
        {({data: {me}}) => (
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
                    <ButtonEditProfile onClick={() => this.editProfile(me.id)}>
                      EDIT PROFILE
                    </ButtonEditProfile>
                    {me.websiteurl && (
                      <ProfileDescription>
                        Website: {me.websiteurl}
                      </ProfileDescription>
                    )}
                  </>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                </Grid.Column>
              </Grid>
            </Card>
          </Container>
        )}
      </User>
    )
  }
}

export default UserProfile
