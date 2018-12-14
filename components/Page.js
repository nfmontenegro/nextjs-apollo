import React, {Component} from 'react'
import {Loader} from 'semantic-ui-react'

import Header from './Header'
import Meta from './Meta'
import User from './User'

import ContentLoader from './styles/ContentLoader'

class Page extends Component {
  render() {
    return (
      <>
        <Meta />
        <Header />
        {this.props.children}
      </>
    )
  }
}

export default Page
