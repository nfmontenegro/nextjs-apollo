import App, {Container} from 'next/app'
import {ApolloProvider} from 'react-apollo'

import Page from 'Components/Page'
import withData from 'Lib/withData'
import 'semantic-ui-css/semantic.min.css'
import './styles.css'

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
