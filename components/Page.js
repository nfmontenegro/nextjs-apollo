import React, {Component} from 'react'

import Header from './Header'
import Meta from './Meta'

class Page extends Component {
  render() {
    return (
      <>
        <Meta />
        <Header />
        {/* encapsulated within this component  _app.js*/}
        {this.props.children}
      </>
    )
  }
}

export default Page
