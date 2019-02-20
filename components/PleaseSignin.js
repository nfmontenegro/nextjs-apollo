import {Query} from 'react-apollo'
import {CURRENT_USER_QUERY} from './User'

const PleaseSignin = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({data, loading}) => {
      if (loading) return null
      if (!data.me) {
        return (
          <div>
            <p>Please Sign In before Continuing</p>
          </div>
        )
      }
      return props.children
    }}
  </Query>
)

export default PleaseSignin
