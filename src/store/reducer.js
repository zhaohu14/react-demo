// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as loginReducer } from '@/pages/login/store'
import { reducer as headerReducer } from '@/component/header/store'

const reducer = combineReducers({
    login: loginReducer,
    header: headerReducer
})

export default reducer