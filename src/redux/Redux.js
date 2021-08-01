import { combineReducers, createStore,applyMiddleware } from 'redux'
import { authReducer } from './authReducer'
import { dataReducer } from './dataReducer'
import thunk from 'redux-thunk'



  

  const reducers = combineReducers({
     auth: authReducer,
     data: dataReducer
  })

  

  

 export const store = createStore (reducers , applyMiddleware(thunk))