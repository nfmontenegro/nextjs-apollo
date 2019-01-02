import React from 'react'
import gql from 'graphql-tag'
import {withApollo} from 'react-apollo'
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
    item(id: $id) {
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
  state = {
    loading: true
  }

  async componentDidMount() {
    return this.props.client
      .query({
        query: GET_ITEM,
        variables: {
          id: this.props.router.query.id
        }
      })
      .then(({data, loading}) => {
        this.setState({item: data.item, loading})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container style={{marginTop: '100px'}}>
        {this.state.loading ? (
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
                    this.state.item.urlImage
                      ? this.state.item.urlImage
                      : 'https://react.semantic-ui.com/images/wireframe/image.png'
                  }
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <ProfileName>{this.state.item.title.toUpperCase()}</ProfileName>
                <ButtonEditProfile>EDIT ITEM</ButtonEditProfile>
              </Grid.Column>
              <Grid.Column width={5}>
                <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                <ProfileDescription size="18px">
                  Description: {this.state.item.description}
                </ProfileDescription>
                <ProfileDescription size="18px">
                  Price: ${this.state.item.price}
                </ProfileDescription>
                <ProfileDescription size="18px">
                  Created: {this.state.item.parseDate}
                </ProfileDescription>
                <ProfileDescription size="18px">
                  Created By: {this.state.item.username}
                </ProfileDescription>
                <ProfileDescription size="18px">
                  Full name: {this.state.item.user.name}{' '}
                  {this.state.item.user.lastname}
                </ProfileDescription>
              </Grid.Column>
            </Grid>
          </Card>
        )}
      </Container>
    )
  }
}

export default withRouter(withApollo(Item))
