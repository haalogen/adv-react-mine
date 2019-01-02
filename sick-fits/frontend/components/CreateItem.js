import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import formatMoney from '../lib/formatMoney'

const MUTATION_CREATE_ITEM = gql`
  mutation MUTATION_CREATE_ITEM(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

class CreateItem extends React.Component {
  state = {
    title: 'Cool Shoes',
    description: 'I love those',
    image: 'dog.jpg',
    largeImage: 'largeDog.jpg',
    price: 1000,
  }

  handleChange = (e) => {
    // "e.target" is the DOM node
    const { name, type, value } = e.target
    const val = (type === 'number') ? parseFloat(value) : value

    this.setState({
      [name]: val,
    })
  }

  uploadFile = async (e) => {
    console.log('Uploading', e.target);
    const files = e.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'sickfits') // Needed by Cloudinary

    const res = await fetch('https://api.cloudinary.com/v1_1/dw2qd4eel/image/upload', {
      method: 'POST',
      body: data,
    })
    const file = await res.json()
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    })
  }

  render() {
    const { item } = this.props;
    return (
      <Mutation mutation={MUTATION_CREATE_ITEM} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={async (e) => {
            e.preventDefault() // Stop the form from submitting
            const res = await createItem() // Call the mutation
            console.log(res)
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            }) // Bring them to the single item page
          }}>
            <ErrorMessage error={error}/>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input required type="file" name="file" id="file" placeholder="Upload an image" onChange={this.uploadFile}/>
                {this.state.image && <img src={this.state.image} width="200" alt="Upload Preview"/>}
              </label>

              <label htmlFor="title">
                Title
                <input required type="text" name="title" id="title" placeholder="Title" value={this.state.title} onChange={this.handleChange}/>
              </label>

              <label htmlFor="price">
                Price (in cents)
                <input required type="number" name="price" id="price" placeholder="Price" value={this.state.price} onChange={this.handleChange}/>
              </label>

              <label htmlFor="description">
                Description
                <textarea required rows="7" name="description" id="description" placeholder="Description" value={this.state.description} onChange={this.handleChange}/>
              </label>

              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export { MUTATION_CREATE_ITEM }
export default CreateItem
