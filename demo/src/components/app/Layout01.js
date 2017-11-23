import React from 'react'
import PropTypes from 'prop-types'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from '../../../../src'

import {
  withRouter
} from 'react-router-dom'
// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: '/bubblegum',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: '/shoelaces',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
]

class PersistentDrawer extends React.Component {
  constructor(props) {
    super(props);
    let open = false

    let user = null
    if (localStorage.getItem('user') !== "undefined") {
      user = JSON.parse(localStorage.getItem('user'))
    }

    this.state = {
      open: open,
      username: user ? user.username : null
    }

  }

  lLogin = (event) => {
    this.props.login({
      url: "https://upeuauth-serve.herokuapp.com/o/authorize/",
      client: "TOz7Pb9vlvJdFuxlVjku0CwT5zz18J0WUo74VzN7",
      redirect: "https://upeu-lib.github.io/redux-oauth2-frontend",
      scope: "read",
      width: 400, // Width (in pixels) of login popup window. Optional, default: 400
      height: 400 // Height (in pixels) of login popup window. Optional, default: 400
    }).then(result => {
      console.log('token: ' + JSON.stringify(result.token))
      console.log('expiresAt: ' + JSON.stringify(result.expiresAt))
      localStorage.setItem('userToken', result.token)

      localStorage.setItem('user', JSON.stringify({
        username: 'is auth'
      }))
      this.setState({
        username: 'is auth'
      })
      /*
      this.props.getLocalUserInfo().then(data => {
        //console.log('user: ' + JSON.stringify(data))
        localStorage.setItem('user', JSON.stringify(data))
        if (data) {
          this.setState({
            username: data.username
          })
        }
      })
      */
    }, function (e) {
      console.log(e); // TypeError: Throwing
    })
  }

  lLogout = (event) => {
    console.log('logout2')
    this.props.logout().then(result => {
      localStorage.removeItem('userToken')
      localStorage.removeItem('user')
      this.setState({
        username: null
      })
    })
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{
            padding: '10px',
            width: '40%',
            background: '#f0f0f0'
          }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/bubblegum">Bubblegum</Link></li>
              <li><Link to="/shoelaces">Shoelaces</Link></li>
            </ul>
          </div>
          <div style={{ flex: 1, padding: '10px' }}>
            {this.state.username}

            <button onClick={isLoggedIn ? this.lLogout : this.lLogin} >{isLoggedIn ? 'logout' : 'Login'}</button>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  //isLoggedIn: PropTypes.bool.isRequired
}
const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
})

export default withRouter(connect(mapStateToProps, {
  login, logout
})(PersistentDrawer)) 