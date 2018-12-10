import App, {Container} from 'next/app'
import {ApolloProvider} from 'react-apollo'
import withData from 'Lib/withData'

class MyApp extends App {
  render() {
    const {Component, apollo} = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
