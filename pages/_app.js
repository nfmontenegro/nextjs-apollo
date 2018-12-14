import App, {Container} from 'next/app'
import {ApolloProvider} from 'react-apollo'

import Page from 'Components/Page'
import 'semantic-ui-css/semantic.min.css'
import './styles.css'

import withData from 'Lib/withData'

class MyApp extends App {
  render() {
    const {Component, apollo, pageProps} = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
