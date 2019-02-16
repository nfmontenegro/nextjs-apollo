import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Router, {withRouter} from 'next/router'
import {
  Card,
  Container,
  Grid,
  Image,
  Segment,
  Dimmer,
  Loader
} from 'semantic-ui-react'

import User from './User'

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
  state = {}

  profileDescription = ({item}) => {
    return (
      <>
        <Image
          src={item.user.urlProfilePicture}
          avatar
          size="massive"
          style={{
            width: '4em',
            height: '4em'
          }}
        />
        <ProfileDescription size="18px">
          Description: {item.description}
        </ProfileDescription>
        <ProfileDescription size="18px">
          Price: ${item.price}
        </ProfileDescription>
        <ProfileDescription size="18px">
          Created: {item.parseDate}
        </ProfileDescription>
        <ProfileDescription size="18px">
          Created By: {item.user.username}
        </ProfileDescription>
        <ProfileDescription size="18px">
          Full name: {item.user.name} {item.user.lastname}
        </ProfileDescription>
      </>
    )
  }

  renderEditItem = itemID => {
    Router.push(`/updateItem?itemID=${itemID}`)
  }

  render() {
    return (
      <User>
        {({data: {me}}) => (
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
                              {me &&
                                me.username === data.item.user.username && (
                                  <ButtonEditProfile
                                    onClick={() =>
                                      this.renderEditItem(
                                        this.props.router.query.id
                                      )
                                    }
                                  >
                                    EDIT ITEM
                                  </ButtonEditProfile>
                                )}
                            </Grid.Column>
                            <Grid.Column width={5}>
                              {this.profileDescription(data)}
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
        )}
      </User>
    )
  }
}

export default withRouter(Item)
