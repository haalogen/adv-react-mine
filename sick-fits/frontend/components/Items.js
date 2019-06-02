import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Item from './Item'
import Pagination from './Pagination'

const QUERY_ALL_ITEMS = gql`
  query QUERY_ALL_ITEMS {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

const Center = styled.div`
  text-align: center;
`
const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`


class Items extends React.Component {
  render() {
    return (
      <Center>
        <Pagination />
        <Query query={QUERY_ALL_ITEMS}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: {error.message}</p>

            console.log(data)
            return <ItemsList>
              {data.items.map((item, i) => <Item key={item.id || i} item={item} />)}
            </ItemsList>
          }}
        </Query>
        <Pagination />
      </Center>
    )
  }
}

export { QUERY_ALL_ITEMS }
export default Items