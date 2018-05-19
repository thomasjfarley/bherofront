import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import FeedPage from './components/FeedPage'
import DraftsPage from './components/DraftsPage'
import CreatePage from './components/CreatePage'
import DetailPage from './components/DetailPage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import UpdateP from './components/UpdatePage'

import 'tachyons'
import './index.css'
import { client } from "./components/EndPoint";

const style = {
    fontWeight: 900,
}

ReactDOM.render(

<MuiThemeProvider>
    <div>
      <Paper>
        <div className="flex-container">
          <img className="logo" src="https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/27750040_2000128646901926_440235267098892687_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeEHCEYFDxyNBTFdyGHoTbG_-rQvMVCAzwBAABuS__VLvjINhk3Y7pHZJHiqskHOvx7I8gncD-bfJQRMM-ejgHncONa4wXWl3hNMPihxnRmXcw&oh=9a0cbd3850ea55a6ee5c1fe2243dc866&oe=5B522266" alt="oops"/>
        </div>
      </Paper>
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <nav className="pa pa2-ns">
          <div className="sexyflexy">
            <div>

           <FlatButton
            href="/"
            style={style}
            >
               Big News!
           </FlatButton>
            </div>
            <div>
           <FlatButton
            style={style}
            href="/create"
            className="buttons"
           >
               New Post
           </FlatButton>
           <FlatButton
            style={style}
            href="/drafts"
            className="buttons"
            >
               Drafts
           </FlatButton>

            </div>
          </div>
        </nav>
        <div >
          <Switch>
            <Route exact path="/" component={FeedPage} />
            <Route path="/drafts" component={DraftsPage} />
            <Route path="/create" component={CreatePage} />
            <Route path="/post/:id" component={DetailPage} />
            <Route path="/:id" component={UpdateP} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  </ApolloProvider>
    </div>
 </MuiThemeProvider>,
  document.getElementById('root'),
)
