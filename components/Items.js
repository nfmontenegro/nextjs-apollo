import React from 'react'
import gql from 'graphql-tag'
import Router from 'next/router'
import sortBy from 'lodash.sortby'
import {Mutation, Query} from 'react-apollo'
import {Button, Header, Table} from 'semantic-ui-react'

import User from './User'
import DeleteButton from './DeleteButton'

import ContentTable from './styles/ContentTable'

const DELETE_ITEM_BY_USER = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
      title
      description
      createdAt
    }
  }
`

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

class Items extends React.Component {
  state = {
    column: null,
    data: [],
    direction: null
  }

  handleSort = (clickedColumn, data) => () => {
    const {column, direction} = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: 'ascending'
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    })
  }

  itemsDetails = itemId => {
    Router.push({
      pathname: '/item',
      query: {id: itemId}
    })
  }

  renderItems = (items, me) => {
    return items.map((item, index) => {
      {
        return (
          <Table.Row key={item.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{item.title}</Table.Cell>
            <Table.Cell>{item.description}</Table.Cell>
            <Table.Cell width={3}>${item.price}</Table.Cell>
            <Table.Cell width={3}>
              <Button.Group>
                <Button
                  onClick={() => this.itemsDetails(item.id)}
                  style={{background: '#e0e1e2', color: '#000'}}
                >
                  View
                </Button>
                <Button.Or />
                <Button>Edit</Button>
                <Button.Or />
                <Mutation
                  mutation={DELETE_ITEM_BY_USER}
                  refetchQueries={[
                    {query: ITEMS_BY_USER, variables: {username: me.username}}
                  ]}
                >
                  {deleteItem => {
                    return <DeleteButton mutation={deleteItem} item={item} />
                  }}
                </Mutation>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )
      }
    })
  }

  render() {
    const {column, direction} = this.state

    return (
      <User>
        {({data: {me}}) => (
          <Query query={ITEMS_BY_USER} variables={{username: me.username}}>
            {({data: {itemsByUser}, loading}) => {
              return (
                <>
                  {itemsByUser.length > 0 ? (
                    <ContentTable>
                      <Table color={'blue'} className="mt-30">
                        <Table.Header
                          sorted={column === 'name' ? direction : null}
                          onClick={this.handleSort('name', itemsByUser)}
                        >
                          <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {this.renderItems(itemsByUser, me)}
                        </Table.Body>
                      </Table>
                    </ContentTable>
                  ) : (
                    <Header as="h1" textAlign="center" color="blue">
                      No Items
                    </Header>
                  )}
                </>
              )
            }}
          </Query>
        )}
      </User>
    )
  }
}

export default Items
