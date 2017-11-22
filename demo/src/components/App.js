import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import AppLayout from './app/Layout01'

import { BrowserRouter as Router } from 'react-router-dom'



class App extends Component {
    componentWillMount() {
    }

    render() {


        
        return (
                <Router>

                    <AppLayout >
                    </AppLayout >
                </Router>
        )
    }
}

App.propTypes = {
}
const mapStateToProps = (state) => {
    return { }
}
export default connect(mapStateToProps, {

})(App)