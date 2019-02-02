import React from 'react'
import gql from 'graphql-tag'
import {graphql, Query} from 'react-apollo'
import {withRouter} from 'next/router'

const ITEM = gql`
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

class EditItem extends React.Component {
  render() {
    return (
      <>
        <Query query={ITEM} variables={{id: this.props.router.query.itemID}}>
          {({data: {item}, loading, error}) => {
            if (loading) return 'Loading...'
            return (
              <div>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <p>{item.parseDate}</p>
                <p>{item.price}</p>
                <p>{item.user.name}</p>
                <p>{item.user.lastname}</p>
                <p>{item.user.username}</p>
              </div>
            )
          }}
        </Query>
      </>
    )
  }
}

export default withRouter(EditItem)
