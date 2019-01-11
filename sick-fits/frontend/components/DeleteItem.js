import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { QUERY_ALL_ITEMS } from './Items'

const MUTATION_DELETE_ITEM = gql`
  mutation MUTATION_DELETE_ITEM( $id: ID! ) {
    deleteItem( id: $id ) {
      id
    }
  }
`

class DeleteItem extends React.Component {
  // "cache" -- Apollo frontend cache
  // "payload" -- Operation result that came from backend
  update = (cache, payload) => {
    // Manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: QUERY_ALL_ITEMS })
    // console.log({ data, payload })

    // 2. Filter the deleted item out of the page
    data.items = data.items.filter((item) => item.id !== payload.data.deleteItem.id)
    // 3. Put the items back!
    cache.writeQuery({ query: QUERY_ALL_ITEMS, data })
  }

  render() {
    return (
      <Mutation
        mutation={MUTATION_DELETE_ITEM}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button onClick={() => {
            if (confirm('Are you sure you want to delete this item?')) { deleteItem() }
          }}>{this.props.children}</button>
        )}
      </Mutation>
    )
  }
}

export default DeleteItem