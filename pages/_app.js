import App, {Container} from 'next/app'
import Head from 'next/head'
import {ApolloProvider} from 'react-apollo'
import NProgress from 'next-nprogress/component'

import Navigator from './navigator'
import './styles.scss'
import apolloClient from 'Lib/apolloClient'

class MyApp extends App {
  render() {
    const {Component} = this.props

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Head>
            <title>App</title>
            <link
              rel="stylesheet"
              href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
            />
          </Head>
          <NProgress color="#29d" />
          <Navigator />
          <Component />
        </ApolloProvider>
      </Container>
    )
  }
}

export default MyApp
