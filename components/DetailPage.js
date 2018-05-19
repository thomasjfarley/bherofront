import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'
import { DRAFTS_QUERY } from './DraftsPage'
import { FEED_QUERY } from './FeedPage'
import RaisedButton from 'material-ui/RaisedButton';
import Post from './Post'

var HtmlToReactParser = require('html-to-react').Parser


class DetailPage extends Component {
  render() {

    return (
<div>
      <Query query={POST_QUERY} variables={{ id: this.props.match.params.id }}>
        {({ data, loading, error }) => {

          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading ...</div>
              </div>
            )
          }


          if (error) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>An unexpected error occured.</div>
              </div>
            )
          }

          // console.log("The Data is: ", data)
          const { post } = data
          const action = this._renderAction(post)

            const newHTML = () => {
                var htmlToReactParser = new HtmlToReactParser();
                var MyReactElement = htmlToReactParser.parse(data.post.text)
                return  <p className="black-80 fw3">{ MyReactElement }</p>
            }

          return (
            <Fragment>
              <div className="poster">
                <div className="posty">
                <img src={data.post.image} alt="oops"/>
                <h1 className="f3 black-80 fw4 lh-solid">{data.post.title}</h1>

                    { React.createElement(newHTML) }

                </div>
                <div className="mybuttons">
                  {action}
                </div>
              </div>
            </Fragment>
          )
        }}
      </Query>
    <br/>
    <br/>
    <h1>Want More? Try These!</h1>
        <Query query={More_Query}>
          {({ data, loading, error, refetch }) => {
          if (loading) {
              return (
                  <div className="flex w-100 h-100 items-center justify-center pt7">
                      <div>Loading ...</div>
                  </div>
              )
          }

          if (error) {
              return (

                  <div className="flex w-100 h-100 items-center justify-center pt7">
                      <div>An unexpected error occured.</div>
                  </div>
              )
          }

          return (
              <Fragment>
                  <div className="feedme">

                      {
                          data.posts.map(post => (
                                  <Post
                                      key={post.id}
                                      post={post}
                                      refresh={() => refetch()}
                                      isDraft={!post.isPublished}
                                  />
                              )
                          )}

                  </div>


              </Fragment>
          )
      }}
  </Query>
</div>

    )
  }



  _renderAction = ({ id, isPublished }) => {




    const publishMutation = (

      <Mutation
        mutation={PUBLISH_MUTATION}
        update={(cache, { data }) => {
          const { drafts } = cache.readQuery({ query: DRAFTS_QUERY })
          const { feed } = cache.readQuery({ query: FEED_QUERY })
          cache.writeQuery({
            query: FEED_QUERY,
            data: { feed: feed.concat([data.publish]) },
          })
          cache.writeQuery({
            query: DRAFTS_QUERY,
            data: {
              drafts: drafts.filter(draft => draft.id !== data.publish.id),
            },
          })
        }}
      >
        {(publish, { data, loading, error }) => {
          return (
            <RaisedButton
              onClick={async () => {
                await publish({
                  variables: { id },
                })
                this.props.history.push('/')
              }}
            >
              Publish
            </RaisedButton>
          )
        }}
      </Mutation>


    )




    const deleteMutation = (
      <Mutation
        mutation={DELETE_MUTATION}
        update={(cache, { data }) => {
          if (isPublished) {
            const { feed } = cache.readQuery({ query: FEED_QUERY })
            cache.writeQuery({
              query: FEED_QUERY,
              data: {
                feed: feed.filter(post => post.id !== data.deletePost.id),
              },
            })
          } else {
            const { drafts } = cache.readQuery({ query: DRAFTS_QUERY })
            cache.writeQuery({
              query: DRAFTS_QUERY,
              data: {
                drafts: drafts.filter(draft => draft.id !== data.deletePost.id),
              },
            })
          }
        }}
      >


        {(deletePost, { data, loading, error }) => {
          return (
            <RaisedButton
              onClick={async () => {
                await deletePost({
                  variables: { id },
                })
                this.props.history.push('/')
              }}
            >
              Delete
            </RaisedButton>
          )
        }}
      </Mutation>

    )




      const updateMutation = (




      <RaisedButton href={`/${this.props.match.params.id}`}>Update</RaisedButton>


  )

    console.log("Is Publish: ", isPublished)

    if (!isPublished) {
      return (
        <Fragment>
          {publishMutation}
          {deleteMutation}
          {updateMutation}
        </Fragment>
      )
    }
      if (isPublished) {
          return (
              <Fragment>
                  {deleteMutation}
                  {updateMutation}
              </Fragment>
          )
      }
    return deleteMutation
  }

}




const POST_QUERY = gql`
  query PostQuery($id: ID!) {
      post(where: {
          id: $id,

      }){
          id
          image
          title
          text
          isPublished
      }
  }
`



const PUBLISH_MUTATION = gql`
  mutation PublishMutation($id: ID!) {
      updatePost(data: {isPublished: true}
          where: {id: $id }){
          title
          image
          text
          id

      }
  }
`



const DELETE_MUTATION = gql`
  mutation DeleteMutatoin($id: ID!) {
    deletePost(where: { id: $id }) {
      id
    }
  }
`
const More_Query = gql`
    query FeedQuery {
        posts(where: {
            isPublished: true
        },
            orderBy: updatedAt_DESC
            first: 6
        ){
            id
            image
            title
            isPublished
        }
    }
`

export default withRouter(DetailPage)




