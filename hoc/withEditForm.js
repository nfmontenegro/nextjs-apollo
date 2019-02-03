import React from 'react'

function withEditForm(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withEditForm
