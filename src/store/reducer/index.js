import { combineReducers } from 'redux'

// reducers 
import { alert, auth, form} from './utility'

const globalReducer = combineReducers({
    alert,
    auth,
    form
})

export default globalReducer;