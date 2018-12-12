import App, {Container} from 'next/app'
import {ApolloProvider} from 'react-apollo'

import apolloClient from 'Lib/apolloClient'
import Page from 'Components/Page'
import 'semantic-ui-css/semantic.min.css'
import './styles.css'

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render() {
    const {Component, pageProps} = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default MyApp
