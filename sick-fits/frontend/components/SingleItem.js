import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import Head from 'next/head'
import ErrorMessage from './ErrorMessage'

const StylesSingleItem = styled.div`
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  margin: 2rem auto;
  max-width: 1200px;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Scale image preserving aspect ratio to fit its' width, height */
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`

const QUERY_SINGLE_ITEM = gql`
  query QUERY_SINGLE_ITEM($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
    }
  }
`

class SingleItem extends React.Component {
  render() {
    return <Query query={QUERY_SINGLE_ITEM} variables={{ id: this.props.id }}>
    {({ data, error, loading }) => {
      if (error) { return <ErrorMessage error={error} /> }
      if (loading) { return <p>Loading...</p> }
      const item = data.item;
      if (!item) { return <p>No Item Found for {this.props.id}</p> }
      console.log(data)
      return <StylesSingleItem>
        {/* The content of <Head/> will be taken out by Next.js and
          the actual <head/> will be patched */}
        <Head>
          <title>Sick Fits | {item.title}</title>
        </Head>
        <img src={item.largeImage} alt={item.title}/>
        <div className="details">
          <h2>Viewing {item.title}</h2>
          <p>{item.description}</p>
        </div>
      </StylesSingleItem>
    }}
    </Query>
  }
}

export default SingleItem