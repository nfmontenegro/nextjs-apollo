import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

const ALL_USERS = gql`
  query users {
    users {
      id
      name
      lastname
      password
      links {
        id
        description
        url
        postedBy {
          name
          lastname
          email
          password
        }
      }
    }
  }
`

class Items extends React.Component {
  render() {
    console.log('Props item:', this.props)
    return (
      <>
        <Query query={ALL_USERS}>
          {({data, error, loading}) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: {error.message}</p>
            return (
              <div>
                {data.users.map(user => {
                  return <p>{user.name}</p>
                })}
              </div>
            )
          }}
        </Query>
      </>
    )
  }
}

export default Items
