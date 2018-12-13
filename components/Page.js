import React, {Component} from 'react'
import {Loader} from 'semantic-ui-react'

import Header from './Header'
import Meta from './Meta'
import User from './User'

import ContentLoader from './styles/ContentLoader'

class Page extends Component {
  render() {
    return (
      <User>
        {({loading}) => {
          if (loading)
            return (
              <ContentLoader>
                <Loader
                  active
                  inline="centered"
                  size="large"
                  style={{marginTop: '20%'}}
                >
                  Loading...
                </Loader>
              </ContentLoader>
            )
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
