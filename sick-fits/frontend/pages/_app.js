import React from 'react'
import App, {Container} from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Page from '../components/Page'
import withData from '../lib/withData'

class MyApp extends App {
  /**
   * Next.js special lifecycle method. Runs before first render() runs.
   * Initializes the props.
   */
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    // Crawl any page for all the Queries and Mutations inside of that page
    // Fire off them all and resolve before we render the page
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // This exposes URL query to the user
    pageProps.query = ctx.query
    return { pageProps }
  }

  render() {
    const { apollo, Component, pageProps } = this.props;
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