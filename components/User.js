import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

//check if the user has a valid token to access private layouts
//component PleaseSignin is the wrapper for the private views
const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      lastname
    }
  }
`

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
)

User.propTypes = {
  children: PropTypes.func.isRequired
}

export default User
export {CURRENT_USER_QUERY}
