import React from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import Router from 'next/router'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import formatMoney from '../lib/formatMoney'

const QUERY_SINGLE_ITEM = gql`
  query QUERY_SINGLE_ITEM($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`

const MUTATION_UPDATE_ITEM = gql`
  mutation MUTATION_UPDATE_ITEM(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`

class UpdateItem extends React.Component {
  state = {}

  handleChange = (e) => {
    // "e.target" is the DOM node
    const { name, type, value } = e.target
    const val = (type === 'number') ? parseFloat(value) : value

    this.setState({
      [name]: val,
    })
  }
  updateItem = async (e, updateItemMutation) => {
    e.preventDefault()
    console.log('Updating item!')
    console.log(this.state)
    const res = await updateItemMutation({
      // "variables" argument can either be passed here or to <Mutation/> as a prop
      variables: {
        id: this.props.id,
        ...this.state, // the changes
      }
    })
    console.log('Updated!')
  }

  render() {
    const { item } = this.props
    return (
      <Query query={QUERY_SINGLE_ITEM} variables={{ id: this.props.id }}>
        {({data, error, loading}) => {
          if (loading) { return <p>Loading...</p> }
          if (!data.item) { return <p>No Item Found for ID: {this.props.id}</p> }
          return (
            <Mutation mutation={MUTATION_UPDATE_ITEM}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={(e) => this.updateItem(e, updateItem)}>
                  <ErrorMessage error={error}/>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input required type="text" name="title" id="title" placeholder="Title" defaultValue={data.item.title} onChange={this.handleChange}/>
                    </label>

                    <label htmlFor="price">
                      Price (in cents)
                      <input required type="number" name="price" id="price" placeholder="Price" defaultValue={data.item.price} onChange={this.handleChange}/>
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea required rows="7" name="description" id="description" placeholder="Description" defaultValue={data.item.description} onChange={this.handleChange}/>
                    </label>

                    <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export { MUTATION_UPDATE_ITEM }
export default UpdateItem
