import React from 'react'
import gql from 'graphql-tag'
import sortBy from 'lodash.sortby'
import {Mutation, Query} from 'react-apollo'
import Router, {withRouter} from 'next/router'
import {Button, Header, Table} from 'semantic-ui-react'

import User from './User'
import Pagination from './Pagination'
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

export const PAGINATION_QUERY = gql`
  query paginationQuery($username: String!) {
    itemsConnection(where: {user: {username: $username}}) {
      aggregate {
        count
      }
    }
  }
`

export const ITEMS = gql`
  query items($username: String!, $skip: Int, $first: Int) {
    items(where: {user: {username: $username}}, skip: $skip, first: $first) {
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
  state = {
    data: [],
    column: null,
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
      query: {
        id: itemId
      }
    })
  }

  tableItems = (items, me, column, direction) => {
    return (
      <Table color={'blue'} className="mt-30">
        <Table.Header
          sorted={column === 'price' ? direction : null}
          onClick={this.handleSort('price', items)}
        >
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderItems(items, me)}</Table.Body>
      </Table>
    )
  }

  renderEditItem = itemID => {
    Router.push(`/updateItem?itemID=${itemID}`)
  }

  renderItems = (items, {username}) => {
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
                <Button onClick={() => this.renderEditItem(item.id)}>
                  Edit
                </Button>
                <Button.Or />
                <Mutation
                  mutation={DELETE_ITEM_BY_USER}
                  refetchQueries={() => {
                    return [
                      {
                        query: PAGINATION_QUERY,
                        variables: {
                          username
                        }
                      },
                      {
                        query: ITEMS,
                        variables: {
                          username,
                          skip: this.props.router.query.page * 10 - 10,
                          first: 10
                        }
                      }
                    ]
                  }}
                >
                  {deleteItem => (
                    <DeleteButton mutation={deleteItem} item={item} />
                  )}
                </Mutation>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )
      }
    })
  }

  render() {
    const page = this.props.router.query.page
    const {column, direction} = this.state
    return (
      <User>
        {({data: {me}}) => (
          <Query
            query={ITEMS}
            variables={{
              username: me ? me.username : '',
              skip: page * 10 - 10,
              first: 10
            }}
          >
            {({data: {items}, loading}) => {
              if (loading) return 'Loading..'
              return (
                <>
                  {items.length > 0 ? (
                    <ContentTable>
                      {this.tableItems(items, me, column, direction)}
                      <div style={{textAlign: 'center'}}>
                        <Query
                          query={PAGINATION_QUERY}
                          variables={{
                            username: me.username
                          }}
                        >
                          {({data, loading}) => {
                            if (loading) return <p>Loading...</p>
                            const count = data.itemsConnection.aggregate.count
                            const pages = Math.ceil(count / 10)
                            return (
                              <Pagination
                                page={page}
                                pages={pages}
                                count={count}
                              />
                            )
                          }}
                        </Query>
                      </div>
                    </ContentTable>
                  ) : (
                    <Header as="h1" textAlign="center" color="blue">
                      No items published ☹️
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

export default withRouter(Items)
