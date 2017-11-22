# redux-oauth2-frontend

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe redux-oauth2-frontend here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo


## Installation en modo local 


Instale previos
```sh

    D:\mi-react-project>npm i --S axios redux react-redux redux-thunk

```

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
        ...,
        compose(
            applyMiddleware(...middlewares),
        )
    )

    export default store

```

action inject headers **Authorization**
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
        ...
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
            let user = null
            if (localStorage.getItem('user')) {
                user = JSON.parse(localStorage.getItem('user'))
            }
            this.state = {
                username: user ? user.username : null
            }
        }

        lLogin = (event) => {
            this.props.login({
                url: "http://localhost:8003/o/authorize/",
                client: "0wxLaqwhDffkzai12bZq3aF0A47z9fZmOe3mAZU3",
                redirect: "http://localhost:3001",
                scope: "read",
                width: 400, 
                height: 400
            }).then(result => {
                localStorage.setItem('userToken', result.token)
                localStorage.setItem('user', JSON.stringify({
                    username: 'is auth'
                }))
                this.setState({
                    username: 'is auth'
                })
                /* o configure su api que trae info del user
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
            })
        }

        lLogout = (event) => {
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

    export default 
        connect(mapStateToProps, {
            login,
            logout,
        })
    (PersistentDrawer)


```