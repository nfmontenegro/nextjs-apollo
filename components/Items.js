import React from 'react'
import gql from 'graphql-tag'
import sortBy from 'lodash.sortby'
import {Mutation, Query} from 'react-apollo'
import Router, {withRouter} from 'next/router'
import {Card, Container, Icon, Grid, Image} from 'semantic-ui-react'

import User from './User'
import Pagination from './Pagination'
import {timeout} from 'async'

const ITEMS = gql`
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
  state = {}

  render() {
    return (
      <Query query={ITEMS}>
        {({data: {allItems}, loading}) => {
          if (loading) return 'Loading...'
          {
            return allItems.length > 0 ? (
              <Container>
                <Grid columns={3} divided>
                  <Grid.Row>
                    {allItems.map(item => {
                      return (
                        <>
                          <Grid.Column>
                            <Card key={item.id}>
                              <Image src={item.urlImage} />
                              <Card.Content>
                                <Card.Header>{item.title}</Card.Header>
                                <Card.Meta>
                                  <span className="date">
                                    {item.parseDate &&
                                      `Joined in ${item.parseDate}`}
                                  </span>
                                </Card.Meta>
                                <Card.Description>
                                  {item.Description}
                                </Card.Description>
                              </Card.Content>
                              <Card.Content extra>
                                <a>
                                  <Icon name="user" />
                                  {item.price}
                                </a>
                              </Card.Content>
                            </Card>
                          </Grid.Column>
                        </>
                      )
                    })}
                  </Grid.Row>
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
