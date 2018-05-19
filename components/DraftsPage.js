import React, { Component, Fragment } from 'react'
import Post from '../components/Post'
import { Query } from 'react-apollo'
import  { gql } from 'apollo-boost'
import '../index.css'

export default class DraftsPage extends Component {
  render() {
    return (
      <Query query={DRAFTS_QUERY}>
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
                <h1>Drafts</h1>
              <div className='feedme'>
                  {data.posts &&
                data.posts.map(draft => (
                  <Post
                    key={draft.id}
                    post={draft}
                    refresh={() => refetch()}
                    isDraft={!draft.isPublished}
                  />
                ))}
              {this.props.children}
              </div>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export const DRAFTS_QUERY = gql`
  query DraftsQuery {
      posts(where: {
          isPublished_not: true
      }){
          id
          image
          title
          text
          isPublished
      }
  }
`
