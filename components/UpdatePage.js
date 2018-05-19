import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'
import { client } from "./EndPoint";
import RaisedButton from 'material-ui/RaisedButton';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'



class UpdatePage extends Component {
    state = { mytitle: '', mytext: '', myimage: '', myispublish: true }

    handleChange(value) { this.setState({ mytext: value }) }

    async componentDidMount(){
        console.log("CDM")
        console.log("Pass Token: ", this.props.match.params.id)


        let upQuery = await client.query({
            query: gql`
                query{
                    post(where: { id: "${this.props.match.params.id}" }){
                        id
                        image
                        text
                        title
                        isPublished
                    }
                }
            `}).then((result) => { return result.data.post} )

        await console.log("Data: ", upQuery )
        await this.setState({ mytitle: upQuery.title, mytext: upQuery.text, myimage: upQuery.image, myispublish: upQuery.isPublished })



    }

    render() {

        const updateOnDatabase  = async () => {
            console.log("Update DB")

            let UpdatePost = await client.mutate({
                mutation: gql`
                    mutation{
                        updatePost(
                            where: { id: "${this.props.match.params.id}" },
                            data:{
                                image: "${this.state.myimage}",
                                title: "${this.state.mytitle}",
                                text: "${this.state.mytext}",
                                isPublished: true
                            }
                        ){
                            id
                            image
                            title
                            text
                            isPublished
                        }
                    }
                `})
            console.log(UpdatePost)
        }



        return (
            <div className="pa4 flex justify-center bg-white">
              <form>
                <h1>Update</h1>

                <input
                    autoFocus
                    className="w-100 pa2 mv2 br2 b--black-20 bw1"
                    onChange={e => this.setState({ myimage: e.target.value })}
                    placeholder="Image"
                    type="text"
                    value={this.state.myimage}
                />
                <input
                    autoFocus
                    className="w-100 pa2 mv2 br2 b--black-20 bw1"
                    onChange={e => this.setState({ mytitle: e.target.value })}
                    placeholder="Title"
                    type="text"
                    value={this.state.mytitle}
                />

                <ReactQuill value={this.state.mytext}
                            className="texteditor"
                            onChange={ this.handleChange.bind(this) }
                            theme="snow"
                            placeholder="Content"
                />

                  <br/>
                  <br/>
                  <br/>
                  <br/>
                <RaisedButton href="/"  onClick={updateOnDatabase} >Update Post</RaisedButton>
              </form>

            </div>
        )
    }

}

export default withRouter(UpdatePage)



