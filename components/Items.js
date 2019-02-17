import React from 'react'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Router, {withRouter} from 'next/router'
import {Button, Card, Container, Icon, Grid, Image} from 'semantic-ui-react'

export const ITEMS = gql`
  query allItems {
    allItems {
      id
      title
      description
      urlImage
      idUrlImage
      price
      createdAt
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

class Items extends React.Component {
  itemsDetails = itemId => {
    Router.push({
      pathname: '/item',
      query: {
        id: itemId
      }
    })
  }

  renderITems = allItems =>
    allItems.map(item => {
      return (
        <Grid.Column key={item.id}>
          <Card fluid color="orange" className="margin-card">
            <Image src={item.urlImage} className="item-image" />
            <Card.Content>
              <Card.Header>{item.title}</Card.Header>
              <Card.Meta>
                <span className="date">
                  {item.parseDate && `Joined in ${item.parseDate}`}
                </span>
              </Card.Meta>
              <Card.Meta>
                <span className="date">{item.user.username}</span>
              </Card.Meta>
              <Card.Description>{item.description}</Card.Description>
              <Card.Description>
                <Icon name="dollar sign" />
                {item.price}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                onClick={() => this.itemsDetails(item.id)}
                style={{width: '100%'}}
              >
                View Item
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    })

  render() {
    return (
      <Query query={ITEMS}>
        {({data: {allItems}, loading}) => {
          if (loading) return 'Loading...'
          {
            return allItems.length > 0 ? (
              <Container>
                <Grid columns={3} divided>
                  <Grid.Row>{this.renderItems(allitems)}</Grid.Row>
                </Grid>
              </Container>
            ) : (
              <Header as="h1" textAlign="center" color="blue">
                No items published ☹️
              </Header>
            )
          }
        }}
      </Query>
    )
  }
}

export default withRouter(Items)
