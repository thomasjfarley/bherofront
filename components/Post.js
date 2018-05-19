import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

export default class Post extends Component {
  render() {
    let title = this.props.post.title
    if (this.props.isPublished_not) {
      title = `${title} (Draft)`
    }

    return (
        <div className="boxes">
      <Link className="no-underline ma1" to={`/post/${this.props.post.id}`}>
        <img src={this.props.post.image} className="thumbnails" alt="oops"/>

        <div className="MenuTitle">{title}</div>

      </Link>
        </div>
    )
  }
}


