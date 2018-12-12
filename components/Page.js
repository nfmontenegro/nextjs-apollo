import React, {Component} from 'react'
import Header from './Header'
import Meta from './Meta'
import User from './User'

class Page extends Component {
  render() {
    return (
      <User>
        {({loading}) => {
          if (loading) return 'Loading...'
          return (
            <>
              <Meta />
              <Header />
              {this.props.children}
            </>
          )
        }}
      </User>
    )
  }
}

export default Page
