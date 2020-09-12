import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk' // da acesso ao dispatch para mandar uama ação

// reducers
import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'
import chatReducer from './reducers/chatReducer'

const initialState = {}

const middleware = [thunk]

// name dos objetos no state
const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    chat: chatReducer,
    UI: uiReducer
})

const store = createStore(
    reducers, 
    initialState, 
    compose(applyMiddleware(...middleware))
)

export default store