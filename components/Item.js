import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import {withRouter} from 'next/router'
import {
  Card,
  Container,
  Grid,
  Image,
  Segment,
  Dimmer,
  Loader
} from 'semantic-ui-react'

import ProfileName from './styles/ProfileName'
import ButtonEditProfile from './styles/ButtonEditProfile'
import ProfileDescription from './styles/ProfileDescription'

const GET_ITEM = gql`
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

class Item extends React.Component {
  render() {
    return (
      <Query
        query={GET_ITEM}
        variables={{
          id: this.props.router.query.id || ''
        }}
      >
        {({data, loading}) => {
          return (
            <Container style={{marginTop: '100px'}}>
              {loading ? (
                <Segment>
                  <Dimmer active inverted>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>

                  <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                </Segment>
              ) : (
                <Card className="profile-card shadow-depth-1">
                  <Grid>
                    <Grid.Column width={5}>
                      <Image
                        src={
                          data.item
                            ? data.item.urlImage
                            : 'https://react.semantic-ui.com/images/wireframe/image.png'
                        }
                      />
                    </Grid.Column>
                    {data.item && (
                      <>
                        <Grid.Column width={6}>
                          <ProfileName>
                            {data.item.title.toUpperCase()}
                          </ProfileName>
                          <ButtonEditProfile>EDIT ITEM</ButtonEditProfile>
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Image
                            src={data.item.user.urlProfilePicture}
                            avatar
                            size="massive"
                            style={{
                              width: '4em',
                              height: '4em'
                            }}
                          />
                          <ProfileDescription size="18px">
                            Description: {data.item.description}
                          </ProfileDescription>
                          <ProfileDescription size="18px">
                            Price: ${data.item.price}
                          </ProfileDescription>
                          <ProfileDescription size="18px">
                            Created: {data.item.parseDate}
                          </ProfileDescription>
                          <ProfileDescription size="18px">
                            Created By: {data.item.user.username}
                          </ProfileDescription>
                          <ProfileDescription size="18px">
                            Full name: {data.item.user.name}{' '}
                            {data.item.user.lastname}
                          </ProfileDescription>
                        </Grid.Column>
                      </>
                    )}
                  </Grid>
                </Card>
              )}
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(Item)
