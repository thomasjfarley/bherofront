import React, { Component, Fragment } from 'react'
import Post from '../components/Post'
import { Query } from 'react-apollo'
import  { gql } from 'apollo-boost'
import '../index.css'



export default class FeedPage extends Component {
    constructor(props){
        super(props)
        this.state = { query: "" }
    }

    render() {


        return (
      <Query query={FEED_QUERY}>
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
                <div className="posty">
                <input className="searchbar" type="search" placeholder="Search Here..." value={this.state.query}
                       onChange={ (event) => { this.setState({ query: event.target.value }) } } />
                </div>

                <h1>Big News!</h1>
              <div className="feedme">


                  {

                  data.posts.filter((posts) => { return posts.title.toLowerCase().includes( this.state.query.toLowerCase() ) }).map(post => (
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
    )
  }
}

export const FEED_QUERY = gql`
  query FeedQuery {
      posts(where: {
          isPublished: true
      },
          orderBy: updatedAt_DESC
      ){
          id
          image
          title
          isPublished
      }
  }
`

