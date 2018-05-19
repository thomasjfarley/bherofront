import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { DRAFTS_QUERY } from './DraftsPage'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


class CreatePage extends Component {
  state = {
    title: '',
    image: '',
    text: '',
  }

    handleChange(value) { this.setState({ text: value }) }

  render() {
      console.log('MyText: ', typeof this.state.text)

    return (
      <Mutation
        mutation={CREATE_DRAFT_MUTATION}
        update={(cache, { data }) => {
          const { drafts } = cache.readQuery({ query: DRAFTS_QUERY })
          cache.writeQuery({
            query: DRAFTS_QUERY,
            data: { drafts: drafts.concat([data.createDraft]) },
          })
        }}
      >
        {(createDraft, { data, loading, error }) => {
          return (
            <div className="pa4 flex justify-center bg-white">
              <form
                onSubmit={async e => {
                  e.preventDefault()
                  const { image, title, text } = this.state
                  await createDraft({
                    variables: { image, title, text },
                  })
                  this.props.history.replace('/drafts')
                }}
              >
             <h1>Create Draft</h1>
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ image: e.target.value })}
                  placeholder="Image URL"
                  type="text"
                  value={this.state.image}
                />
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ title: e.target.value })}
                  placeholder="Title"
                  type="text"
                  value={this.state.title}
                />


                  <ReactQuill value={this.state.text}
                              className="texteditor"
                              onChange={ this.handleChange.bind(this) }
                              theme="snow"
                              placeholder="Content"


                  />
                  <br/>
                  <br/>
                  <br/>
                  <br/>

                <input
                  className={`pa3 bg-black-10 bn ${this.state.text &&
                    this.state.title &&
                    'dim pointer'}`}
                  disabled={!this.state.text || !this.state.title}
                  type="submit"
                  value="Create"
                />
                <a className="f6 pointer" onClick={this.props.history.goBack}>
                   or cancel..
                </a>
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }

}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($image: String, $title: String!, $text: String!) {
      createPost (data: {
          image: $image
          title: $title,
          text: $text,
          isPublished: false
      }){
          id
          image
          title
          text
          isPublished
      }
  }
`

export default withRouter(CreatePage)



// <textarea
// className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
// cols={50}
// onChange={e => this.setState({ text: e.target.value })}
// placeholder="Content"
// rows={8}
// value={this.state.text}
// />


// <ReactQuill value={this.state.text} onChange={e => this.setState({ text: e.target.value })} theme="snow" />

