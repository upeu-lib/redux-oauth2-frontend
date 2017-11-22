import { combineReducers } from 'redux'
import { authReducer as auth } from '../../../src'


let reducer = combineReducers({
    auth: auth,
})

export default reducer