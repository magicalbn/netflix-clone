import {combineReducers} from 'redux';
import UserReducers  from './authReducer';

const rootReducer = combineReducers({
        Authdata : UserReducers
});

export default rootReducer;