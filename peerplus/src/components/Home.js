import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { auth, facebookAuthProvider } from '../constants/firebase'
import * as routes from '../constants/routes'

class App extends Component {
  state = {
    user: null
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({ user: user }))
  }

  render() {
    return (
      <div>
        <header>
          <h1>v 0.0.23</h1>
        </header>
        {this.state.user && <Link to={routes.CREATE}>Create a Poll</Link>}
      </div>
    )
  }
}

export default App
