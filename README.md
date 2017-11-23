# redux-oauth2-frontend

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]



## Installation


Instale redux-oauth2-frontend
```sh

D:\mi-react-project>npm i --S redux-oauth2-frontend

```
## Configure


store
```js
    import { authMiddleware } from 'redux-oauth2-frontend'

    let middlewares = [authMiddleware, ]
    const store = createStore(
        //reducers,
        compose(
            applyMiddleware(...middlewares),
        )
    )

    export default store

```

Inject  **headers Authorization**
```js
    import axios from 'axios'
    const client = axios.create({
        baseURL: "http://localhost:8003",
    })

    client.interceptors.request.use(
        async (config) => {
            const token = await localStorage.getItem('userToken')
            if (token) {
                config.headers.common['Authorization'] = 'Bearer ' + token
            }
            return config
        },
        (error) => Promise.reject(error)
    )

    export default client

```

reducer
```js
    import { authReducer as auth } from 'redux-oauth2-frontend'

    let reducer = combineReducers({
        auth: auth,
        //...
    })

    export default reducer

```

## Example (with React)

```js
import React from 'react';
import PropTypes from 'prop-types';
import { login, logout } from 'redux-oauth2-frontend'
    

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
           {this.state.username}
           <button onClick={isLoggedIn ? this.lLogout : this.lLogin} >{isLoggedIn ? 'logout' : 'Login'}</button>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
})

export default withRouter(connect(mapStateToProps, {
  login, logout
})(PersistentDrawer)) 


```


## Demo
[Demo]



[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

[Demo]: https://upeu-lib.github.io/redux-oauth2-frontend
