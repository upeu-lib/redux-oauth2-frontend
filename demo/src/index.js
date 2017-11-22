import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import App from './components/App';

import { Provider } from 'react-redux'
import store from './store'

import registerServiceWorker from './registerServiceWorker';
/*

class Appx extends Component {
  render() {
    return <div>
      <h1>redux-oauth2-frontend Demo</h1>
    </div>
  }
}
*/
ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>

  ,
  document.getElementById('demo'));
registerServiceWorker();
